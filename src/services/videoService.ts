import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export interface Video {
  id?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  duration: string;
  uploadDate: Date;
  views: number;
  featured: boolean;
}

// Add a new video
export const addVideo = async (videoData: Omit<Video, 'id' | 'views' | 'uploadDate'>) => {
  try {
    const videoRef = await addDoc(collection(db, 'videos'), {
      ...videoData,
      views: 0,
      uploadDate: new Date(),
    });
    return { id: videoRef.id, ...videoData };
  } catch (error) {
    console.error('Error adding video:', error);
    throw error;
  }
};

// Get all videos
export const getVideos = async () => {
  try {
    const videosQuery = query(collection(db, 'videos'), orderBy('uploadDate', 'desc'));
    const querySnapshot = await getDocs(videosQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Video[];
  } catch (error) {
    console.error('Error getting videos:', error);
    throw error;
  }
};

// Update a video
export const updateVideo = async (id: string, videoData: Partial<Video>) => {
  try {
    const videoRef = doc(db, 'videos', id);
    await updateDoc(videoRef, videoData);
    return { id, ...videoData };
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
};

// Delete a video
export const deleteVideo = async (id: string, videoUrl: string, thumbnailUrl: string) => {
  try {
    // Delete video file from storage
    if (videoUrl) {
      const videoRef = ref(storage, videoUrl);
      await deleteObject(videoRef);
    }
    
    // Delete thumbnail from storage
    if (thumbnailUrl) {
      const thumbnailRef = ref(storage, thumbnailUrl);
      await deleteObject(thumbnailRef);
    }
    
    // Delete document from Firestore
    await deleteDoc(doc(db, 'videos', id));
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

// Upload video file
export const uploadVideo = async (file: File) => {
  try {
    const storageRef = ref(storage, `videos/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

// Upload thumbnail
export const uploadThumbnail = async (file: File) => {
  try {
    const storageRef = ref(storage, `thumbnails/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    throw error;
  }
}; 