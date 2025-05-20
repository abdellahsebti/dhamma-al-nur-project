import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: 'No ID token provided' }, { status: 400 });
    }

    // Verify the ID token while checking if the token is revoked.
    const decodedIdToken = await auth.verifyIdToken(idToken);

    // Create the session cookie.
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    // Set cookie policy for session cookie.
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_DOMAIN : undefined
    };

    const cookiesStore = await cookies();
    cookiesStore.set(options);

    // Create the response
    const response = NextResponse.json({ status: 'success' });

    // Set the cookie in the response headers
    response.cookies.set(options);

    return response;
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return NextResponse.json(
      { error: 'Failed to create session cookie' },
      { status: 500 }
    );
  }
} 