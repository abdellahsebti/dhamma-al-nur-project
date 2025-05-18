
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'الاسم يجب أن يكون أكثر من حرفين',
  }),
  email: z.string().email({
    message: 'البريد الإلكتروني غير صحيح',
  }),
  phone: z.string().min(10, {
    message: 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل',
  }),
  specialization: z.string().min(2, {
    message: 'التخصص مطلوب',
  }),
  message: z.string().min(10, {
    message: 'الرسالة يجب أن تكون أكثر من 10 أحرف',
  }),
  acceptRules: z.boolean().refine(val => val === true, {
    message: 'يجب الموافقة على الشروط قبل إرسال الطلب',
  }),
});

const Join: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      specialization: '',
      message: '',
      acceptRules: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Here we would send the data to Firebase
    // For now, we'll just simulate a delay
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
      form.reset();
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-saudi">انضم إلى مشروع ضمة</h1>
        
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 space-x-reverse mb-10">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover-scale">
            <Instagram className="w-8 h-8 text-saudi hover:text-saudi-dark transition-colors" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover-scale">
            <Facebook className="w-8 h-8 text-saudi hover:text-saudi-dark transition-colors" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover-scale">
            <Linkedin className="w-8 h-8 text-saudi hover:text-saudi-dark transition-colors" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover-scale">
            <Youtube className="w-8 h-8 text-saudi hover:text-saudi-dark transition-colors" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Rules Section */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light relative overflow-hidden">
            <div className="absolute inset-0 arabesque-bg opacity-10"></div>
            <h2 className="text-2xl font-bold mb-6 text-saudi relative z-10">شروط الانضمام للمشروع</h2>
            
            <Accordion type="single" collapsible className="relative z-10">
              <AccordionItem value="item-1" className="animate-fade-in border-t-0 border-b border-saudi-light">
                <AccordionTrigger className="hover:text-saudi">الالتزام بالمنهج السلفي</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  يجب أن يكون المتقدم ملتزماً بالمنهج السلفي الصحيح، متبعاً للكتاب والسنة على فهم السلف الصالح، بعيداً عن البدع والمحدثات في الدين.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="animate-fade-in border-b border-saudi-light" style={{ animationDelay: '100ms' }}>
                <AccordionTrigger className="hover:text-saudi">المعرفة العلمية</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  يُفضل أن يكون المتقدم لديه خلفية علمية شرعية أو في مجال تخصصه، وأن يكون قادراً على البحث والتوثيق العلمي الدقيق.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="animate-fade-in border-b border-saudi-light" style={{ animationDelay: '200ms' }}>
                <AccordionTrigger className="hover:text-saudi">الالتزام بالمواعيد</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  المتقدم يلتزم بإنجاز المهام الموكلة إليه في المواعيد المحددة، ويكون منضبطاً في العمل والتواصل مع فريق المشروع.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="animate-fade-in border-b border-saudi-light" style={{ animationDelay: '300ms' }}>
                <AccordionTrigger className="hover:text-saudi">الدقة في النقل والتوثيق</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  الحرص على الدقة في نقل المعلومات وتوثيقها من مصادرها الأصلية، واتباع المنهجية العلمية في البحث والتحقيق.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="animate-fade-in border-b-0" style={{ animationDelay: '400ms' }}>
                <AccordionTrigger className="hover:text-saudi">حقوق الملكية</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  كل ما ينشر ضمن المشروع يكون حقوقه محفوظة للمشروع، مع ذكر اسم المساهم في العمل كمرجع للمشاركة.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-6 p-4 bg-saudi-light/30 rounded-lg relative z-10 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <h3 className="font-bold text-saudi">ملاحظة هامة:</h3>
              <p className="text-gray-700">هذه الشروط قابلة للتعديل والتحديث من قبل إدارة المشروع، ويتم إخطار المشاركين بأي تغييرات تطرأ عليها.</p>
            </div>
          </div>
          
          {/* Join Form */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <h2 className="text-2xl font-bold mb-6 text-saudi">نموذج طلب الانضمام</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسمك الكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@domain.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input placeholder="+966 5XXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>التخصص</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: العقيدة، الفقه، التفسير..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نبذة عنك ودوافع الانضمام</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="اكتب هنا نبذة مختصرة عن نفسك وخبراتك ودوافعك للانضمام للمشروع..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="acceptRules"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-x-reverse space-y-0 p-4 border border-saudi-light/50 rounded-lg">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          أقر بأنني اطلعت على شروط الانضمام للمشروع وأوافق عليها
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-saudi hover:bg-saudi-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري إرسال الطلب...' : 'إرسال طلب الانضمام'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
