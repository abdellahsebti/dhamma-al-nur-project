import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Plus, BookPlus, Trash2, Edit, Coffee, BookOpen, FileText, Headphones, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp, where } from 'firebase/firestore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// Add Firebase Auth imports
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";

// Mock data types
interface Benefit {
  id: string;
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
}

interface CoffeeStory {
  id: string;
  title: string;
  author: string;
  summary: string;
  cover?: string;
  chaptersCount: number;
}

interface Chapter {
  id: string;
  storyId: string;
  title: string;
  orderNumber: number;
  content: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  views: number;
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  episodeNumber: number;
  season: number;
  guests?: string[];
  showNotes?: string;
  audioUrl: string;
  coverUrl: string;
  listens: number;
  featured: boolean;
  youtubeUrl?: string;
  spotifyUrl?: string;
}

// Add Contact Form interface
interface ContactForm {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
  status: 'new' | 'read' | 'replied';
}

// Mock data storage
// let mockBenefits: Benefit[] = [];
// let mockCoffeeStories: CoffeeStory[] = [];
// let mockChapters: Chapter[] = [];
// let mockVideos: Video[] = [];
// let mockPodcasts: Podcast[] = [];

// Mock service functions
const mockServices = {
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
      const videosRef = collection(db, 'videos');
      const docRef = await addDoc(videosRef, data);
      return { id: docRef.id, ...data };
    },
    get: async () => {
      const videosRef = collection(db, 'videos');
      const q = query(videosRef, orderBy('title'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
    },
    delete: async (id: string) => {
      const videoRef = doc(db, 'videos', id);
      await deleteDoc(videoRef);
    },
    update: async (id: string, data: Omit<Video, 'id'>) => {
      const videoRef = doc(db, 'videos', id);
      await updateDoc(videoRef, data);
      return { id, ...data };
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
      return { id, status };
    }
  }
};

// Benefit form type
interface BenefitFormValues {
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
}

// Coffee Story form type
interface CoffeeStoryFormValues {
  title: string;
  author: string;
  summary: string;
  coverFile?: FileList;
}

// Chapter form type
interface ChapterFormValues {
  title: string;
  orderNumber: number;
  content: string;
}

// Video form type
interface VideoFormValues {
  title: string;
  description: string;
  category: string;
  duration: string;
  youtubeUrl: string;
}

// Podcast form type
interface PodcastFormValues {
  title: string;
  description: string;
  category: string;
  duration: string;
  episodeNumber?: number;
  season?: number;
  guests?: string;
  showNotes?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

const Admin: React.FC = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Remove old auth state
  // const [password, setPassword] = useState(''); // Remove old password state
  const [user, setUser] = useState<User | null>(null); // Firebase user state
  const [authLoading, setAuthLoading] = useState(true); // Auth loading state
  const [email, setEmail] = useState(''); // Email state for login
  const [password, setPassword] = useState(''); // Password state for login

  const [showAddBenefitDialog, setShowAddBenefitDialog] = useState(false);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
  
  // Coffee Eyes states
  const [coffeeStories, setCoffeeStories] = useState<CoffeeStory[]>([]);
  const [showAddStoryDialog, setShowAddStoryDialog] = useState(false);
  const [editingStory, setEditingStory] = useState<CoffeeStory | null>(null);
  const [selectedStory, setSelectedStory] = useState<CoffeeStory | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [showAddChapterDialog, setShowAddChapterDialog] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  
  // Video states
  const [showAddVideoDialog, setShowAddVideoDialog] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  
  // Podcast states
  const [showAddPodcastDialog, setShowAddPodcastDialog] = useState(false);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);
  
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showViewFormDialog, setShowViewFormDialog] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Remove old mock authentication
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  
  //   if (password === correctPassword) {
  //     setIsAuthenticated(true);
  //     toast({
  //       title: "تم تسجيل الدخول بنجاح",
  //       description: "مرحباً بك في لوحة التحكم",
  //     });
  //   } else {
  //     toast({
  //       title: "خطأ في تسجيل الدخول",
  //       description: "كلمة المرور غير صحيحة",
  //       variant: "destructive",
  //     });
  //   }
  // };
  
  // Remove old handle logout
  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   navigate('/admin');
  // };

  // Firebase Auth state observer
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        console.log('Firebase User authenticated:', currentUser.uid);
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم",
        });
      } else {
        console.log('Firebase User logged out');
      }
    });

    // Clean up observer on unmount
    return () => unsubscribe();
  }, []);

  // Handle Firebase Login
  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User state updated by onAuthStateChanged
    } catch (error: any) {
      console.error("Firebase Login Error:", error);
      let errorMessage = "حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.";
      if (error.code === 'auth/invalid-email') {
        errorMessage = "البريد الإلكتروني غير صالح.";
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "تم تعطيل حساب المستخدم.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "المستخدم غير موجود.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "كلمة المرور غير صحيحة.";
      }
      toast({
        title: "خطأ في تسجيل الدخول",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Firebase Logout
  const handleFirebaseLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
    } catch (error) {
      console.error("Firebase Logout Error:", error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج.",
        variant: "destructive",
      });
    }
  };
  
  // Fetch benefits
  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const fetchedBenefits = await mockServices.benefits.get();
      setBenefits(fetchedBenefits);
    } catch (error) {
      console.error("Error fetching benefits:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب الفوائد",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch coffee stories
  const fetchCoffeeStories = async () => {
    try {
      setLoading(true);
      const fetchedStories = await mockServices.coffee.getStories();
      setCoffeeStories(fetchedStories);
    } catch (error) {
      console.error("Error fetching coffee stories:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب القصص",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch chapters for a story
  const fetchChapters = async (storyId: string) => {
    try {
      setLoading(true);
      const fetchedChapters = await mockServices.coffee.getChapters(storyId);
      setChapters(fetchedChapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب الفصول",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const data = await mockServices.videos.get();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب الفيديوهات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch podcasts
  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const data = await mockServices.podcasts.get();
      setPodcasts(data);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب البودكاست",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Update the fetchContactForms function
  const fetchContactForms = async () => {
    try {
      console.log('Starting fetchContactForms...');
      setLoading(true);
      
      const formsRef = collection(db, 'contactForms');
      console.log('Created formsRef:', formsRef);
      
      const q = query(formsRef, orderBy('createdAt', 'desc'));
      console.log('Created query:', q);
      
      const querySnapshot = await getDocs(q);
      console.log('Got querySnapshot with', querySnapshot.size, 'documents');
      
      const fetchedForms = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactForm[];
      
      console.log('Processed forms:', fetchedForms);
      
      if (fetchedForms.length > 0) {
        console.log('Setting contact forms state with', fetchedForms.length, 'forms');
        setContactForms(fetchedForms);
      } else {
        console.log('No forms received from service');
        setContactForms([]);
      }
    } catch (error) {
      console.error("Error in fetchContactForms:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب الرسائل",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Load data when authenticated (Firebase user is available)
  useEffect(() => {
    if (user) {
      console.log('Firebase user is authenticated, fetching data...');
      fetchBenefits();
      fetchCoffeeStories();
      fetchVideos();
      fetchPodcasts();
      fetchContactForms();
    } else {
       // Clear data if user logs out
      setBenefits([]);
      setCoffeeStories([]);
      setVideos([]);
      setPodcasts([]);
      setContactForms([]);
    }
  }, [user]); // Depend on user state
  
  // Add useEffect to monitor contactForms state
  useEffect(() => {
    console.log('Contact forms state updated:', contactForms);
  }, [contactForms]);
  
  // Benefit form
  const benefitForm = useForm<BenefitFormValues>({
    defaultValues: {
      bookName: '',
      volumeAndPage: '',
      benefitText: '',
      scholarComment: '',
      category: '',
    }
  });
  
  // Coffee Story form
  const storyForm = useForm<CoffeeStoryFormValues>({
    defaultValues: {
      title: '',
      author: '',
      summary: '',
    }
  });
  
  // Chapter form
  const chapterForm = useForm<ChapterFormValues>({
    defaultValues: {
      title: '',
      orderNumber: 1,
      content: '',
    }
  });
  
  // Video form validation schema
  const videoFormSchema = z.object({
    title: z.string().min(1, 'العنوان مطلوب'),
    description: z.string().min(1, 'الوصف مطلوب'),
    category: z.string().min(1, 'التصنيف مطلوب'),
    duration: z.string().min(1, 'المدة مطلوبة'),
    youtubeUrl: z.string().min(1, 'رابط يوتيوب مطلوب').url('الرجاء إدخال رابط صحيح')
  });
  
  // Video form
  const videoForm = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      duration: '',
      youtubeUrl: '',
    }
  });
  
  // Podcast form
  const podcastForm = useForm<PodcastFormValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      duration: '',
      guests: '',
      showNotes: '',
    }
  });
  
  // Open dialog for adding a new benefit
  const handleAddBenefitClick = () => {
    setEditingBenefit(null);
    benefitForm.reset({
      bookName: '',
      volumeAndPage: '',
      benefitText: '',
      scholarComment: '',
      category: '',
    });
    setShowAddBenefitDialog(true);
  };
  
  // Open dialog for editing a benefit
  const handleEditBenefitClick = (benefit: Benefit) => {
    setEditingBenefit(benefit);
    benefitForm.reset({
      bookName: benefit.bookName,
      volumeAndPage: benefit.volumeAndPage,
      benefitText: benefit.benefitText,
      scholarComment: benefit.scholarComment || '',
      category: benefit.category,
    });
    setShowAddBenefitDialog(true);
  };
  
  // Submit function for adding/editing a benefit
  const onSubmitBenefit = async (data: BenefitFormValues) => {
    try {
      if (editingBenefit?.id) {
        // Update existing benefit
        await mockServices.benefits.update(editingBenefit.id, data);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الفائدة بنجاح",
        });
      } else {
        // Add new benefit
        await mockServices.benefits.add(data);
        toast({
          title: "تمت الإضافة بنجاح",
          description: "تمت إضافة الفائدة بنجاح",
        });
      }
      // Refresh benefits list
      fetchBenefits();
      setShowAddBenefitDialog(false);
      benefitForm.reset();
    } catch (error) {
      console.error("Error submitting benefit:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الفائدة",
        variant: "destructive",
      });
    }
  };
  
  // Delete a benefit
  const handleDeleteBenefit = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الفائدة؟")) {
      try {
        await mockServices.benefits.delete(id);
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف الفائدة بنجاح",
        });
        // Refresh benefits list
        fetchBenefits();
      } catch (error) {
        console.error("Error deleting benefit:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف الفائدة",
          variant: "destructive",
        });
      }
    }
  };
  
  // Coffee Eyes functions
  // Open dialog for adding a new coffee story
  const handleAddStoryClick = () => {
    setEditingStory(null);
    storyForm.reset({
      title: '',
      author: '',
      summary: '',
    });
    setShowAddStoryDialog(true);
  };
  
  // Open dialog for editing a coffee story
  const handleEditStoryClick = (story: CoffeeStory) => {
    setEditingStory(story);
    storyForm.reset({
      title: story.title,
      author: story.author,
      summary: story.summary,
    });
    setShowAddStoryDialog(true);
  };
  
  // Submit function for adding/editing a coffee story
  const onSubmitStory = async (data: CoffeeStoryFormValues) => {
    try {
      const storyData = {
        title: data.title,
        author: data.author,
        summary: data.summary,
        cover: editingStory?.cover || '',
        chaptersCount: editingStory?.chaptersCount || 0,
      };
      
      if (editingStory?.id) {
        // Update existing story
        await mockServices.coffee.updateStory(editingStory.id, storyData);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث القصة بنجاح",
        });
      } else {
        // Add new story
        await mockServices.coffee.addStory(storyData);
        toast({
          title: "تمت الإضافة بنجاح",
          description: "تمت إضافة القصة بنجاح",
        });
      }
      
      // Refresh stories list
      fetchCoffeeStories();
      setShowAddStoryDialog(false);
      storyForm.reset();
    } catch (error) {
      console.error("Error submitting coffee story:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ القصة",
        variant: "destructive",
      });
    }
  };
  
  // Delete a coffee story
  const handleDeleteStory = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه القصة؟ سيتم حذف جميع الفصول المتعلقة بها أيضاً.")) {
      try {
        await mockServices.coffee.deleteStory(id);
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف القصة بنجاح",
        });
        // Refresh stories list
        fetchCoffeeStories();
        // If currently viewing this story's chapters, reset
        if (selectedStory?.id === id) {
          setSelectedStory(null);
          setChapters([]);
        }
      } catch (error) {
        console.error("Error deleting coffee story:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف القصة",
          variant: "destructive",
        });
      }
    }
  };
  
  // Handle story selection for chapter management
  const handleManageChapters = (story: CoffeeStory) => {
    setSelectedStory(story);
    fetchChapters(story.id!);
  };
  
  // Return to stories list
  const handleBackToStories = () => {
    setSelectedStory(null);
    setChapters([]);
  };
  
  // Open dialog for adding a new chapter
  const handleAddChapterClick = () => {
    if (!selectedStory?.id) return;
    
    setEditingChapter(null);
    chapterForm.reset({
      title: '',
      orderNumber: chapters.length + 1,
      content: '',
    });
    setShowAddChapterDialog(true);
  };
  
  // Open dialog for editing a chapter
  const handleEditChapterClick = (chapter: Chapter) => {
    setEditingChapter(chapter);
    chapterForm.reset({
      title: chapter.title,
      orderNumber: chapter.orderNumber,
      content: chapter.content,
    });
    setShowAddChapterDialog(true);
  };
  
  // Submit function for adding/editing a chapter
  const onSubmitChapter = async (data: ChapterFormValues) => {
    if (!selectedStory?.id) return;
    
    try {
      const chapterData = {
        storyId: selectedStory.id,
        title: data.title,
        orderNumber: data.orderNumber,
        content: data.content,
      };
      
      if (editingChapter?.id) {
        // Update existing chapter
        await mockServices.coffee.updateChapter(editingChapter.id, chapterData);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الفصل بنجاح",
        });
      } else {
        // Add new chapter
        await mockServices.coffee.addChapter(chapterData);
        toast({
          title: "تمت الإضافة بنجاح",
          description: "تمت إضافة الفصل بنجاح",
        });
      }
      
      // Refresh chapters list and story list (for chapter count update)
      fetchChapters(selectedStory.id);
      fetchCoffeeStories();
      setShowAddChapterDialog(false);
      chapterForm.reset();
    } catch (error) {
      console.error("Error submitting chapter:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الفصل",
        variant: "destructive",
      });
    }
  };
  
  // Delete a chapter
  const handleDeleteChapter = async (id: string, storyId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الفصل؟")) {
      try {
        await mockServices.coffee.deleteChapter(id);
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف الفصل بنجاح",
        });
        // Refresh chapters list and story list (for chapter count update)
        fetchChapters(storyId);
        fetchCoffeeStories();
      } catch (error) {
        console.error("Error deleting chapter:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف الفصل",
          variant: "destructive",
        });
      }
    }
  };
  
  // Video functions
  const handleAddVideoClick = () => {
    setEditingVideo(null);
    videoForm.reset({
      title: '',
      description: '',
      category: '',
      duration: '',
      youtubeUrl: '',
    });
    setShowAddVideoDialog(true);
  };
  
  const handleEditVideoClick = (video: Video) => {
    setEditingVideo(video);
    videoForm.reset({
      title: video.title,
      description: video.description,
      category: video.category,
      duration: video.duration,
      youtubeUrl: video.videoUrl,
    });
    setShowAddVideoDialog(true);
  };
  
  const handleDeleteVideo = async (id: string, videoUrl: string, thumbnailUrl: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الفيديو؟")) {
      try {
        await mockServices.videos.delete(id);
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف الفيديو بنجاح",
        });
        fetchVideos();
      } catch (error) {
        console.error("Error deleting video:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف الفيديو",
          variant: "destructive",
        });
      }
    }
  };
  
  const onSubmitVideo = async (data: VideoFormValues) => {
    try {
      // Extract video ID from YouTube URL
      const videoId = extractYouTubeId(data.youtubeUrl);
      if (!videoId) {
        toast({
          title: "خطأ",
          description: "الرجاء إدخال رابط يوتيوب صحيح",
          variant: "destructive",
        });
        return;
      }

      const videoData = {
        title: data.title.trim(),
        description: data.description.trim(),
        category: data.category,
        duration: data.duration.trim(),
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        featured: false,
        views: 0,
        createdAt: Timestamp.now()
      };

      if (editingVideo?.id) {
        await mockServices.videos.update(editingVideo.id, videoData);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الفيديو بنجاح",
        });
      } else {
        await mockServices.videos.add(videoData);
        toast({
          title: "تمت الإضافة بنجاح",
          description: "تمت إضافة الفيديو بنجاح",
        });
      }

      fetchVideos();
      setShowAddVideoDialog(false);
      videoForm.reset();
    } catch (error) {
      console.error("Error submitting video:", error);
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء حفظ الفيديو",
        variant: "destructive",
      });
    }
  };
  
  // Helper function to extract YouTube video ID
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Podcast functions
  const handleAddPodcastClick = () => {
    setEditingPodcast(null);
    podcastForm.reset({
      title: '',
      description: '',
      category: '',
      duration: '',
      guests: '',
      showNotes: '',
    });
    setShowAddPodcastDialog(true);
  };
  
  const handleEditPodcastClick = (podcast: Podcast) => {
    setEditingPodcast(podcast);
    podcastForm.reset({
      title: podcast.title,
      description: podcast.description,
      category: podcast.category,
      duration: podcast.duration,
      episodeNumber: podcast.episodeNumber,
      season: podcast.season,
      guests: podcast.guests?.join(', ') || '',
      showNotes: podcast.showNotes || '',
    });
    setShowAddPodcastDialog(true);
  };
  
  const handleDeletePodcast = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الحلقة؟")) {
      try {
        await mockServices.podcasts.delete(id);
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف الحلقة بنجاح",
        });
        fetchPodcasts();
      } catch (error) {
        console.error("Error deleting podcast:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف الحلقة",
          variant: "destructive",
        });
      }
    }
  };
  
  const onSubmitPodcast = async (data: PodcastFormValues) => {
    try {
      console.log('Submitting podcast data:', data);
      let coverUrl = '';

      // Handle Spotify URL
      if (data.spotifyUrl) {
        const spotifyId = extractSpotifyId(data.spotifyUrl);
        if (!spotifyId) {
          toast({
            title: "خطأ",
            description: "الرجاء إدخال رابط سبوتيفاي صحيح",
            variant: "destructive",
          });
          return;
        }
        // You can use Spotify's API to get the cover image, but for now we'll use a placeholder
        coverUrl = `https://i.scdn.co/image/ab67616d0000b273${spotifyId}`;
      }
      // Handle YouTube URL
      else if (data.youtubeUrl) {
        const youtubeId = extractYouTubeId(data.youtubeUrl);
        if (!youtubeId) {
          toast({
            title: "خطأ",
            description: "الرجاء إدخال رابط يوتيوب صحيح",
            variant: "destructive",
          });
          return;
        }
        audioUrl = data.youtubeUrl;
        coverUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
      }
      else {
        toast({
          title: "خطأ",
          description: "الرجاء إدخال رابط سبوتيفاي أو يوتيوب",
          variant: "destructive",
        });
        return;
      }

      const podcastData = {
        title: data.title,
        description: data.description,
        category: data.category,
        duration: data.duration,
        episodeNumber: data.episodeNumber,
        season: data.season,
        guests: data.guests ? data.guests.split(',').map(g => g.trim()) : [],
        showNotes: data.showNotes,
        audioUrl: audioUrl,
        coverUrl: coverUrl,
        featured: false,
        listens: 0,
        youtubeUrl: data.youtubeUrl,
        spotifyUrl: data.spotifyUrl
      };

      console.log('Final podcast data to save:', podcastData);

      if (editingPodcast?.id) {
        await mockServices.podcasts.update(editingPodcast.id, podcastData);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الحلقة بنجاح",
        });
      } else {
        await mockServices.podcasts.add(podcastData);
        toast({
          title: "تمت الإضافة بنجاح",
          description: "تمت إضافة الحلقة بنجاح",
        });
      }

      fetchPodcasts();
      setShowAddPodcastDialog(false);
      podcastForm.reset();
    } catch (error) {
      console.error("Error submitting podcast:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الحلقة",
        variant: "destructive",
      });
    }
  };
  
  // Helper function to extract Spotify episode ID
  const extractSpotifyId = (url: string): string | null => {
    const regExp = /episode\/([a-zA-Z0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
  
  // Add contact form handlers
  const handleViewForm = (form: ContactForm) => {
    setSelectedForm(form);
    setShowViewFormDialog(true);
    
    // Mark as read if it's new
    if (form.status === 'new') {
      const formRef = doc(db, 'contactForms', form.id);
      updateDoc(formRef, { status: 'read' });
      fetchContactForms();
    }
  };

  const handleDeleteForm = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      try {
        const formRef = doc(db, 'contactForms', id);
        await deleteDoc(formRef);
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف الرسالة بنجاح",
        });
        fetchContactForms();
      } catch (error) {
        console.error("Error deleting contact form:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف الرسالة",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpdateFormStatus = async (id: string, status: ContactForm['status']) => {
    try {
      const formRef = doc(db, 'contactForms', id);
      await updateDoc(formRef, { status });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث حالة الرسالة بنجاح",
      });
      fetchContactForms();
    } catch (error) {
      console.error("Error updating contact form status:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث حالة الرسالة",
        variant: "destructive",
      });
    }
  };
  
  if (authLoading) {
    // Show a loading indicator while checking auth state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">جاري التحقق من حالة المصادقة...</p>
      </div>
    );
  }

  if (!user) {
    // Show Firebase login form if not authenticated
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-saudi text-center">لوحة التحكم</h1>
          
          <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <p className="mb-6 text-center">
              يرجى تسجيل الدخول بحساب Firebase للوصول إلى لوحة التحكم
            </p>
            
            <form onSubmit={handleFirebaseLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل البريد الإلكتروني"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  كلمة المرور
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full"
                  required
                />
              </div>
              
              <Button 
                className="bg-saudi hover:bg-saudi-dark w-full"
                type="submit"
                disabled={authLoading} // Disable button while authenticating
              >
                {authLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-saudi"
                onClick={() => navigate('/')}
              >
                العودة إلى الصفحة الرئيسية
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render admin panel if authenticated
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-saudi">لوحة التحكم</h1>
          <Button 
            variant="outline" 
            className="border-saudi text-saudi hover:bg-saudi-light"
            onClick={handleFirebaseLogout} // Use Firebase logout
          >
            تسجيل الخروج
          </Button>
        </div>
        
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="videos">الفيديوهات</TabsTrigger>
            <TabsTrigger value="podcasts">البودكاست</TabsTrigger>
            <TabsTrigger value="benefits">القول المفيد</TabsTrigger>
            <TabsTrigger value="coffee-eyes">عيون القهوة</TabsTrigger>
            <TabsTrigger value="contact">الرسائل</TabsTrigger>
          </TabsList>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-saudi">إدارة الفيديوهات</h2>
              <Button 
                onClick={handleAddVideoClick}
                className="bg-saudi hover:bg-saudi-dark flex items-center gap-2"
              >
                <Plus size={18} />
                إضافة فيديو جديد
              </Button>
            </div>
            
            <p className="text-gray-500 mb-8">يمكنك هنا إضافة وتعديل وحذف الفيديوهات</p>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">جاري تحميل البيانات...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{video.title}</CardTitle>
                          <CardDescription>{video.category}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditVideoClick(video)}
                            className="border-gray-300"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline"
                            size="icon"
                            className="border-destructive text-destructive"
                            onClick={() => video.id && handleDeleteVideo(video.id, video.videoUrl, video.thumbnailUrl)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video relative overflow-hidden rounded-md mb-4">
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="line-clamp-2 text-gray-600">{video.description}</p>
                      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                        <span>{video.duration}</span>
                        <span>{video.views} مشاهدة</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {videos.length === 0 && (
                  <div className="text-center py-12 col-span-3">
                    <p className="text-gray-500">لا توجد فيديوهات مضافة</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Podcasts Tab */}
          <TabsContent value="podcasts" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-saudi">إدارة البودكاست</h2>
              <Button 
                onClick={handleAddPodcastClick}
                className="bg-saudi hover:bg-saudi-dark flex items-center gap-2"
              >
                <Plus size={18} />
                إضافة حلقة جديدة
              </Button>
            </div>
            
            <p className="text-gray-500 mb-8">يمكنك هنا إضافة وتعديل وحذف حلقات البودكاست</p>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">جاري تحميل البيانات...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {podcasts.map((podcast) => (
                  <Card key={podcast.id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{podcast.title}</CardTitle>
                      <CardDescription>
                        {podcast.description}
                        <div className="mt-2">
                          <span className="text-sm text-gray-500">المدة: {podcast.duration}</span>
                          {podcast.episodeNumber && (
                            <span className="text-sm text-gray-500 mr-4">الحلقة: {podcast.episodeNumber}</span>
                          )}
                          {podcast.season && (
                            <span className="text-sm text-gray-500 mr-4">الموسم: {podcast.season}</span>
                          )}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPodcastClick(podcast)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            تعديل
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeletePodcast(podcast.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            حذف
                          </Button>
                        </div>
                        {(podcast.spotifyUrl || podcast.youtubeUrl) && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => window.open(podcast.spotifyUrl || podcast.youtubeUrl, '_blank')}
                          >
                            <Headphones className="h-4 w-4 mr-2" />
                            تشغيل
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {podcasts.length === 0 && (
                  <div className="text-center py-12 col-span-3">
                    <Headphones className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">لا توجد حلقات بودكاست مضافة</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Benefits Tab */}
          <TabsContent value="benefits" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-saudi">إدارة القول المفيد</h2>
              <Button 
                onClick={handleAddBenefitClick}
                className="bg-saudi hover:bg-saudi-dark flex items-center gap-2"
              >
                <Plus size={18} />
                إضافة فائدة جديدة
              </Button>
            </div>
            
            <p className="text-gray-500 mb-8">يمكنك هنا إضافة وتعديل وحذف الفوائد العلمية</p>
            
            {/* Benefits list */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">جاري تحميل البيانات...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {benefits.length > 0 ? (
                  benefits.map((benefit) => (
                    <Card key={benefit.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{benefit.bookName}</CardTitle>
                            <CardDescription>{benefit.volumeAndPage}</CardDescription>
                          </div>
                          <div className="category-badge">{benefit.category}</div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-bold mb-2">نص الفائدة:</h3>
                            <p className="text-gray-700">
                              {benefit.benefitText}
                            </p>
                          </div>
                          {benefit.scholarComment && (
                            <div>
                              <h3 className="font-bold mb-2">تعليق العلماء:</h3>
                              <p className="text-gray-700">
                                {benefit.scholarComment}
                              </p>
                            </div>
                          )}
                          <div className="flex gap-2 pt-4 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-saudi text-saudi"
                              onClick={() => handleEditBenefitClick(benefit)}
                            >
                              <Edit size={16} className="mr-2" />
                              تعديل
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-destructive text-destructive"
                              onClick={() => benefit.id && handleDeleteBenefit(benefit.id)}
                            >
                              <Trash2 size={16} className="mr-2" />
                              حذف
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">لا توجد فوائد مضافة</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Coffee Eyes Tab */}
          <TabsContent value="coffee-eyes" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            {!selectedStory ? (
              // Stories list view
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: "#6F4E37" }}>إدارة عيون القهوة</h2>
                  <Button 
                    onClick={handleAddStoryClick}
                    className="flex items-center gap-2"
                    style={{ backgroundColor: "#6F4E37", color: "white" }}
                  >
                    <Plus size={18} />
                    إضافة قصة جديدة
                  </Button>
                </div>
                
                <p className="text-gray-500 mb-8">يمكنك هنا إضافة وتعديل وحذف القصص والروايات</p>
                
                {/* Coffee Stories list */}
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">جاري تحميل البيانات...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coffeeStories.length > 0 ? (
                      coffeeStories.map((story) => (
                        <Card key={story.id} className="flex flex-col">
                          <CardHeader>
                            <div>
                              <CardTitle>{story.title}</CardTitle>
                              <CardDescription>بقلم: {story.author}</CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="aspect-[2/3] relative overflow-hidden rounded-md mb-4">
                              <img 
                                src={story.cover || 'https://via.placeholder.com/300x450?text=غلاف+الكتاب'} 
                                alt={story.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <p className="line-clamp-3 text-gray-700">{story.summary}</p>
                            <p className="mt-2 text-sm text-gray-500">
                              {story.chaptersCount} فصول
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-4">
                            <Button 
                              variant="secondary" 
                              className="flex items-center gap-1"
                              onClick={() => handleManageChapters(story)}
                            >
                              <BookOpen size={16} />
                              الفصول
                            </Button>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditStoryClick(story)}
                                className="border-gray-300"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="outline"
                                size="icon"
                                className="border-destructive text-destructive"
                                onClick={() => story.id && handleDeleteStory(story.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 col-span-3">
                        <Coffee className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500">لا توجد قصص مضافة</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              // Chapters management view
              <>
                <div className="flex items-center mb-6">
                  <Button 
                    variant="outline" 
                    onClick={handleBackToStories}
                    className="ml-4"
                  >
                    العودة للقصص
                  </Button>
                  <h2 className="text-2xl font-bold" style={{ color: "#6F4E37" }}>
                    إدارة فصول: {selectedStory.title}
                  </h2>
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <p className="text-gray-500">
                    عدد الفصول: {selectedStory.chaptersCount || 0}
                  </p>
                  <Button 
                    onClick={handleAddChapterClick}
                    className="flex items-center gap-2"
                    style={{ backgroundColor: "#6F4E37", color: "white" }}
                  >
                    <Plus size={18} />
                    إضافة فصل جديد
                  </Button>
                </div>
                
                {/* Chapters list */}
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">جاري تحميل البيانات...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {chapters.length > 0 ? (
                      chapters.map((chapter) => (
                        <Card key={chapter.id}>
                          <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                              <CardTitle>
                                {chapter.title} - الفصل {chapter.orderNumber}
                              </CardTitle>
                              <CardDescription>
                                {chapter.content.length} حرف
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditChapterClick(chapter)}
                                className="border-gray-300"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="outline"
                                size="icon"
                                className="border-destructive text-destructive"
                                onClick={() => chapter.id && handleDeleteChapter(chapter.id, chapter.storyId)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="line-clamp-3 text-gray-700">
                              {chapter.content}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500">لا توجد فصول مضافة بعد</p>
                        <p className="text-sm text-gray-400 mt-2">
                          اضغط على زر "إضافة فصل جديد" لإضافة أول فصل
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          {/* Contact Tab */}
          <TabsContent value="contact" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-saudi">الرسائل الواردة</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    console.log('Manual refresh clicked');
                    fetchContactForms();
                  }}
                  className="border-saudi text-saudi"
                >
                  تحديث
                </Button>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">جاري تحميل الرسائل...</p>
              </div>
            ) : contactForms && contactForms.length > 0 ? (
              <div className="space-y-4">
                {contactForms.map((form) => (
                  <Card key={form.id} className="hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {form.name}
                            {form.status === 'new' && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                جديد
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription>{form.email}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {form.createdAt instanceof Timestamp 
                              ? form.createdAt.toDate().toLocaleDateString('ar-SA')
                              : new Date(form.createdAt).toLocaleDateString('ar-SA')}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleViewForm(form)}
                              className="border-gray-300"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="outline"
                              size="icon"
                              className="border-destructive text-destructive"
                              onClick={() => handleDeleteForm(form.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium mb-2">{form.subject}</p>
                      <p className="text-gray-600 line-clamp-2">{form.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">لا توجد رسائل واردة</p>
                <p className="text-sm text-gray-400 mt-2">
                  تأكد من وجود رسائل في مجموعة 'contactForms' في قاعدة البيانات
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialog for adding/editing a benefit */}
      <Dialog open={showAddBenefitDialog} onOpenChange={setShowAddBenefitDialog}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-saudi">
              {editingBenefit ? 'تعديل فائدة' : 'إضافة فائدة جديدة'}
            </DialogTitle>
          </DialogHeader>
          <Form {...benefitForm}>
            <form onSubmit={benefitForm.handleSubmit(onSubmitBenefit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={benefitForm.control}
                  name="bookName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الكتاب</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم الكتاب والمؤلف" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={benefitForm.control}
                  name="volumeAndPage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المجلد والصفحة</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: المجلد 3، صفحة 125" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={benefitForm.control}
                name="benefitText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نص الفائدة</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل نص الفائدة العلمية" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={benefitForm.control}
                name="scholarComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعليق العلماء (اختياري)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل تعليق العلماء إن وجد" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={benefitForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التصنيف</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر تصنيفًا" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="العقيدة">العقيدة</SelectItem>
                        <SelectItem value="الفقه">الفقه</SelectItem>
                        <SelectItem value="التاريخ الإسلامي">التاريخ الإسلامي</SelectItem>
                        <SelectItem value="الحديث">الحديث</SelectItem>
                        <SelectItem value="التفسير">التفسير</SelectItem>
                        <SelectItem value="العلم">العلم</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddBenefitDialog(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="bg-saudi hover:bg-saudi-dark">
                  <BookPlus className="ml-2" size={18} />
                  {editingBenefit ? 'تحديث الفائدة' : 'إضافة الفائدة'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for adding/editing a coffee story */}
      <Dialog open={showAddStoryDialog} onOpenChange={setShowAddStoryDialog}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ color: "#6F4E37" }}>
              {editingStory ? 'تعديل قصة' : 'إضافة قصة جديدة'}
            </DialogTitle>
          </DialogHeader>
          <Form {...storyForm}>
            <form onSubmit={storyForm.handleSubmit(onSubmitStory)} className="space-y-6">
              <FormField
                control={storyForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان القصة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان القصة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={storyForm.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المؤلف</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم المؤلف" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={storyForm.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملخص القصة</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل ملخصاً مختصراً للقصة" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={storyForm.control}
                name="coverFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>صورة الغلاف</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} // Access files[0] and handle null
                        // Do not spread field.value or field.rest onto file input
                      />
                    </FormControl>
                    <FormMessage />
                    {editingStory?.cover && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">الغلاف الحالي:</p>
                        <div className="w-24 h-36 overflow-hidden rounded">
                          <img 
                            src={editingStory.cover} 
                            alt="Current cover" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              
              <DialogFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddStoryDialog(false)}>
                  إلغاء
                </Button>
                <Button 
                  type="submit" 
                  style={{ backgroundColor: "#6F4E37", color: "white" }}
                >
                  <BookPlus className="ml-2" size={18} />
                  {editingStory ? 'تحديث القصة' : 'إضافة القصة'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for adding/editing a chapter */}
      <Dialog open={showAddChapterDialog} onOpenChange={setShowAddChapterDialog}>
        <DialogContent className="sm:max-w-[800px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ color: "#6F4E37" }}>
              {editingChapter ? 'تعديل فصل' : 'إضافة فصل جديد'}
            </DialogTitle>
          </DialogHeader>
          <Form {...chapterForm}>
            <form onSubmit={chapterForm.handleSubmit(onSubmitChapter)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <FormField
                    control={chapterForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان الفصل</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل عنوان الفصل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={chapterForm.control}
                  name="orderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الفصل</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="رقم الفصل"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={chapterForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>محتوى الفصل</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل محتوى الفصل..." 
                        className="min-h-[300px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddChapterDialog(false)}>
                  إلغاء
                </Button>
                <Button 
                  type="submit" 
                  style={{ backgroundColor: "#6F4E37", color: "white" }}
                >
                  <BookPlus className="ml-2" size={18} />
                  {editingChapter ? 'تحديث الفصل' : 'إضافة الفصل'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for adding/editing a video */}
      <Dialog open={showAddVideoDialog} onOpenChange={setShowAddVideoDialog}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-saudi">
              {editingVideo ? 'تعديل فيديو' : 'إضافة فيديو جديد'}
            </DialogTitle>
          </DialogHeader>
          <Form {...videoForm}>
            <form onSubmit={videoForm.handleSubmit(onSubmitVideo)} className="space-y-6">
              <FormField
                control={videoForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الفيديو</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان الفيديو" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={videoForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الفيديو</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل وصفاً مختصراً للفيديو" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={videoForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>التصنيف</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر تصنيفاً" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="العقيدة">العقيدة</SelectItem>
                          <SelectItem value="الفقه">الفقه</SelectItem>
                          <SelectItem value="التاريخ الإسلامي">التاريخ الإسلامي</SelectItem>
                          <SelectItem value="الحديث">الحديث</SelectItem>
                          <SelectItem value="التفسير">التفسير</SelectItem>
                          <SelectItem value="العلم">العلم</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={videoForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المدة</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: 10:30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={videoForm.control}
                name="youtubeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط يوتيوب</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="أدخل رابط فيديو يوتيوب" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddVideoDialog(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="bg-saudi hover:bg-saudi-dark">
                  {editingVideo ? 'تحديث الفيديو' : 'إضافة الفيديو'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for adding/editing a podcast */}
      <Dialog open={showAddPodcastDialog} onOpenChange={setShowAddPodcastDialog}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-saudi">
              {editingPodcast ? 'تعديل حلقة' : 'إضافة حلقة جديدة'}
            </DialogTitle>
          </DialogHeader>
          <Form {...podcastForm}>
            <form onSubmit={podcastForm.handleSubmit(onSubmitPodcast)} className="space-y-6">
              <FormField
                control={podcastForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الحلقة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان الحلقة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={podcastForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الحلقة</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل وصفاً مختصراً للحلقة" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={podcastForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>التصنيف</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر تصنيفاً" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="العقيدة">العقيدة</SelectItem>
                          <SelectItem value="الفقه">الفقه</SelectItem>
                          <SelectItem value="التاريخ الإسلامي">التاريخ الإسلامي</SelectItem>
                          <SelectItem value="الحديث">الحديث</SelectItem>
                          <SelectItem value="التفسير">التفسير</SelectItem>
                          <SelectItem value="العلم">العلم</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={podcastForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المدة</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: 45:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={podcastForm.control}
                  name="episodeNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الحلقة</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="رقم الحلقة"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={podcastForm.control}
                  name="season"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الموسم</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="رقم الموسم"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={podcastForm.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الضيوف (اختياري)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="أدخل أسماء الضيوف مفصولة بفواصل" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={podcastForm.control}
                name="showNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملاحظات الحلقة (اختياري)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل ملاحظات الحلقة" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormField
                  control={podcastForm.control}
                  name="spotifyUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رابط سبوتيفاي (اختياري)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="أدخل رابط حلقة سبوتيفاي" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={podcastForm.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رابط يوتيوب (اختياري)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="أدخل رابط فيديو يوتيوب" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddPodcastDialog(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="bg-saudi hover:bg-saudi-dark">
                  {editingPodcast ? 'تحديث الحلقة' : 'إضافة الحلقة'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Add Contact Form Dialog */}
      <Dialog open={showFormDialog} onOpenChange={setShowFormDialog}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-saudi">
              تفاصيل الرسالة
            </DialogTitle>
          </DialogHeader>
          {selectedForm && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-500">الاسم</h3>
                  <p>{selectedForm.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">البريد الإلكتروني</h3>
                  <p>{selectedForm.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-500">الموضوع</h3>
                <p>{selectedForm.subject}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-500">الرسالة</h3>
                <p className="whitespace-pre-wrap">{selectedForm.message}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-500 mb-2">حالة الرسالة</h3>
                <div className="flex gap-2">
                  <Button
                    variant={selectedForm.status === 'new' ? 'default' : 'outline'}
                    onClick={() => handleUpdateFormStatus(selectedForm.id, 'new')}
                    className={selectedForm.status === 'new' ? 'bg-green-600' : ''}
                  >
                    جديد
                  </Button>
                  <Button
                    variant={selectedForm.status === 'read' ? 'default' : 'outline'}
                    onClick={() => handleUpdateFormStatus(selectedForm.id, 'read')}
                    className={selectedForm.status === 'read' ? 'bg-blue-600' : ''}
                  >
                    مقروء
                  </Button>
                  <Button
                    variant={selectedForm.status === 'replied' ? 'default' : 'outline'}
                    onClick={() => handleUpdateFormStatus(selectedForm.id, 'replied')}
                    className={selectedForm.status === 'replied' ? 'bg-purple-600' : ''}
                  >
                    تم الرد
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFormDialog(false)}
                >
                  إغلاق
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Contact Form Dialog */}
      <Dialog open={showViewFormDialog} onOpenChange={setShowViewFormDialog}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-saudi">
              تفاصيل الرسالة
            </DialogTitle>
          </DialogHeader>
          
          {selectedForm && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">المرسل</h3>
                  <p className="mt-1">{selectedForm.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">البريد الإلكتروني</h3>
                  <p className="mt-1">{selectedForm.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">التاريخ</h3>
                <p className="mt-1">
                  {selectedForm.createdAt instanceof Timestamp 
                    ? selectedForm.createdAt.toDate().toLocaleDateString('ar-SA')
                    : new Date(selectedForm.createdAt).toLocaleDateString('ar-SA')}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">الموضوع</h3>
                <p className="mt-1">{selectedForm.subject}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">الرسالة</h3>
                <p className="mt-1 whitespace-pre-wrap">{selectedForm.message}</p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowViewFormDialog(false)}
                >
                  إغلاق
                </Button>
                {selectedForm.status !== 'replied' && (
                  <Button 
                    onClick={() => handleUpdateFormStatus(selectedForm.id, 'replied')}
                    className="bg-saudi hover:bg-saudi-dark"
                  >
                    تم الرد
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
