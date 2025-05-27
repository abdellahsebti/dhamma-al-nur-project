import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div
      className="relative cursor-pointer text-muted-foreground hover:text-foreground transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-saudi/5 dark:hover:bg-saudi/10"
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
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 dark:bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 dark:supports-[backdrop-filter]:bg-background/60 shadow-lg border-b border-border/40' 
          : 'bg-background/50 dark:bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/30 dark:supports-[backdrop-filter]:bg-background/40'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-saudi/10 dark:hover:bg-saudi/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="text-saudi dark:text-saudi-light" /> : <Menu className="text-saudi dark:text-saudi-light" />}
          </Button>
          <div 
            className="font-bold text-2xl cursor-pointer text-saudi dark:text-saudi-light hover:text-saudi/80 dark:hover:text-saudi-light/80 transition-colors duration-300" 
            onClick={() => navigate('/')}
          >
            ضَـمَّـة
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.name}
            </NavLink>
          ))}
          <Button
            onClick={() => navigate('/join')}
            className="bg-saudi hover:bg-saudi-dark text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 group dark:bg-saudi-light dark:hover:bg-saudi-light/90 dark:text-saudi"
          >
            <UserPlus className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            <span>انضم إلينا</span>
          </Button>
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 p-4 pt-0 bg-background/95 dark:bg-background/98 backdrop-blur-md border-b border-border/40">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="cursor-pointer py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-saudi/5 dark:hover:bg-saudi/10 rounded-lg transition-all duration-300"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}
            <Button
              onClick={() => {
                navigate('/join');
                setIsMenuOpen(false);
              }}
              className="bg-saudi hover:bg-saudi-dark text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 group mt-2 dark:bg-saudi-light dark:hover:bg-saudi-light/90 dark:text-saudi"
            >
              <UserPlus className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>انضم إلينا</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
