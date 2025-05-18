
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Plus, BookPlus, Trash2, Edit } from 'lucide-react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  addBenefit, 
  getBenefits, 
  deleteBenefit, 
  updateBenefit,
  Benefit 
} from '@/services/benefitsService';

// Benefit form type
interface BenefitFormValues {
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
}

const Admin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAddBenefitDialog, setShowAddBenefitDialog] = useState(false);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
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
  
  // Fetch benefits from Firestore
  useEffect(() => {
    if (user) {
      fetchBenefits();
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
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="videos">الفيديوهات</TabsTrigger>
            <TabsTrigger value="podcasts">البودكاست</TabsTrigger>
            <TabsTrigger value="benefits">القول المفيد</TabsTrigger>
            <TabsTrigger value="contact">الرسائل</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <h2 className="text-2xl font-bold mb-6 text-saudi">إدارة الفيديوهات</h2>
            <p className="text-gray-500">يمكنك هنا إضافة وتعديل وحذف الفيديوهات</p>
            {/* Video management interface would go here */}
          </TabsContent>
          
          <TabsContent value="podcasts" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <h2 className="text-2xl font-bold mb-6 text-saudi">إدارة البودكاست</h2>
            <p className="text-gray-500">يمكنك هنا إضافة وتعديل وحذف البودكاست</p>
            {/* Podcast management interface would go here */}
          </TabsContent>
          
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
    </div>
  );
};

export default Admin;
