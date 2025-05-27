import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface JoinFormData {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  message: string;
  agreedToTerms: boolean;
}

const Join: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<JoinFormData>({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    message: '',
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Check rate limit on component mount
  useEffect(() => {
    checkRateLimit();
  }, []);

  const checkRateLimit = async () => {
    try {
      const joinApplicationsRef = collection(db, 'joinRequests');
      const oneHourAgo = Timestamp.fromMillis(Date.now() - 3600000);

      // Get IP address first
      let ipAddress = 'unknown';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      } catch (error) {
        console.error('Error fetching IP:', error);
      }

      // Check both IP and email based submissions
      const q = query(
        joinApplicationsRef,
        where('createdAt', '>', oneHourAgo),
        where('ipAddress', '==', ipAddress)
      );

      const querySnapshot = await getDocs(q);
      setIsRateLimited(querySnapshot.size >= 1); // Reduced to 1 submission per hour
    } catch (error) {
      console.error('Error checking rate limit:', error);
      setIsRateLimited(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Don't trim while typing to allow spaces
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreedToTerms: checked
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.specialization || !formData.message) {
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

    // Validate phone (International format)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يرجى إدخال رقم هاتف صحيح (مثال: +1234567890)",
        variant: "destructive",
      });
      return false;
    }

    // Validate specialization (3-100 characters)
    if (formData.specialization.length < 3 || formData.specialization.length > 100) {
      toast({
        title: "خطأ في التخصص",
        description: "يجب أن يكون التخصص بين 3 و 100 حرف",
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

    if (!formData.agreedToTerms) {
      toast({
        title: "خطأ في الموافقة",
        description: "يجب الموافقة على الشروط والأحكام",
        variant: "destructive",
      });
      return false;
    }

    // Additional spam prevention checks
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'prize', 'free', 'click here'];
    const messageLower = formData.message.toLowerCase();
    const nameLower = formData.name.toLowerCase();
    const emailLower = formData.email.toLowerCase();

    // Check for spam keywords in message
    if (spamKeywords.some(keyword => messageLower.includes(keyword))) {
      toast({
        title: "خطأ في المحتوى",
        description: "يحتوي المحتوى على كلمات غير مسموح بها",
        variant: "destructive",
      });
      return false;
    }

    // Check for suspicious patterns in name
    if (nameLower.includes('http') || nameLower.includes('www') || nameLower.includes('.com')) {
      toast({
        title: "خطأ في الاسم",
        description: "الاسم يحتوي على روابط غير مسموح بها",
        variant: "destructive",
      });
      return false;
    }

    // Check for disposable email domains
    const disposableDomains = ['tempmail.com', 'throwawaymail.com', 'mailinator.com'];
    const emailDomain = emailLower.split('@')[1];
    if (disposableDomains.includes(emailDomain)) {
      toast({
        title: "خطأ في البريد الإلكتروني",
        description: "لا يمكن استخدام بريد إلكتروني مؤقت",
        variant: "destructive",
      });
      return false;
    }

    // Check for repeated characters (common in spam)
    const repeatedChars = /(.)\1{4,}/;
    if (repeatedChars.test(nameLower) || repeatedChars.test(messageLower)) {
      toast({
        title: "خطأ في المحتوى",
        description: "يحتوي المحتوى على تكرار غير طبيعي",
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
        description: "يمكنك تقديم طلب واحد فقط كل ساعة",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Starting form submission...');

      // Check rate limit before submitting
      await checkRateLimit();
      console.log('Rate limit check completed');

      if (isRateLimited) {
        toast({
          title: "تم تجاوز الحد المسموح",
          description: "يمكنك تقديم طلب واحد فقط كل ساعة",
          variant: "destructive",
        });
        return;
      }

      // Get IP address using a public API with fallback
      let ipAddress = 'unknown';
      try {
        console.log('Fetching IP address...');
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
        console.log('IP address fetched:', ipAddress);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }

      // Clean and format the data
      const cleanedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim().replace(/\s+/g, ''),
        specialization: formData.specialization.trim(),
        message: formData.message.trim(),
        status: 'pending',
        createdAt: serverTimestamp(),
        ipAddress: ipAddress,
        agreedToTerms: true,
        updatedAt: serverTimestamp()
      };

      console.log('Prepared data:', cleanedData);

      // Send data to Firebase
      console.log('Attempting to save to Firestore...');
      const joinApplicationsRef = collection(db, 'joinRequests');

      try {
        // Log each validation step
        console.log('Validating data...');

        // Check required fields
        const requiredFields = ['name', 'email', 'phone', 'specialization', 'message', 'status', 'createdAt', 'ipAddress', 'agreedToTerms', 'updatedAt'];
        const missingFields = requiredFields.filter(field => !(field in cleanedData));
        if (missingFields.length > 0) {
          console.error('Missing required fields:', missingFields);
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Validate name
        if (cleanedData.name.length < 2 || cleanedData.name.length > 50) {
          console.error('Invalid name length:', cleanedData.name.length);
          throw new Error('Invalid name length');
        }

        // Validate email
        if (!cleanedData.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
          console.error('Invalid email format:', cleanedData.email);
          throw new Error('Invalid email format');
        }

        // Validate phone
        if (!cleanedData.phone.match(/^[+]?[0-9]{8,15}$/)) {
          console.error('Invalid phone format:', cleanedData.phone);
          throw new Error('Invalid phone format');
        }

        // Validate specialization
        if (cleanedData.specialization.length < 2 || cleanedData.specialization.length > 100) {
          console.error('Invalid specialization length:', cleanedData.specialization.length);
          throw new Error('Invalid specialization length');
        }

        // Validate message
        if (cleanedData.message.length < 10 || cleanedData.message.length > 1000) {
          console.error('Invalid message length:', cleanedData.message.length);
          throw new Error('Invalid message length');
        }

        // Validate status
        if (cleanedData.status !== 'pending') {
          console.error('Invalid status:', cleanedData.status);
          throw new Error('Invalid status');
        }

        // Validate agreedToTerms
        if (cleanedData.agreedToTerms !== true) {
          console.error('Terms not agreed to');
          throw new Error('Terms must be agreed to');
        }

        console.log('All validations passed, attempting to save...');
        const docRef = await addDoc(joinApplicationsRef, cleanedData);
        console.log('Document created with ID:', docRef.id);

        if (!docRef.id) {
          throw new Error('Failed to create document - no ID returned');
        }

        toast({
          title: "تم تقديم الطلب بنجاح",
          description: "سنقوم بمراجعة طلبك والرد عليك في أقرب وقت ممكن",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          specialization: '',
          message: '',
          agreedToTerms: false,
        });

        // Update rate limit status
        await checkRateLimit();
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        throw new Error(`Firestore error: ${firestoreError.message}`);
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      let errorMessage = "يرجى المحاولة مرة أخرى";

      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack
        });

        if (error.message.includes('permission-denied')) {
          errorMessage = "حدث خطأ في الصلاحيات. يرجى المحاولة مرة أخرى";
        } else if (error.message.includes('invalid-argument')) {
          errorMessage = "البيانات المدخلة غير صحيحة";
        } else if (error.message.includes('Failed to create document')) {
          errorMessage = "حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى";
        } else if (error.message.includes('Firestore error')) {
          errorMessage = "حدث خطأ في قاعدة البيانات. يرجى المحاولة مرة أخرى";
        }
      }

      toast({
        title: "خطأ في تقديم الطلب",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-saudi-light/5 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-saudi text-center">انضم إلينا</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Rules and Conditions */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light relative overflow-hidden">
              <div className="absolute inset-0 arabesque-bg opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-saudi">القوانين التنظيمية</h2>
                <p className="text-gray-600 mb-6">يرجى قراءة الشروط والأحكام بعناية قبل التقديم</p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="basic-principles" className="border-b border-saudi-light">
                    <AccordionTrigger className="hover:text-saudi">الباب الأول: المبادئ الأساسية للمشروع</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pr-6 space-y-2 text-gray-700">
                        <li>يُشترط الالتزام التام بالمنهج السلفي في جميع ما يُطرح داخل المشروع.</li>
                        <li>يجب أن يتم العمل بروح الأخوة والنية الصالحة والالتزام الجماعي.</li>
                        <li>التواصل داخل مجموعات العمل يجب أن يكون بلغة راقية بعيدًا عن المزاح المفرط أو اللهجة العامية السوقية.</li>
                        <li>الالتزام بآداب الإسلام في التعامل والحديث والسلوك.</li>
                        <li>احترام آراء الآخرين وعدم التعصب للرأي.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="content-rules" className="border-b border-saudi-light">
                    <AccordionTrigger className="hover:text-saudi">الباب الثاني: القواعد الخاصة بالمحتوى والنشر</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pr-6 space-y-2 text-gray-700">
                        <li>يُمنع إخراج أي محتوى أو نقاش داخلي من مجموعات المشروع إلى الخارج.</li>
                        <li>يُمنع نشر أي محتوى دون مراجعته شرعيًا وعلميًا.</li>
                        <li>يُمنع نشر أي مادة على المنصات الرسمية إلا بإذن مسبق من المشرف العام.</li>
                        <li>يُمنع نشر الآراء الشخصية داخل محتوى المشروع إلا إذا كانت موثقة وموافَق عليها.</li>
                        <li>يُقبل حذف أو تعديل المحتوى المنشور بشكل دوري من قبل المشرفين.</li>
                        <li>الالتزام بمعايير الجودة في إنتاج المحتوى.</li>
                        <li>احترام حقوق الملكية الفكرية في جميع المواد المنشورة.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="management" className="border-b border-saudi-light">
                    <AccordionTrigger className="hover:text-saudi">الباب الثالث: التنظيم الإداري والإشراف</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pr-6 space-y-2 text-gray-700">
                        <li>يُمنع فتح مجموعات أو قنوات جديدة باسم المشروع دون إذن صريح من الإدارة.</li>
                        <li>يُمنع التحدث باسم المشروع أو تمثيله دون تكليف رسمي من الإدارة.</li>
                        <li>يتم تقييم الأعضاء دوريًا لضمان جودة الأداء واستمرار الاستحقاق في البقاء ضمن الفريق.</li>
                        <li>في حال حدوث خلافات أو مشاكل بين الأعضاء، يتم اللجوء إلى رئيس المشروع للفصل فيها، ويكون قراره نهائيًا.</li>
                        <li>الالتزام بالهيكل التنظيمي للمشروع واحترام التسلسل الإداري.</li>
                        <li>ضرورة إبلاغ الإدارة عن أي تغييرات في البيانات الشخصية أو ظروف العمل.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="confidentiality" className="border-b border-saudi-light">
                    <AccordionTrigger className="hover:text-saudi">الباب الرابع: السرية والأخلاقيات</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pr-6 space-y-2 text-gray-700">
                        <li>يجب الحفاظ على سرية هوية الأعضاء وعدم ذكر الأسماء خارج نطاق المشروع.</li>
                        <li>يُمنع استخدام أدوات أو برامج مقرصنة ضمن أنشطة المشروع.</li>
                        <li>يجب الحفاظ على سرية الملفات والتعامل معها بحذر واحترافية.</li>
                        <li>يُمنع فرض الآراء أو التعامل بفوقية داخل الفريق، كما يُمنع كل شكل من أشكال التعصب أو التهميش.</li>
                        <li>الالتزام بسرية المعلومات والبيانات المتعلقة بالمشروع.</li>
                        <li>حماية خصوصية المستخدمين والمتابعين.</li>
                        <li>الامتناع عن نشر أي معلومات شخصية لأي عضو في المشروع.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="time-management" className="border-b border-saudi-light">
                    <AccordionTrigger className="hover:text-saudi">الباب الخامس: التنظيم الزمني والمهام</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pr-6 space-y-2 text-gray-700">
                        <li>الالتزام بالمواعيد المحددة لإنجاز المهام وعدم التأخر دون عذر مقبول.</li>
                        <li>يُمنع النقاش في المسائل الخلافية أو السياسية داخل مجموعات المشروع.</li>
                        <li>يُمنع للعضو الانضمام لمشروع مشابه دون إعلام الإدارة وأخذ الإذن.</li>
                        <li>ضرورة إبلاغ الإدارة عن أي تأخير في إنجاز المهام الموكلة.</li>
                        <li>الالتزام بجدول العمل المحدد لكل عضو.</li>
                        <li>احترام مواعيد الاجتماعات واللقاءات.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="project-name" className="border-b border-saudi-light">
                    <AccordionTrigger className="hover:text-saudi">الباب السادس: استخدام اسم المشروع</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pr-6 space-y-2 text-gray-700">
                        <li>يُمنع استخدام اسم المشروع في أي نشاط خارجي دون موافقة مسبقة من الإدارة.</li>
                        <li>يُمنع استخدام اسم المشروع في أي منصات أو فعاليات دون إذن مسبق.</li>
                        <li>حماية العلامة التجارية للمشروع وشعاره.</li>
                        <li>الالتزام بالهوية البصرية للمشروع في جميع المواد المنشورة.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="discipline" className="border-b-0">
                    <AccordionTrigger className="hover:text-saudi">الباب السابع: العقوبات والجزاءات</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pr-6 space-y-2 text-gray-700">
                        <li>تطبيق نظام تحذيري متدرج للمخالفات.</li>
                        <li>حق الإدارة في فصل أي عضو يخالف القوانين التنظيمية.</li>
                        <li>إمكانية إيقاف العضو مؤقتاً عن العمل في حال المخالفات المتكررة.</li>
                        <li>حق الإدارة في اتخاذ الإجراءات القانونية في حالات المخالفات الجسيمة.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light relative overflow-hidden">
              <div className="absolute inset-0 arabesque-bg opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-saudi">نموذج التقديم</h2>
                <p className="text-gray-600 mb-6">يرجى ملء النموذج التالي للتقديم على الانضمام للمشروع</p>

                <div className="mb-6 p-4 bg-saudi-light/10 border border-saudi-light rounded-lg">
                  <p className="text-saudi-dark">
                    للتواصل المباشر: <br />
                    البريد الإلكتروني: <a href="mailto:dhamma.productionss@gmail.com" className="text-saudi hover:underline">dhamma.productionss@gmail.com</a><br />
                    انستغرام: <a href="https://www.instagram.com/dhamma.productions/" target="_blank" rel="noopener noreferrer" className="text-saudi hover:underline">@dhamma.productions</a>
                  </p>
                </div>

                {isRateLimited && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">
                      تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة مرة أخرى بعد ساعة.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="أدخل اسمك الكامل"
                      className="border-saudi-light focus:border-saudi"
                      disabled={isSubmitting || isRateLimited}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="أدخل بريدك الإلكتروني"
                      className="border-saudi-light focus:border-saudi"
                      disabled={isSubmitting || isRateLimited}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="أدخل رقم هاتفك"
                      className="border-saudi-light focus:border-saudi"
                      disabled={isSubmitting || isRateLimited}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization" className="text-gray-700">التخصص</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      placeholder="أدخل تخصصك"
                      className="border-saudi-light focus:border-saudi"
                      disabled={isSubmitting || isRateLimited}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700">رسالة التقديم</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="اكتب رسالة توضح سبب رغبتك في الانضمام للمشروع"
                      className="min-h-[120px] border-saudi-light focus:border-saudi"
                      disabled={isSubmitting || isRateLimited}
                    />
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse p-4 border border-saudi-light/50 rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={handleCheckboxChange}
                      className="border-saudi-light data-[state=checked]:bg-saudi data-[state=checked]:border-saudi"
                      disabled={isSubmitting || isRateLimited}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-700">
                      أوافق على جميع الشروط والأحكام المذكورة أعلاه
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-saudi hover:bg-saudi-dark text-white font-medium py-2.5"
                    disabled={isSubmitting || isRateLimited}
                  >
                    {isSubmitting ? 'جاري التقديم...' : 'تقديم الطلب'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
