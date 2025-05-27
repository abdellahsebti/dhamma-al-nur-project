import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, serverTimestamp, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Check rate limit on component mount
  useEffect(() => {
    checkRateLimit();
  }, []);

  const checkRateLimit = async () => {
    try {
      const contactFormsRef = collection(db, 'contactForms');
      const oneHourAgo = Timestamp.fromMillis(Date.now() - 3600000);
      
      const q = query(
        contactFormsRef,
        where('createdAt', '>', oneHourAgo)
      );
      
      const querySnapshot = await getDocs(q);
      setIsRateLimited(querySnapshot.size >= 3);
    } catch (error) {
      console.error('Error checking rate limit:', error);
      setIsRateLimited(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message || !formData.subject) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return false;
    }

    // Validate name (2-50 characters, no numbers)
    if (formData.name.length < 2 || formData.name.length > 50 || /\d/.test(formData.name)) {
      toast({
        title: "خطأ في الاسم",
        description: "يجب أن يكون الاسم بين 2 و 50 حرفاً ولا يحتوي على أرقام",
        variant: "destructive",
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "خطأ في البريد الإلكتروني",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive",
      });
      return false;
    }

    // Validate subject (3-100 characters)
    if (formData.subject.length < 3 || formData.subject.length > 100) {
      toast({
        title: "خطأ في الموضوع",
        description: "يجب أن يكون الموضوع بين 3 و 100 حرف",
        variant: "destructive",
      });
      return false;
    }

    // Validate message (10-1000 characters)
    if (formData.message.length < 10 || formData.message.length > 1000) {
      toast({
        title: "خطأ في الرسالة",
        description: "يجب أن تكون الرسالة بين 10 و 1000 حرف",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRateLimited) {
      toast({
        title: "تم تجاوز الحد المسموح",
        description: "يرجى المحاولة مرة أخرى بعد ساعة",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Check rate limit before submitting
      await checkRateLimit();
      
      if (isRateLimited) {
        toast({
          title: "تم تجاوز الحد المسموح",
          description: "يرجى المحاولة مرة أخرى بعد ساعة",
          variant: "destructive",
        });
        return;
      }

      // Get IP address using a public API with fallback
      let ipAddress = 'unknown';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      } catch (error) {
        console.error('Error fetching IP:', error);
      }

      // Prepare contact data
      const contactData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: 'new',
        createdAt: serverTimestamp(),
        ipAddress: ipAddress
      };

      // Send data to Firebase
      const contactFormsRef = collection(db, 'contactForms');
      await addDoc(contactFormsRef, contactData);

      toast({
        title: "تم إرسال الرسالة بنجاح",
        description: "سنقوم بالرد عليك في أقرب وقت ممكن",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Update rate limit status
      await checkRateLimit();
    } catch (error) {
      console.error("Error submitting form: ", error);
      let errorMessage = "يرجى المحاولة مرة أخرى";
      
      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          errorMessage = "حدث خطأ في الصلاحيات. يرجى المحاولة مرة أخرى";
        } else if (error.message.includes('invalid-argument')) {
          errorMessage = "البيانات المدخلة غير صحيحة";
        }
      }
      
      toast({
        title: "خطأ في إرسال الرسالة",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-background dark:bg-gray-900">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-saudi dark:text-saudi-light">اتصل بنا</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-saudi-light dark:border-border">
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            يسعدنا تواصلكم واستقبال استفساراتكم واقتراحاتكم. يرجى ملء النموذج أدناه وسنقوم بالرد عليكم في أقرب وقت ممكن.
          </p>
          
          {isRateLimited && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950 dark:border-red-700">
              <p className="text-red-600 dark:text-red-300">
                تم تجاوز الحد المسموح من الرسائل. يرجى المحاولة مرة أخرى بعد ساعة.
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                الاسم
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-saudi-light dark:border-border"
                disabled={isSubmitting || isRateLimited}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-saudi-light dark:border-border"
                disabled={isSubmitting || isRateLimited}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                الموضوع
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="border-saudi-light dark:border-border"
                disabled={isSubmitting || isRateLimited}
                placeholder="أدخل موضوع الرسالة"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                الرسالة
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="min-h-[150px] border-saudi-light dark:border-border"
                disabled={isSubmitting || isRateLimited}
                placeholder="اكتب رسالتك هنا..."
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-saudi hover:bg-saudi-dark w-full dark:bg-saudi-light dark:hover:bg-saudi-light/90 dark:text-saudi"
              disabled={isSubmitting || isRateLimited}
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
