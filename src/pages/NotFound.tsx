
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-saudi">404</h1>
        <p className="text-xl mb-8">الصفحة غير موجودة</p>
        <Button 
          className="bg-saudi hover:bg-saudi-dark"
          onClick={() => navigate('/')}
        >
          العودة إلى الصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
