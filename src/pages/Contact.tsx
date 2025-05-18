
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      // Send data to Firebase
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

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
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى",
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
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-saudi hover:bg-saudi-dark w-full"
              disabled={isSubmitting}
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
