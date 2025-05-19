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
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Check rate limit on component mount
  useEffect(() => {
    checkRateLimit();
  }, []);

  // Update countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeRemaining]);

  const checkRateLimit = async () => {
    try {
      console.log('Checking rate limit...');
      const contactFormsRef = collection(db, 'contactForms');
      const oneHourAgo = Timestamp.fromMillis(Date.now() - 3600000);
      
      const q = query(
        contactFormsRef,
        where('createdAt', '>', oneHourAgo)
      );
      
      const querySnapshot = await getDocs(q);
      console.log('Recent submissions:', querySnapshot.size);
      
      if (querySnapshot.size >= 3) {
        const oldestSubmission = querySnapshot.docs
          .sort((a, b) => a.data().createdAt.seconds - b.data().createdAt.seconds)[0];
        const timeRemaining = oldestSubmission.data().createdAt.seconds + 3600 - Math.floor(Date.now() / 1000);
        setIsRateLimited(true);
        setTimeRemaining(timeRemaining);
        return true;
      }
      
      setIsRateLimited(false);
      setTimeRemaining(0);
      return false;
    } catch (error) {
      console.error('Error checking rate limit:', error);
      // If there's an error checking rate limit, allow the submission
      // but log the error for monitoring
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRateLimited) {
      toast({
        title: "تم تجاوز الحد المسموح",
        description: `يرجى الانتظار ${Math.ceil(timeRemaining / 60)} دقيقة قبل المحاولة مرة أخرى`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check rate limit before submitting
      const isLimited = await checkRateLimit();
      
      if (isLimited) {
        toast({
          title: "تم تجاوز الحد المسموح",
          description: `يرجى الانتظار ${Math.ceil(timeRemaining / 60)} دقيقة قبل المحاولة مرة أخرى`,
          variant: "destructive",
        });
        return;
      }

      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "خطأ في البريد الإلكتروني",
          description: "يرجى إدخال بريد إلكتروني صحيح",
          variant: "destructive",
        });
        return;
      }

      // Send data to Firebase
      const contactFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        subject: "New Contact Form Submission",
        status: 'new',
        createdAt: serverTimestamp(),
      };

      console.log('Submitting contact form:', contactFormData);
      await addDoc(collection(db, "contactForms"), contactFormData);

      toast({
        title: "تم الإرسال بنجاح",
        description: "سنتواصل معكم قريباً إن شاء الله",
      });

      setFormData({
        name: '',
        email: '',
        message: '',
      });
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
        title: "حدث خطأ",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-saudi">تواصل معنا</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
          <p className="mb-6 text-lg">
            يسعدنا تواصلكم واستقبال استفساراتكم واقتراحاتكم. يرجى ملء النموذج أدناه وسنقوم بالرد عليكم في أقرب وقت ممكن.
          </p>
          
          {isRateLimited && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">
                تم تجاوز الحد المسموح من الرسائل. يرجى الانتظار {Math.ceil(timeRemaining / 60)} دقيقة قبل المحاولة مرة أخرى.
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                الاسم
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-saudi-light"
                disabled={isRateLimited}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-saudi-light"
                disabled={isRateLimited}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                الرسالة
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="min-h-[150px] border-saudi-light"
                disabled={isRateLimited}
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-saudi hover:bg-saudi-dark w-full"
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
