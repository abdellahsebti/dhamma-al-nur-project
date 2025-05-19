import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { auth } from '@/lib/firebase-admin';

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
    const session = await auth.verifySessionCookie(
      request.headers.get('Authorization')?.split('Bearer ')[1] || ''
    );

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const videosRef = adminDb.collection('videos');
    const docRef = await videosRef.add({
      ...data,
      uploadDate: new Date()
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
    const { id, ...data } = await request.json();
    const videoRef = adminDb.collection('videos').doc(id);

    // If only updating views, allow without authentication
    if (Object.keys(data).length === 1 && 'views' in data) {
      await videoRef.update(data);
      return NextResponse.json({ id, ...data });
    }

    // For other updates, require authentication
    const session = await auth.verifySessionCookie(
      request.headers.get('Authorization')?.split('Bearer ')[1] || ''
    );

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await videoRef.update(data);
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
    const session = await auth.verifySessionCookie(
      request.headers.get('Authorization')?.split('Bearer ')[1] || ''
    );

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
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