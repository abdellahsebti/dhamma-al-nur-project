import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { auth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const videosRef = adminDb.collection('videos');
    const querySnapshot = await videosRef.orderBy('uploadDate', 'desc').get();
    const videos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // First try to get the session cookie
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get('session')?.value;
    let decodedToken;

    if (sessionCookie) {
      try {
        decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        console.log('Session cookie verified successfully for user:', decodedToken.uid);
      } catch (error) {
        console.error('Error verifying session cookie:', error);
        // Continue to try ID token if session cookie fails
      }
    }

    // If no valid session cookie, try ID token
    if (!decodedToken) {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) {
        return NextResponse.json(
          { error: 'No Authorization header provided' },
          { status: 401 }
        );
      }

      const idToken = authHeader.split('Bearer ')[1];
      if (!idToken) {
        return NextResponse.json(
          { error: 'No Bearer token found in Authorization header' },
          { status: 401 }
        );
      }

      try {
        decodedToken = await auth.verifyIdToken(idToken);
        console.log('ID token verified successfully for user:', decodedToken.uid);

        // Create a session cookie for future requests
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
      } catch (error) {
        console.error('Error verifying ID token:', error);
        return NextResponse.json(
          { error: 'Invalid or expired ID token' },
          { status: 401 }
        );
      }
    }

    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const videosRef = adminDb.collection('videos');
    const docRef = await videosRef.add({
      ...data,
      uploadDate: new Date(),
      uploadedBy: decodedToken.uid
    });

    return NextResponse.json({ id: docRef.id, ...data });
  } catch (error) {
    console.error('Error adding video:', error);
    return NextResponse.json(
      { error: 'Failed to add video' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // First try to get the session cookie
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get('session')?.value;
    let decodedToken;

    if (sessionCookie) {
      try {
        decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        console.log('Session cookie verified successfully for user:', decodedToken.uid);
      } catch (error) {
        console.error('Error verifying session cookie:', error);
        // Continue to try ID token if session cookie fails
      }
    }

    // If no valid session cookie, try ID token
    if (!decodedToken) {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) {
        return NextResponse.json(
          { error: 'No Authorization header provided' },
          { status: 401 }
        );
      }

      const idToken = authHeader.split('Bearer ')[1];
      if (!idToken) {
        return NextResponse.json(
          { error: 'No Bearer token found in Authorization header' },
          { status: 401 }
        );
      }

      try {
        decodedToken = await auth.verifyIdToken(idToken);
        console.log('ID token verified successfully for user:', decodedToken.uid);
      } catch (error) {
        console.error('Error verifying ID token:', error);
        return NextResponse.json(
          { error: 'Invalid or expired ID token' },
          { status: 401 }
        );
      }
    }

    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id, ...data } = await request.json();
    const videoRef = adminDb.collection('videos').doc(id);

    // If only updating views, allow without authentication
    if (Object.keys(data).length === 1 && 'views' in data) {
      await videoRef.update(data);
      return NextResponse.json({ id, ...data });
    }

    await videoRef.update({
      ...data,
      updatedBy: decodedToken.uid,
      updatedAt: new Date()
    });

    return NextResponse.json({ id, ...data });
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // First try to get the session cookie
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get('session')?.value;
    let decodedToken;

    if (sessionCookie) {
      try {
        decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        console.log('Session cookie verified successfully for user:', decodedToken.uid);
      } catch (error) {
        console.error('Error verifying session cookie:', error);
        // Continue to try ID token if session cookie fails
      }
    }

    // If no valid session cookie, try ID token
    if (!decodedToken) {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) {
        return NextResponse.json(
          { error: 'No Authorization header provided' },
          { status: 401 }
        );
      }

      const idToken = authHeader.split('Bearer ')[1];
      if (!idToken) {
        return NextResponse.json(
          { error: 'No Bearer token found in Authorization header' },
          { status: 401 }
        );
      }

      try {
        decodedToken = await auth.verifyIdToken(idToken);
        console.log('ID token verified successfully for user:', decodedToken.uid);
      } catch (error) {
        console.error('Error verifying ID token:', error);
        return NextResponse.json(
          { error: 'Invalid or expired ID token' },
          { status: 401 }
        );
      }
    }

    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await request.json();
    const videoRef = adminDb.collection('videos').doc(id);
    await videoRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
} 