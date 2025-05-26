import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gradient-to-b from-saudi to-saudi-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/arabic-pattern.svg')] opacity-15 pointer-events-none"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/15 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="inline-block">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 relative">
                ضمة
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-white/20 rounded-full"></span>
              </h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              منصة إسلامية تهدف إلى نشر الوعي السلفي والبحث العلمي من خلال مقاطع الفيديو والبودكاست والفوائد العلمية.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="https://www.instagram.com/dhamma.productions/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-white/30 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'الرئيسية', path: '/' },
                { name: 'الفيديوهات', path: '/videos' },
                { name: 'البودكاست', path: '/podcasts' },
                { name: 'القول المفيد', path: '/al-qawl-al-mufid' },
                { name: 'انضم إلينا', path: '/join' }
              ].map((item) => (
                <li key={item.path}>
                  <span 
                    className="cursor-pointer text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
                    onClick={() => navigate(item.path)}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-white/30 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse group">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <Mail className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <a href="mailto:dhamma.productionss@gmail.com" className="text-white/80 hover:text-white transition-colors">
                  dhamma.productionss@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse group">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <span className="text-white/80">+213 541 174 197</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse group">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <span className="text-white/80">الجزائر العاصمة، الجزائر</span>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              النشرة البريدية
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-white/30 rounded-full"></span>
            </h3>
            <p className="text-white/80">
              اشترك في نشرتنا البريدية للحصول على آخر المستجدات
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none text-white placeholder-white/50 transition-all duration-300"
              />
              <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300 text-white font-medium relative overflow-hidden group">
                <span className="relative z-10">اشتراك</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} ضمة - جميع الحقوق محفوظة
            </p>
            <div className="flex space-x-6 space-x-reverse text-sm text-white/70">
              <span 
                className="cursor-pointer hover:text-white transition-colors relative group"
                onClick={() => navigate('/privacy-policy')}
              >
                سياسة الخصوصية
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full transition-all duration-300"></span>
              </span>
              <span 
                className="cursor-pointer hover:text-white transition-colors relative group"
                onClick={() => navigate('/terms-and-conditions')}
              >
                الشروط والأحكام
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full transition-all duration-300"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
