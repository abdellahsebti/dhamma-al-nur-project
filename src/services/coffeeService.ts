
import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy, 
  where, 
  serverTimestamp, 
  getDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Types
export interface CoffeeStory {
  id?: string;
  title: string;
  author: string;
  cover: string;
  summary: string;
  chaptersCount: number;
  createdAt?: any;
}

export interface Chapter {
  id?: string;
  storyId: string;
  title: string;
  content: string;
  orderNumber: number;
}

// Coffee Stories CRUD Operations
export const addCoffeeStory = async (story: Omit<CoffeeStory, 'id' | 'createdAt'>) => {
  try {
    const storyData = {
      ...story,
      chaptersCount: story.chaptersCount || 0,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'coffeeStories'), storyData);
    return { id: docRef.id, ...storyData };
  } catch (error) {
    console.error('Error adding coffee story:', error);
    throw error;
  }
};

export const uploadCoverImage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `covers/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading cover image:', error);
    throw error;
  }
};

export const updateCoffeeStory = async (id: string, story: Partial<CoffeeStory>) => {
  try {
    const storyRef = doc(db, 'coffeeStories', id);
    await updateDoc(storyRef, story);
    return { id, ...story };
  } catch (error) {
    console.error('Error updating coffee story:', error);
    throw error;
  }
};

export const deleteCoffeeStory = async (id: string, coverUrl?: string) => {
  try {
    // Delete the story document
    await deleteDoc(doc(db, 'coffeeStories', id));
    
    // Delete the cover image if it exists
    if (coverUrl) {
      try {
        const imageRef = ref(storage, coverUrl);
        await deleteObject(imageRef);
      } catch (err) {
        console.error("Error deleting cover image:", err);
      }
    }
    
    // Delete all related chapters
    const chaptersQuery = query(collection(db, 'coffeeChapters'), where('storyId', '==', id));
    const chaptersSnapshot = await getDocs(chaptersQuery);
    
    const deletePromises = chaptersSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    return true;
  } catch (error) {
    console.error('Error deleting coffee story:', error);
    throw error;
  }
};

export const getCoffeeStories = async () => {
  try {
    const q = query(collection(db, 'coffeeStories'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const stories: CoffeeStory[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<CoffeeStory, 'id'>;
      stories.push({ 
        id: doc.id, 
        ...data,
        createdAt: data.createdAt?.toDate() || new Date()
      });
    });
    
    return stories;
  } catch (error) {
    console.error('Error getting coffee stories:', error);
    throw error;
  }
};

export const getCoffeeStory = async (id: string) => {
  try {
    const storyDoc = await getDoc(doc(db, 'coffeeStories', id));
    
    if (!storyDoc.exists()) {
      throw new Error('Coffee story not found');
    }
    
    const storyData = storyDoc.data() as Omit<CoffeeStory, 'id'>;
    return { 
      id: storyDoc.id, 
      ...storyData,
      createdAt: storyData.createdAt?.toDate() || new Date()
    };
  } catch (error) {
    console.error('Error getting coffee story:', error);
    throw error;
  }
};

// Chapters CRUD Operations
export const addChapter = async (chapter: Omit<Chapter, 'id'>) => {
  try {
    const chapterData = {
      ...chapter,
      orderNumber: chapter.orderNumber || 1,
    };
    
    const docRef = await addDoc(collection(db, 'coffeeChapters'), chapterData);
    
    // Update chapter count in the related story
    const storyRef = doc(db, 'coffeeStories', chapter.storyId);
    const storyDoc = await getDoc(storyRef);
    if (storyDoc.exists()) {
      const storyData = storyDoc.data();
      await updateDoc(storyRef, {
        chaptersCount: (storyData.chaptersCount || 0) + 1
      });
    }
    
    return { id: docRef.id, ...chapterData };
  } catch (error) {
    console.error('Error adding chapter:', error);
    throw error;
  }
};

export const updateChapter = async (id: string, chapter: Partial<Chapter>) => {
  try {
    const chapterRef = doc(db, 'coffeeChapters', id);
    await updateDoc(chapterRef, chapter);
    return { id, ...chapter };
  } catch (error) {
    console.error('Error updating chapter:', error);
    throw error;
  }
};

export const deleteChapter = async (id: string, storyId: string) => {
  try {
    // Delete the chapter document
    await deleteDoc(doc(db, 'coffeeChapters', id));
    
    // Update chapter count in the related story
    const storyRef = doc(db, 'coffeeStories', storyId);
    const storyDoc = await getDoc(storyRef);
    if (storyDoc.exists()) {
      const storyData = storyDoc.data();
      if (storyData.chaptersCount > 0) {
        await updateDoc(storyRef, {
          chaptersCount: storyData.chaptersCount - 1
        });
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting chapter:', error);
    throw error;
  }
};

export const getChapters = async (storyId: string) => {
  try {
    const q = query(
      collection(db, 'coffeeChapters'),
      where('storyId', '==', storyId),
      orderBy('orderNumber', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const chapters: Chapter[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Chapter, 'id'>;
      chapters.push({ 
        id: doc.id, 
        ...data 
      });
    });
    
    return chapters;
  } catch (error) {
    console.error('Error getting chapters:', error);
    throw error;
  }
};
