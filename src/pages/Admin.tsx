
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  // In a real implementation, this would check Firebase Auth status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  // Mock login function (would use Firebase Auth in real implementation)
  const handleLogin = () => {
    // Simulate successful login
    setIsAuthenticated(true);
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
            
            <Button 
              className="bg-saudi hover:bg-saudi-dark w-full"
              onClick={handleLogin}
            >
              تسجيل الدخول
            </Button>
            
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
            <h2 className="text-2xl font-bold mb-6 text-saudi">إدارة القول المفيد</h2>
            <p className="text-gray-500">يمكنك هنا إضافة وتعديل وحذف الفوائد العلمية</p>
            {/* Benefits management interface would go here */}
          </TabsContent>
          
          <TabsContent value="contact" className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light">
            <h2 className="text-2xl font-bold mb-6 text-saudi">الرسائل الواردة</h2>
            <p className="text-gray-500">عرض الرسائل المرسلة من نموذج التواصل</p>
            {/* Contact messages interface would go here */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
