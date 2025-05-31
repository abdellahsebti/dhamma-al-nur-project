
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, UserPlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div
      className="relative cursor-pointer text-muted-foreground hover:text-foreground transition-all duration-300 group px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-saudi/5 hover:to-saudi/10 dark:hover:from-saudi/10 dark:hover:to-saudi/20"
      onClick={() => navigate(to)}
    >
      <span className="relative z-10 font-medium transition-all duration-300 group-hover:scale-105">
        {children}
      </span>
      
      {/* Active indicator */}
      <span
        className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-saudi to-saudi-dark rounded-full transition-all duration-300 ${
          isActive ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-80'
        }`}
      />
      
      {/* Glow effect */}
      <span
        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-saudi/20 to-saudi-dark/20 opacity-0 transition-all duration-300 ${
          isActive ? 'opacity-30' : 'group-hover:opacity-20'
        } blur-sm`}
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
    { name: 'عيون القهوة', path: '/coffee-eyes' },
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
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/85 dark:bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/70 shadow-2xl border-b border-border/60' 
          : 'bg-background/70 dark:bg-background/75 backdrop-blur-lg supports-[backdrop-filter]:bg-background/40 dark:supports-[backdrop-filter]:bg-background/50 shadow-lg'
      }`}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-saudi/5 via-transparent to-saudi-light/5 opacity-50" />
      
      <div className="container mx-auto px-4 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-saudi/15 dark:hover:bg-saudi/25 rounded-xl transition-all duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="text-saudi dark:text-saudi-light transition-transform duration-300 rotate-180" />
            ) : (
              <Menu className="text-saudi dark:text-saudi-light transition-transform duration-300" />
            )}
          </Button>
          
          {/* Enhanced logo */}
          <div 
            className="font-bold text-3xl cursor-pointer text-saudi dark:text-saudi-light hover:text-saudi/80 dark:hover:text-saudi-light/80 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group" 
            onClick={() => navigate('/')}
          >
            <span className="relative">
              ضَـمَّـة
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-saudi-light opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-1 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-2 border border-white/30 dark:border-white/10">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/join')}
            className="bg-gradient-to-r from-saudi to-saudi-dark hover:from-saudi-dark hover:to-saudi text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 group dark:from-saudi-light dark:to-saudi dark:hover:from-saudi dark:hover:to-saudi-light dark:text-saudi font-semibold relative overflow-hidden"
          >
            {/* Button glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
            <span className="relative z-10">انضم إلينا</span>
          </Button>
          
          <div className="p-1 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 right-0 left-0 p-6 bg-background/95 dark:bg-background/98 backdrop-blur-2xl border-b border-border/60 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-saudi/5 to-transparent" />
          
          <nav className="flex flex-col gap-3 relative z-10">
            {navItems.map((item, index) => (
              <div
                key={item.path}
                className="cursor-pointer py-4 px-6 text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-saudi/10 hover:to-saudi-light/10 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-saudi/20"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeIn 0.3s ease-out forwards'
                }}
              >
                <span className="font-medium">{item.name}</span>
              </div>
            ))}
            
            <Button
              onClick={() => {
                navigate('/join');
                setIsMenuOpen(false);
              }}
              className="bg-gradient-to-r from-saudi to-saudi-dark hover:from-saudi-dark hover:to-saudi text-white px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 group mt-4 dark:from-saudi-light dark:to-saudi dark:hover:from-saudi dark:hover:to-saudi-light dark:text-saudi font-semibold"
            >
              <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>انضم إلينا</span>
            </Button>
          </nav>
        </div>
      )}
      
      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saudi/30 to-transparent" />
    </header>
  );
};

export default Header;
