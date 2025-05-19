import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div
      className="relative cursor-pointer text-muted-foreground hover:text-foreground transition-colors group"
      onClick={() => navigate(to)}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-saudi transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </div>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الفيديوهات', path: '/videos' },
    { name: 'البودكاست', path: '/podcasts' },
    { name: 'القول المفيد', path: '/al-qawl-al-mufid' },
    { name: 'عن المشروع', path: '/about' },
    { name: 'تواصل معنا', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm' : 'bg-background'
    } border-b border-border`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
          <div 
            className="font-bold text-xl cursor-pointer text-saudi" 
            onClick={() => navigate('/')}
          >
            ضمة
          </div>
        </div>
        
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            className="hidden md:flex"
            onClick={() => navigate('/admin')}
          >
            لوحة التحكم
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 p-4 pt-0 bg-background border-b border-border">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="cursor-pointer py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              className="mt-2"
              onClick={() => {
                navigate('/admin');
                setIsMenuOpen(false);
              }}
            >
              لوحة التحكم
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
