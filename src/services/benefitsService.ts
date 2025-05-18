import { db } from '@/lib/firebase';
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

// Types for benefits
export interface Benefit {
  id?: string;
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  author?: string;
  source?: string;
}

// Add a new benefit
export const addBenefit = async (benefitData: Omit<Benefit, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date();
    const benefitRef = await addDoc(collection(db, 'benefits'), {
      ...benefitData,
      createdAt: now,
      updatedAt: now,
    });
    return { id: benefitRef.id, ...benefitData, createdAt: now, updatedAt: now };
  } catch (error) {
    console.error('Error adding benefit:', error);
    throw error;
  }
};

// Get all benefits
export const getBenefits = async () => {
  try {
    const benefitsQuery = query(collection(db, 'benefits'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(benefitsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Benefit[];
  } catch (error) {
    console.error('Error getting benefits:', error);
    throw error;
  }
};

// Get benefits by category
export const getBenefitsByCategory = async (category: string) => {
  try {
    const benefitsQuery = query(
      collection(db, 'benefits'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(benefitsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Benefit[];
  } catch (error) {
    console.error('Error getting benefits by category:', error);
    throw error;
  }
};

// Get featured benefits
export const getFeaturedBenefits = async () => {
  try {
    const benefitsQuery = query(
      collection(db, 'benefits'),
      where('featured', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(benefitsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Benefit[];
  } catch (error) {
    console.error('Error getting featured benefits:', error);
    throw error;
  }
};

// Update a benefit
export const updateBenefit = async (id: string, benefitData: Partial<Benefit>) => {
  try {
    const benefitRef = doc(db, 'benefits', id);
    await updateDoc(benefitRef, {
      ...benefitData,
      updatedAt: new Date()
    });
    return { id, ...benefitData };
  } catch (error) {
    console.error('Error updating benefit:', error);
    throw error;
  }
};

// Delete a benefit
export const deleteBenefit = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'benefits', id));
  } catch (error) {
    console.error('Error deleting benefit:', error);
    throw error;
  }
};

// Search benefits
export const searchBenefits = async (searchTerm: string) => {
  try {
    const benefitsQuery = query(collection(db, 'benefits'));
    const querySnapshot = await getDocs(benefitsQuery);
    const benefits = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Benefit[];
    
    // Filter benefits based on search term
    return benefits.filter(benefit => 
      benefit.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      benefit.benefitText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      benefit.scholarComment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      benefit.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching benefits:', error);
    throw error;
  }
};
