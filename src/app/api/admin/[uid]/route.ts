import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  context: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await context.params; // ✅ Await params
    console.log('Admin route called for UID:', uid);

    const cookiesStore = await cookies(); // ✅ Await cookies()
    const sessionCookie = cookiesStore.get('session')?.value;
    console.log('Session cookie exists:', !!sessionCookie);

    let decodedToken;

    if (sessionCookie) {
      try {
        decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        console.log('Session cookie verified successfully for user:', decodedToken.uid);
      } catch (error) {
        console.error('Error verifying session cookie:', error);
      }
    }

    if (!decodedToken) {
      console.log('No valid session cookie, trying ID token');
      const authHeader = request.headers.get('Authorization');
      console.log('Auth header:', authHeader);

      if (!authHeader) {
        return NextResponse.json(
          {
            error: 'No Authorization header provided',
            reason: 'MISSING_AUTH_HEADER',
            message: 'Please include the Authorization header with your Firebase ID token',
          },
          { status: 401 }
        );
      }

      const idToken = authHeader.split('Bearer ')[1];

      if (!idToken) {
        return NextResponse.json(
          {
            error: 'No Bearer token found in Authorization header',
            reason: 'MISSING_BEARER_TOKEN',
            message: 'Please include the Bearer token in the Authorization header',
          },
          { status: 401 }
        );
      }

      try {
        decodedToken = await auth.verifyIdToken(idToken);
        console.log('ID token verified for:', decodedToken.uid);

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const newSessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

        cookiesStore.set({
          name: 'session',
          value: newSessionCookie,
          maxAge: expiresIn / 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });

        console.log('Session cookie created and set');
      } catch (error) {
        return NextResponse.json(
          {
            error: 'Invalid or expired ID token',
            reason: 'INVALID_ID_TOKEN',
            message: 'Your authentication token is invalid or has expired. Please sign in again.',
          },
          { status: 401 }
        );
      }
    }

    if (!decodedToken.email) {
      return NextResponse.json(
        {
          error: 'No email found in token',
          reason: 'NO_EMAIL_IN_TOKEN',
          message: 'Your authentication token is missing required information',
        },
        { status: 401 }
      );
    }

    if (decodedToken.uid !== uid) {
      return NextResponse.json(
        {
          error: 'UID mismatch',
          reason: 'UID_MISMATCH',
          expected: uid,
          actual: decodedToken.uid,
          message: 'You can only check your own admin status',
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        email: decodedToken.email,
        uid: decodedToken.uid,
        name: decodedToken.name,
        picture: decodedToken.picture,
      },
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      {
        error: 'Server error',
        reason: 'SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
