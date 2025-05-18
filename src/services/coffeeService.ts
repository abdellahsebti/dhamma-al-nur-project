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
  where 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Types
export interface CoffeeStory {
  id?: string;
  title: string;
  author: string;
  summary: string;
  cover?: string;
  chaptersCount: number;
  category: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  status: 'draft' | 'published';
  language: string;
  readingTime?: number;
}

export interface Chapter {
  id?: string;
  storyId: string;
  title: string;
  orderNumber: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  wordCount: number;
  readingTime: number;
}

// Coffee Stories CRUD Operations
export const addCoffeeStory = async (storyData: Omit<CoffeeStory, 'id' | 'chaptersCount' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const storyRef = await addDoc(collection(db, 'coffee-stories'), {
      ...storyData,
      chaptersCount: 0,
      createdAt: now,
      updatedAt: now,
    });
    return { 
      id: storyRef.id, 
      ...storyData, 
      chaptersCount: 0,
      createdAt: now,
      updatedAt: now
    };
  } catch (error) {
    console.error('Error adding coffee story:', error);
    throw error;
  }
};

export const uploadCoverImage = async (file: File) => {
  try {
    const storageRef = ref(storage, `coffee-covers/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading cover image:', error);
    throw error;
  }
};

export const updateCoffeeStory = async (id: string, storyData: Partial<CoffeeStory>) => {
  try {
    const storyRef = doc(db, 'coffee-stories', id);
    await updateDoc(storyRef, {
      ...storyData,
      updatedAt: new Date()
    });
    return { id, ...storyData };
  } catch (error) {
    console.error('Error updating coffee story:', error);
    throw error;
  }
};

export const deleteCoffeeStory = async (id: string, coverUrl?: string) => {
  try {
    // Delete cover image if exists
    if (coverUrl) {
      const coverRef = ref(storage, coverUrl);
      await deleteObject(coverRef);
    }
    
    // Delete all chapters
    const chaptersQuery = query(
      collection(db, 'chapters'),
      where('storyId', '==', id)
    );
    const chaptersSnapshot = await getDocs(chaptersQuery);
    const deletePromises = chaptersSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Delete the story
    await deleteDoc(doc(db, 'coffee-stories', id));
  } catch (error) {
    console.error('Error deleting coffee story:', error);
    throw error;
  }
};

export const getCoffeeStories = async () => {
  try {
    const storiesQuery = query(
      collection(db, 'coffee-stories'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(storiesQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CoffeeStory[];
  } catch (error) {
    console.error('Error getting coffee stories:', error);
    throw error;
  }
};

export const getFeaturedStories = async () => {
  try {
    const storiesQuery = query(
      collection(db, 'coffee-stories'),
      where('featured', '==', true),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(storiesQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CoffeeStory[];
  } catch (error) {
    console.error('Error getting featured stories:', error);
    throw error;
  }
};

// Chapters CRUD Operations
export const addChapter = async (chapterData: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt' | 'wordCount' | 'readingTime'>) => {
  try {
    const now = new Date();
    const wordCount = chapterData.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed
    
    const chapterRef = await addDoc(collection(db, 'chapters'), {
      ...chapterData,
      createdAt: now,
      updatedAt: now,
      wordCount,
      readingTime
    });
    
    // Update story's chapter count
    const storyRef = doc(db, 'coffee-stories', chapterData.storyId);
    const storyDoc = await getDocs(query(collection(db, 'coffee-stories'), where('id', '==', chapterData.storyId)));
    const currentCount = storyDoc.docs[0]?.data()?.chaptersCount || 0;
    await updateDoc(storyRef, { chaptersCount: currentCount + 1 });
    
    return { 
      id: chapterRef.id, 
      ...chapterData,
      createdAt: now,
      updatedAt: now,
      wordCount,
      readingTime
    };
  } catch (error) {
    console.error('Error adding chapter:', error);
    throw error;
  }
};

export const getChapters = async (storyId: string) => {
  try {
    const chaptersQuery = query(
      collection(db, 'chapters'),
      where('storyId', '==', storyId),
      orderBy('orderNumber', 'asc')
    );
    const querySnapshot = await getDocs(chaptersQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Chapter[];
  } catch (error) {
    console.error('Error getting chapters:', error);
    throw error;
  }
};

export const updateChapter = async (id: string, chapterData: Partial<Chapter>) => {
  try {
    const chapterRef = doc(db, 'chapters', id);
    const updates: any = {
      ...chapterData,
      updatedAt: new Date()
    };
    
    // Recalculate word count and reading time if content is updated
    if (chapterData.content) {
      const wordCount = chapterData.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);
      updates.wordCount = wordCount;
      updates.readingTime = readingTime;
    }
    
    await updateDoc(chapterRef, updates);
    return { id, ...updates };
  } catch (error) {
    console.error('Error updating chapter:', error);
    throw error;
  }
};

export const deleteChapter = async (id: string, storyId: string) => {
  try {
    // Delete the chapter
    await deleteDoc(doc(db, 'chapters', id));
    
    // Update story's chapter count
    const storyRef = doc(db, 'coffee-stories', storyId);
    const storyDoc = await getDocs(query(collection(db, 'coffee-stories'), where('id', '==', storyId)));
    const currentCount = storyDoc.docs[0]?.data()?.chaptersCount || 0;
    await updateDoc(storyRef, { chaptersCount: Math.max(0, currentCount - 1) });
  } catch (error) {
    console.error('Error deleting chapter:', error);
    throw error;
  }
};
