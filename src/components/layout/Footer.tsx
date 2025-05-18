
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-saudi text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ضمة</h3>
            <p className="text-white/80">
              منصة إسلامية تهدف إلى نشر الوعي السلفي والبحث العلمي من خلال مقاطع الفيديو والبودكاست والفوائد العلمية.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  className="cursor-pointer hover:text-white/80 transition-colors"
                  onClick={() => navigate('/')}
                >
                  الرئيسية
                </span>
              </li>
              <li>
                <span 
                  className="cursor-pointer hover:text-white/80 transition-colors"
                  onClick={() => navigate('/videos')}
                >
                  الفيديوهات
                </span>
              </li>
              <li>
                <span 
                  className="cursor-pointer hover:text-white/80 transition-colors"
                  onClick={() => navigate('/podcasts')}
                >
                  البودكاست
                </span>
              </li>
              <li>
                <span 
                  className="cursor-pointer hover:text-white/80 transition-colors"
                  onClick={() => navigate('/al-qawl-al-mufid')}
                >
                  القول المفيد
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-2">
              <div>
                <span 
                  className="cursor-pointer text-white hover:text-white/80 transition-colors"
                  onClick={() => navigate('/contact')}
                >
                  صفحة التواصل
                </span>
              </div>
              <div>
                <span 
                  className="cursor-pointer hover:text-white/80 transition-colors"
                  onClick={() => navigate('/about')}
                >
                  عن المشروع
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
          <p>© {new Date().getFullYear()} ضمة - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
