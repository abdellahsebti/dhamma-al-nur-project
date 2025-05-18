import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy,
  where,
  getDoc,
  arrayUnion,
  arrayRemove,
  increment,
  writeBatch
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
  playlistId?: string;
  order?: number;
}

export interface Playlist {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  videoCount: number;
  featured: boolean;
  videos: string[]; // Array of video IDs
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

// Get videos by playlist
export const getVideosByPlaylist = async (playlistId: string) => {
  try {
    const videosQuery = query(
      collection(db, 'videos'),
      where('playlistId', '==', playlistId),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(videosQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Video[];
  } catch (error) {
    console.error('Error getting videos by playlist:', error);
    throw error;
  }
};

// Get all playlists
export const getPlaylists = async () => {
  try {
    const playlistsQuery = query(collection(db, 'playlists'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(playlistsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Playlist[];
  } catch (error) {
    console.error('Error getting playlists:', error);
    throw error;
  }
};

// Get playlist by ID
export const getPlaylistById = async (playlistId: string) => {
  try {
    const playlistDoc = await getDoc(doc(db, 'playlists', playlistId));
    if (!playlistDoc.exists()) {
      throw new Error('Playlist not found');
    }
    return {
      id: playlistDoc.id,
      ...playlistDoc.data()
    } as Playlist;
  } catch (error) {
    console.error('Error getting playlist:', error);
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

// Add video to playlist
export const addVideoToPlaylist = async (playlistId: string, videoId: string, order: number) => {
  try {
    // Update video with playlist info
    await updateDoc(doc(db, 'videos', videoId), {
      playlistId,
      order
    });

    // Update playlist with video
    await updateDoc(doc(db, 'playlists', playlistId), {
      videos: arrayUnion(videoId),
      videoCount: increment(1),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error adding video to playlist:', error);
    throw error;
  }
};

// Remove video from playlist
export const removeVideoFromPlaylist = async (playlistId: string, videoId: string) => {
  try {
    // Remove playlist info from video
    await updateDoc(doc(db, 'videos', videoId), {
      playlistId: null,
      order: null
    });

    // Update playlist
    await updateDoc(doc(db, 'playlists', playlistId), {
      videos: arrayRemove(videoId),
      videoCount: increment(-1),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error removing video from playlist:', error);
    throw error;
  }
};

// Create new playlist
export const createPlaylist = async (playlist: Omit<Playlist, 'id' | 'videos' | 'videoCount'>) => {
  try {
    const newPlaylist = {
      ...playlist,
      videos: [],
      videoCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const docRef = await addDoc(collection(db, 'playlists'), newPlaylist);
    return {
      id: docRef.id,
      ...newPlaylist
    };
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

// Update playlist
export const updatePlaylist = async (playlistId: string, playlist: Partial<Playlist>) => {
  try {
    await updateDoc(doc(db, 'playlists', playlistId), {
      ...playlist,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating playlist:', error);
    throw error;
  }
};

// Delete playlist
export const deletePlaylist = async (playlistId: string) => {
  try {
    // Remove playlist reference from all videos
    const playlist = await getPlaylistById(playlistId);
    const batch = writeBatch(db);
    
    playlist.videos.forEach(videoId => {
      batch.update(doc(db, 'videos', videoId), {
        playlistId: null,
        order: null
      });
    });
    
    // Delete playlist
    batch.delete(doc(db, 'playlists', playlistId));
    
    await batch.commit();
  } catch (error) {
    console.error('Error deleting playlist:', error);
    throw error;
  }
}; 