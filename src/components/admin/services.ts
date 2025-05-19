import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  Timestamp, 
  where, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';
import { 
  Benefit, 
  CoffeeStory, 
  Chapter, 
  Video, 
  Podcast, 
  ContactForm 
} from './types';

export const adminServices = {
  benefits: {
    add: async (data: Omit<Benefit, 'id'>) => {
      const benefitsRef = collection(db, 'benefits');
      const docRef = await addDoc(benefitsRef, data);
      return { id: docRef.id, ...data };
    },
    get: async () => {
      const benefitsRef = collection(db, 'benefits');
      const q = query(benefitsRef, orderBy('bookName'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Benefit[];
    },
    delete: async (id: string) => {
      const benefitRef = doc(db, 'benefits', id);
      await deleteDoc(benefitRef);
    },
    update: async (id: string, data: Omit<Benefit, 'id'>) => {
      const benefitRef = doc(db, 'benefits', id);
      await updateDoc(benefitRef, data);
      return { id, ...data };
    }
  },
  coffee: {
    addStory: async (data: Omit<CoffeeStory, 'id'>) => {
      const storiesRef = collection(db, 'coffeeStories');
      const docRef = await addDoc(storiesRef, data);
      return { id: docRef.id, ...data };
    },
    getStories: async () => {
      const storiesRef = collection(db, 'coffeeStories');
      const q = query(storiesRef, orderBy('title'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CoffeeStory[];
    },
    deleteStory: async (id: string) => {
      const storyRef = doc(db, 'coffeeStories', id);
      await deleteDoc(storyRef);
      // Delete associated chapters
      const chaptersRef = collection(db, 'chapters');
      const q = query(chaptersRef, where('storyId', '==', id));
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    },
    updateStory: async (id: string, data: Omit<CoffeeStory, 'id'>) => {
      const storyRef = doc(db, 'coffeeStories', id);
      await updateDoc(storyRef, data);
      return { id, ...data };
    },
    addChapter: async (data: Omit<Chapter, 'id'>) => {
      const chaptersRef = collection(db, 'chapters');
      const docRef = await addDoc(chaptersRef, data);
      return { id: docRef.id, ...data };
    },
    getChapters: async (storyId: string) => {
      const chaptersRef = collection(db, 'chapters');
      const q = query(chaptersRef, where('storyId', '==', storyId), orderBy('orderNumber'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Chapter[];
    },
    updateChapter: async (id: string, data: Omit<Chapter, 'id'>) => {
      const chapterRef = doc(db, 'chapters', id);
      await updateDoc(chapterRef, data);
      return { id, ...data };
    },
    deleteChapter: async (id: string) => {
      const chapterRef = doc(db, 'chapters', id);
      await deleteDoc(chapterRef);
    }
  },
  videos: {
    add: async (data: Omit<Video, 'id'>) => {
      try {
        const videosRef = collection(db, 'videos');
        const docRef = await addDoc(videosRef, {
          ...data,
          uploadDate: Timestamp.now()
        });
        return { id: docRef.id, ...data };
      } catch (error) {
        console.error('Error adding video:', error);
        throw error;
      }
    },
    get: async () => {
      try {
        const videosRef = collection(db, 'videos');
        const q = query(videosRef, orderBy('uploadDate', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Video[];
      } catch (error) {
        console.error('Error getting videos:', error);
        throw error;
      }
    },
    delete: async (id: string) => {
      try {
        const videoRef = doc(db, 'videos', id);
        await deleteDoc(videoRef);
      } catch (error) {
        console.error('Error deleting video:', error);
        throw error;
      }
    },
    update: async (id: string, data: Omit<Video, 'id'>) => {
      try {
        const videoRef = doc(db, 'videos', id);
        await updateDoc(videoRef, data);
        return { id, ...data };
      } catch (error) {
        console.error('Error updating video:', error);
        throw error;
      }
    }
  },
  podcasts: {
    add: async (data: Omit<Podcast, 'id'>) => {
      const podcastsRef = collection(db, 'podcasts');
      const docRef = await addDoc(podcastsRef, data);
      return { id: docRef.id, ...data };
    },
    get: async () => {
      const podcastsRef = collection(db, 'podcasts');
      const q = query(podcastsRef, orderBy('title'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Podcast[];
    },
    delete: async (id: string) => {
      const podcastRef = doc(db, 'podcasts', id);
      await deleteDoc(podcastRef);
    },
    update: async (id: string, data: Omit<Podcast, 'id'>) => {
      const podcastRef = doc(db, 'podcasts', id);
      await updateDoc(podcastRef, data);
      return { id, ...data };
    }
  },
  contact: {
    get: async () => {
      const formsRef = collection(db, 'contactForms');
      const q = query(formsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactForm[];
    },
    delete: async (id: string) => {
      const formRef = doc(db, 'contactForms', id);
      await deleteDoc(formRef);
    },
    updateStatus: async (id: string, status: ContactForm['status']) => {
      const formRef = doc(db, 'contactForms', id);
      await updateDoc(formRef, { status });
    }
  }
}; 