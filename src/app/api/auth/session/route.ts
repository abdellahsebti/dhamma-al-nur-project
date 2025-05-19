import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    console.log('Session route called');
    
    // Get the session cookie
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get('session')?.value;
    console.log('Session cookie exists:', !!sessionCookie);

    if (!sessionCookie) {
      // Try to get the ID token from Authorization header
      const authHeader = request.headers.get('Authorization');
      console.log('Auth header:', authHeader);

      if (!authHeader) {
        console.log('No Authorization header found');
        return NextResponse.json(
          { error: 'No Authorization header provided', reason: 'MISSING_AUTH_HEADER' },
          { status: 401 }
        );
      }

      const idToken = authHeader.split('Bearer ')[1];
      console.log('ID token exists:', !!idToken);

      if (!idToken) {
        console.log('No Bearer token found in Authorization header');
        return NextResponse.json(
          { error: 'No Bearer token found in Authorization header', reason: 'MISSING_BEARER_TOKEN' },
          { status: 401 }
        );
      }

      try {
        // Verify the ID token
        const decodedToken = await auth.verifyIdToken(idToken);
        console.log('Token verified successfully for user:', decodedToken.uid);
        
        // Create a session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        console.log('Session cookie created');

        // Set the session cookie
        cookiesStore.set({
          name: 'session',
          value: sessionCookie,
          maxAge: expiresIn,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });
        console.log('Session cookie set');

        return NextResponse.json({ 
          success: true,
          user: {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture
          }
        });
      } catch (error) {
        console.error('Error verifying ID token:', error);
        return NextResponse.json(
          { error: 'Invalid or expired ID token', reason: 'INVALID_ID_TOKEN' },
          { status: 401 }
        );
      }
    }

    try {
      // Verify the session cookie
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
      console.log('Session cookie verified successfully for user:', decodedClaims.uid);
      
      return NextResponse.json({ 
        success: true,
        user: {
          uid: decodedClaims.uid,
          email: decodedClaims.email,
          name: decodedClaims.name,
          picture: decodedClaims.picture
        }
      });
    } catch (error) {
      console.error('Error verifying session cookie:', error);
      return NextResponse.json(
        { error: 'Invalid or expired session', reason: 'INVALID_SESSION' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Server error', reason: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
} 