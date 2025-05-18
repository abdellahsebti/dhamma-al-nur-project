
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
import { Plus, BookPlus, Trash2, Edit, Coffee, BookOpen, FileText } from 'lucide-react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  addBenefit, 
  getBenefits, 
  deleteBenefit, 
  updateBenefit,
  Benefit 
} from '@/services/benefitsService';
import {
  addCoffeeStory,
  getCoffeeStories,
  deleteCoffeeStory,
  updateCoffeeStory,
  uploadCoverImage,
  addChapter,
  getChapters,
  updateChapter,
  deleteChapter,
  CoffeeStory,
  Chapter
} from '@/services/coffeeService';
import { adminEmail, adminPassword } from '@/lib/firebase';

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

const Admin: React.FC = () => {
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState('');
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
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use our Firebase authentication hook
  const { user, signIn, signOut, error: authError } = useFirebaseAuth();
  
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
  
  // Fetch benefits from Firestore
  useEffect(() => {
    if (user) {
      fetchBenefits();
      fetchCoffeeStories();
    }
  }, [user]);
  
  // Fetch benefits function
  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const fetchedBenefits = await getBenefits();
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
  
  // Fetch coffee stories function
  const fetchCoffeeStories = async () => {
    try {
      setLoading(true);
      const fetchedStories = await getCoffeeStories();
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
      const fetchedChapters = await getChapters(storyId);
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
  
  // Login with Firebase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await signIn(email, password);
      if (authError) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "يرجى التحقق من البريد الإلكتروني وكلمة المرور",
          variant: "destructive",
        });
      }
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };
  
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
        await updateBenefit(editingBenefit.id, data);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الفائدة بنجاح",
        });
      } else {
        // Add new benefit
        await addBenefit(data);
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
        await deleteBenefit(id);
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
      let coverUrl = editingStory?.cover || '';
      
      // Upload cover image if provided
      if (data.coverFile && data.coverFile.length > 0) {
        coverUrl = await uploadCoverImage(data.coverFile[0]);
      }
      
      const storyData = {
        title: data.title,
        author: data.author,
        summary: data.summary,
        cover: coverUrl,
        chaptersCount: editingStory?.chaptersCount || 0,
      };
      
      if (editingStory?.id) {
        // Update existing story
        await updateCoffeeStory(editingStory.id, storyData);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث القصة بنجاح",
        });
      } else {
        // Add new story
        await addCoffeeStory(storyData);
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
  const handleDeleteStory = async (id: string, coverUrl?: string) => {
    if (confirm("هل أنت متأكد من حذف هذه القصة؟ سيتم حذف جميع الفصول المتعلقة بها أيضاً.")) {
      try {
        await deleteCoffeeStory(id, coverUrl);
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
        await updateChapter(editingChapter.id, chapterData);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الفصل بنجاح",
        });
      } else {
        // Add new chapter
        await addChapter(chapterData);
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
        await deleteChapter(id, storyId);
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
  
  if (!user) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-saudi text-center">لوحة التحكم</h1>
          
          <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <p className="mb-6 text-center">
              يرجى تسجيل الدخول للوصول إلى لوحة التحكم
            </p>
            
            <form onSubmit={handleLogin} className="space-y-4">
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
              >
                تسجيل الدخول
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
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-saudi">لوحة التحكم</h1>
          <Button 
            variant="outline" 
            className="border-saudi text-saudi hover:bg-saudi-light"
            onClick={handleLogout}
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
            <h2 className="text-2xl font-bold mb-6 text-saudi">إدارة الفيديوهات</h2>
            <p className="text-gray-500">يمكنك هنا إضافة وتعديل وحذف الفيديوهات</p>
            {/* Video management interface would go here */}
          </TabsContent>
          
          {/* Podcasts Tab */}
          <TabsContent value="podcasts" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <h2 className="text-2xl font-bold mb-6 text-saudi">إدارة البودكاست</h2>
            <p className="text-gray-500">يمكنك هنا إضافة وتعديل وحذف البودكاست</p>
            {/* Podcast management interface would go here */}
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
                                onClick={() => story.id && handleDeleteStory(story.id, story.cover)}
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
            <h2 className="text-2xl font-bold mb-6 text-saudi">الرسائل الواردة</h2>
            <p className="text-gray-500">عرض الرسائل المرسلة من نموذج التواصل</p>
            {/* Contact messages interface would go here */}
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
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>صورة الغلاف</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files)}
                        {...rest}
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
    </div>
  );
};

export default Admin;
