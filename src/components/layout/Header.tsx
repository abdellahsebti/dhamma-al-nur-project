
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الفيديوهات', path: '/videos' },
    { name: 'البودكاست', path: '/podcasts' },
    { name: 'القول المفيد', path: '/al-qawl-al-mufid' },
    { name: 'عن المشروع', path: '/about' },
    { name: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
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
            <div
              key={item.path}
              className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </div>
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
