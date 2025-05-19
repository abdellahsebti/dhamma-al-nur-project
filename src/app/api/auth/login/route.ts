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
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    };

    const cookiesStore = await cookies();

    cookiesStore.set(options);

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return NextResponse.json(
      { error: 'Failed to create session cookie' },
      { status: 500 }
    );
  }
} 