import React, { useState, useEffect } from 'react';
import { Instagram, Mail, Twitter, Youtube, Book, PenTool, Users, MessageSquare, Coffee, Facebook, Linkedin } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Coffee bean SVG component
const CoffeeBean: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

// Steam SVG component
const Steam: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

const CoffeeEyes: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set launch date to August 31st, 2025 at 12:00 PM
  const launchDate = new Date('2025-08-31T12:00:00+03:00'); // Adding timezone offset for Algeria

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();


    // Cleanup
    return () => clearInterval(timer);
  }, []);

  // Format number to always show two digits
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const coffeeSteamVariants: Variants = {
    initial: { opacity: 0, y: 0 },
    animate: {
      opacity: [0, 1, 0],
      y: [-10, -30, -50],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  // Background animation variants
  const backgroundVariants: Variants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 30,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  const floatingCoffeeVariants: Variants = {
    initial: { 
      y: -100, 
      opacity: 0, 
      rotate: 0,
      scale: 0.8
    },
    animate: {
      y: ['0%', '100%'],
      opacity: [0, 0.15, 0],
      rotate: [0, 360],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 12,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  const steamVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: 0, 
      scale: 0.8,
      x: 0
    },
    animate: {
      opacity: [0, 0.1, 0],
      y: [-20, -80],
      scale: [0.8, 1.5, 0.8],
      x: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#4A2C2A]/5 via-[#8B4513]/10 to-[#4A2C2A]/5"
        animate="animate"
        variants={backgroundVariants}
      >
        {/* Floating Coffee Icons */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`coffee-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingCoffeeVariants}
            initial="initial"
            animate="animate"
            transition={{ 
              delay: i * 0.3,
              duration: 12 + Math.random() * 6
            }}
          >
            <Coffee className="w-10 h-10 text-[#4A2C2A]/15 drop-shadow-lg" />
          </motion.div>
        ))}

        {/* Floating Steam Effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`steam-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={steamVariants}
            initial="initial"
            animate="animate"
            transition={{ 
              delay: i * 0.2,
              duration: 6 + Math.random() * 3
            }}
          >
            <div className="w-6 h-16 bg-gradient-to-t from-[#4A2C2A]/10 to-transparent rounded-full blur-md" />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Coffee Cup Animation and Header */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
              variants={itemVariants}
            >
              <motion.div 
                className="relative w-16 h-16 sm:w-24 sm:h-24"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              >
                <Coffee className="w-16 h-16 sm:w-24 sm:h-24 text-[#4A2C2A] drop-shadow-lg" />
                {/* Steam Animation */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2"
                  variants={coffeeSteamVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className="w-2 h-8 sm:w-3 sm:h-12 bg-[#4A2C2A]/30 rounded-full blur-sm" />
                </motion.div>
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -ml-3 sm:-ml-4"
                  variants={coffeeSteamVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-2 h-8 sm:w-3 sm:h-12 bg-[#4A2C2A]/30 rounded-full blur-sm" />
                </motion.div>
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 ml-3 sm:ml-4"
                  variants={coffeeSteamVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-2 h-8 sm:w-3 sm:h-12 bg-[#4A2C2A]/30 rounded-full blur-sm" />
                </motion.div>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-6xl font-bold text-[#4A2C2A] drop-shadow-sm"
                variants={itemVariants}
              >
                عيون القهوة
              </motion.h1>
            </motion.div>

            <motion.div 
              className="bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl border border-[#8B4513]/20 relative overflow-hidden backdrop-blur-sm"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-[url('/coffee-pattern.png')] opacity-5"></div>
              <div className="relative z-10">
                <motion.h2 
                  className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-[#4A2C2A]"
                  variants={itemVariants}
                >
                  قريباً
                </motion.h2>
                <motion.p 
                  className="text-[#8B4513] text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed"
                  variants={itemVariants}
                >
                  نحن نعمل حالياً على تطوير هذه الصفحة. سنعود قريباً بمحتوى جديد ومميز.
                </motion.p>

                {/* Countdown Timer */}
                <motion.div 
                  className="mb-12 sm:mb-16"
                  variants={itemVariants}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-[#4A2C2A]">موعد الإطلاق</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
                    {[
                      { value: timeLeft.days, label: 'أيام' },
                      { value: formatNumber(timeLeft.hours), label: 'ساعات' },
                      { value: formatNumber(timeLeft.minutes), label: 'دقائق' },
                      { value: formatNumber(timeLeft.seconds), label: 'ثواني' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-b from-[#4A2C2A]/10 to-[#4A2C2A]/5 rounded-xl sm:rounded-2xl p-3 sm:p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl sm:text-4xl font-bold text-[#4A2C2A] mb-1 sm:mb-2">{item.value}</div>
                        <div className="text-xs sm:text-sm font-medium text-[#8B4513]">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Progress Indicator */}
                <motion.div 
                  className="mb-12 sm:mb-16"
                  variants={itemVariants}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-[#4A2C2A]">تقدم العمل</h3>
                  <div className="w-full bg-[#4A2C2A]/20 rounded-full h-3 sm:h-4 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-[#4A2C2A] to-[#8B4513] h-3 sm:h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#8B4513] mt-2 sm:mt-3">75% مكتمل</p>
                </motion.div>

                {/* Coming Features Preview */}
                <motion.div 
                  className="mb-12 sm:mb-16"
                  variants={itemVariants}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-[#4A2C2A]">ماذا سيأتي؟</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 text-right">
                    {[
                      { icon: Book, title: 'قصص وروايات', desc: 'مجموعة من القصص والروايات المميزة' },
                      { icon: PenTool, title: 'مقالات أدبية', desc: 'مقالات في الأدب والثقافة' },
                      { icon: Users, title: 'حوارات أدبية', desc: 'حوارات مع أدباء ومثقفين' },
                      { icon: MessageSquare, title: 'شعر ونثر', desc: 'إبداعات شعرية ونثرية' }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="p-4 sm:p-8 bg-gradient-to-br from-[#4A2C2A]/5 to-[#4A2C2A]/10 rounded-xl sm:rounded-2xl flex items-start gap-4 sm:gap-6 hover:from-[#4A2C2A]/10 hover:to-[#4A2C2A]/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A2C2A] flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-[#4A2C2A] mb-2 sm:mb-3 text-lg sm:text-xl">{feature.title}</h4>
                          <p className="text-sm sm:text-base text-[#8B4513] leading-relaxed">{feature.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div 
                  className="mt-12 sm:mt-16 p-4 sm:p-8 bg-gradient-to-br from-[#4A2C2A]/10 to-[#4A2C2A]/5 border border-[#8B4513]/20 rounded-xl sm:rounded-2xl shadow-lg"
                  variants={itemVariants}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-[#4A2C2A]">للتواصل</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-base sm:text-lg text-[#8B4513]">
                      البريد الإلكتروني: <a href="mailto:dhamma.productionss@gmail.com" className="text-[#4A2C2A] hover:underline font-medium">dhamma.productionss@gmail.com</a>
                    </p>
                    <p className="text-base sm:text-lg text-[#8B4513]">
                      انستغرام: <a href="https://www.instagram.com/dhamma.productions/" target="_blank" rel="noopener noreferrer" className="text-[#4A2C2A] hover:underline font-medium">@dhamma.productions</a>
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-6 sm:gap-8">
                    {[
                      { icon: Instagram, href: 'https://www.instagram.com/dhamma.productions/', label: 'Instagram' },
                      { icon: Facebook, href: 'https://www.facebook.com/dhamma.productions', label: 'Facebook' },
                      { icon: Twitter, href: 'https://twitter.com/dhamma_prod', label: 'Twitter' },
                      { icon: Youtube, href: 'https://www.youtube.com/@dhamma.productions', label: 'YouTube' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/company/dhamma-productions', label: 'LinkedIn' }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4A2C2A] hover:text-[#8B4513] transition-all duration-300 group p-2"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.label}
                      >
                        <social.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                        <span className="sr-only">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeEyes;
