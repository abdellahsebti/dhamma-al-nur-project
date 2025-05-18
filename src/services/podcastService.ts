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

export interface Podcast {
  id?: string;
  title: string;
  description: string;
  audioUrl: string;
  coverUrl: string;
  category: string;
  duration: string;
  publishDate: Date;
  listens: number;
  featured: boolean;
  episodeNumber: number;
  season: number;
  guests?: string[];
  showNotes?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
}

// Add a new podcast
export const addPodcast = async (podcastData: Omit<Podcast, 'id' | 'listens' | 'publishDate'>) => {
  try {
    const podcastRef = await addDoc(collection(db, 'podcasts'), {
      ...podcastData,
      listens: 0,
      publishDate: new Date(),
    });
    return { id: podcastRef.id, ...podcastData };
  } catch (error) {
    console.error('Error adding podcast:', error);
    throw error;
  }
};

// Get all podcasts
export const getPodcasts = async () => {
  try {
    const podcastsQuery = query(collection(db, 'podcasts'), orderBy('publishDate', 'desc'));
    const querySnapshot = await getDocs(podcastsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Podcast[];
  } catch (error) {
    console.error('Error getting podcasts:', error);
    throw error;
  }
};

// Update a podcast
export const updatePodcast = async (id: string, podcastData: Partial<Podcast>) => {
  try {
    const podcastRef = doc(db, 'podcasts', id);
    await updateDoc(podcastRef, podcastData);
    return { id, ...podcastData };
  } catch (error) {
    console.error('Error updating podcast:', error);
    throw error;
  }
};

// Delete a podcast
export const deletePodcast = async (id: string, audioUrl: string, coverUrl: string) => {
  try {
    // Delete audio file from storage
    if (audioUrl) {
      const audioRef = ref(storage, audioUrl);
      await deleteObject(audioRef);
    }
    
    // Delete cover from storage
    if (coverUrl) {
      const coverRef = ref(storage, coverUrl);
      await deleteObject(coverRef);
    }
    
    // Delete document from Firestore
    await deleteDoc(doc(db, 'podcasts', id));
  } catch (error) {
    console.error('Error deleting podcast:', error);
    throw error;
  }
};

// Upload audio file
export const uploadAudio = async (file: File) => {
  try {
    const storageRef = ref(storage, `podcasts/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

// Upload cover image
export const uploadCover = async (file: File) => {
  try {
    const storageRef = ref(storage, `podcast-covers/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading cover:', error);
    throw error;
  }
}; 