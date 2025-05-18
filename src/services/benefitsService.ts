
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Types for benefits
export interface Benefit {
  id?: string;
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
  createdAt?: any;
}

// Collection reference
const benefitsCollection = collection(db, "benefits");

// Add a new benefit
export const addBenefit = async (benefit: Omit<Benefit, "id" | "createdAt">) => {
  try {
    const docRef = await addDoc(benefitsCollection, {
      ...benefit,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...benefit };
  } catch (error) {
    console.error("Error adding benefit: ", error);
    throw error;
  }
};

// Get all benefits
export const getBenefits = async (): Promise<Benefit[]> => {
  try {
    const q = query(benefitsCollection);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Benefit[];
  } catch (error) {
    console.error("Error getting benefits: ", error);
    throw error;
  }
};

// Update a benefit
export const updateBenefit = async (id: string, benefit: Partial<Benefit>) => {
  try {
    const benefitRef = doc(db, "benefits", id);
    await updateDoc(benefitRef, benefit);
    return { id, ...benefit };
  } catch (error) {
    console.error("Error updating benefit: ", error);
    throw error;
  }
};

// Delete a benefit
export const deleteBenefit = async (id: string) => {
  try {
    const benefitRef = doc(db, "benefits", id);
    await deleteDoc(benefitRef);
    return id;
  } catch (error) {
    console.error("Error deleting benefit: ", error);
    throw error;
  }
};
