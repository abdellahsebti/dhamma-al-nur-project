import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { useToast } from '@/hooks/use-toast';
import Benefits from '@/components/admin/Benefits';
import CoffeeStories from '@/components/admin/CoffeeStories';
import Videos from '@/components/admin/Videos';

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await checkAndAddAdminStatus(user); // ✅ Make secure check
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkAndAddAdminStatus = async (user: User) => {
    try {
      const idToken = await user.getIdToken(); // 🔐 Get ID token
      const adminDoc = await fetch(`/api/admin/${user.uid}`, {
        headers: {
          Authorization: `Bearer ${idToken}`, // ✅ Attach token here
        },
      });

      if (!adminDoc.ok) {
        await signOut(auth);
        toast({
          title: 'غير مصرح',
          description: 'ليس لديك صلاحية للوصول إلى لوحة التحكم',
          variant: 'destructive',
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء التحقق من الصلاحيات',
        variant: 'destructive',
      });
    }
  };

  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const sessionResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session cookie');
      }

      toast({
        title: 'تم تسجيل الدخول',
        description: 'تم تسجيل الدخول بنجاح',
      });
    } catch (error: any) {
      console.error('Error logging in:', error);
      let errorMessage = 'فشل تسجيل الدخول';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'لم يتم العثور على مستخدم بهذا البريد الإلكتروني';
          break;
        case 'auth/wrong-password':
          errorMessage = 'كلمة المرور غير صحيحة';
          break;
        case 'auth/invalid-email':
          errorMessage = 'البريد الإلكتروني غير صالح';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'محاولات كثيرة جداً. يرجى المحاولة لاحقاً';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      toast({
        title: 'خطأ',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFirebaseLogout = async () => {
    try {
      await signOut(auth);
      await fetch('/api/auth/logout', { method: 'POST' });
      toast({
        title: 'تم تسجيل الخروج',
        description: 'تم تسجيل الخروج بنجاح',
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: 'خطأ',
        description: 'فشل تسجيل الخروج',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-saudi"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-background rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
            <p className="text-muted-foreground">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
          </div>
          <form onSubmit={handleFirebaseLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              تسجيل الدخول
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <Button variant="outline" onClick={handleFirebaseLogout}>
          تسجيل الخروج
        </Button>
      </div>

      <Tabs defaultValue="benefits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="benefits">الفوائد العلمية</TabsTrigger>
          <TabsTrigger value="coffee">قصص القهوة</TabsTrigger>
          <TabsTrigger value="videos">الفيديوهات</TabsTrigger>
          <TabsTrigger value="podcasts">البودكاست</TabsTrigger>
          <TabsTrigger value="contact">رسائل التواصل</TabsTrigger>
        </TabsList>

        <TabsContent value="benefits">
          <Benefits />
        </TabsContent>

        <TabsContent value="coffee">
          <CoffeeStories />
        </TabsContent>

        <TabsContent value="videos">
          <Videos />
        </TabsContent>

        <TabsContent value="podcasts">
          {/* Podcasts component will be added here */}
        </TabsContent>

        <TabsContent value="contact">
          {/* Contact component will be added here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
