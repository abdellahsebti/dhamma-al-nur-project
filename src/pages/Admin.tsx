
import React, { useState } from 'react';
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
import { Plus, BookPlus } from 'lucide-react';

// Benefit form type
interface BenefitFormValues {
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
}

const Admin: React.FC = () => {
  // In a real implementation, this would check Firebase Auth status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAddBenefitDialog, setShowAddBenefitDialog] = useState(false);
  const navigate = useNavigate();
  
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
  
  // Mock login function (would use Firebase Auth in real implementation)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo authentication with basic validation
    if (email && password) {
      setIsAuthenticated(true);
      setEmail('');
      setPassword('');
    }
  };
  
  // Mock submit function for adding a benefit
  const onSubmitBenefit = (data: BenefitFormValues) => {
    console.log('Benefit submitted:', data);
    // Here you would add the benefit to Firestore
    setShowAddBenefitDialog(false);
    benefitForm.reset();
  };
  
  if (!isAuthenticated) {
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
            onClick={() => setIsAuthenticated(false)}
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
                onClick={() => setShowAddBenefitDialog(true)}
                className="bg-saudi hover:bg-saudi-dark flex items-center gap-2"
              >
                <Plus size={18} />
                إضافة فائدة جديدة
              </Button>
            </div>
            
            <p className="text-gray-500 mb-8">يمكنك هنا إضافة وتعديل وحذف الفوائد العلمية</p>
            
            {/* Benefits list would go here */}
            <div className="grid grid-cols-1 gap-6">
              {/* This would be populated with benefits from Firestore */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>البداية والنهاية - لابن كثير</CardTitle>
                      <CardDescription>المجلد 9، صفحة 357</CardDescription>
                    </div>
                    <div className="category-badge">التاريخ الإسلامي</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-2">نص الفائدة:</h3>
                      <p className="text-gray-700">
                        قال ابن كثير: "وكان عمر بن عبد العزيز من خيار خلفاء بني أمية، وكان عادلًا في رعيته، متبعًا للسنة، مجتهدًا في العبادة."
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">تعليق العلماء:</h3>
                      <p className="text-gray-700">
                        قال الإمام الذهبي: "كان عمر بن عبد العزيز إمامًا عادلًا، مقتديًا بالخلفاء الراشدين، في زهده وورعه وعدله."
                      </p>
                    </div>
                    <div className="flex gap-2 pt-4 justify-end">
                      <Button variant="outline" size="sm" className="border-saudi text-saudi">تعديل</Button>
                      <Button variant="outline" size="sm" className="border-destructive text-destructive">حذف</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <h2 className="text-2xl font-bold mb-6 text-saudi">الرسائل الواردة</h2>
            <p className="text-gray-500">عرض الرسائل المرسلة من نموذج التواصل</p>
            {/* Contact messages interface would go here */}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialog for adding a new benefit */}
      <Dialog open={showAddBenefitDialog} onOpenChange={setShowAddBenefitDialog}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-saudi">إضافة فائدة جديدة</DialogTitle>
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
                  إضافة الفائدة
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
