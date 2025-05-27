import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/VideoCard';
import PodcastCard from '@/components/PodcastCard';
import BenefitCard from '@/components/BenefitCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee, BookOpen, Play, Headphones, Youtube, Linkedin, Instagram, Facebook } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for our data
interface Video {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
  thumbnailUrl: string;
  views: number;
  videoUrl: string;
}

interface Podcast {
  id: string;
  title: string;
  thumbnail: string;
  externalLink: string;
  platform: string;
  listens: number;
  episodeNumber: number;
  season: number;
}

interface Benefit {
  id: string;
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
}

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Function to get random items from an array
  const getRandomItems = <T,>(array: T[], count: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Starting to fetch data...');
        
        // Fetch all videos
        const videosQuery = query(
          collection(db, 'videos')
        );
        const videosSnapshot = await getDocs(videosQuery);
        console.log('Videos snapshot:', videosSnapshot.size, 'documents found');
        const allVideos: Video[] = [];
        videosSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Video data:', data);
          allVideos.push({
            id: doc.id,
            title: data.title,
            youtubeId: data.youtubeId,
            category: data.category,
            thumbnailUrl: data.thumbnailUrl,
            views: data.views || 0,
            videoUrl: data.videoUrl || ''
          });
        });
        console.log('All videos:', allVideos);
        // Get 2 random videos
        const randomVideos = getRandomItems(allVideos, 2);
        console.log('Random videos:', randomVideos);
        setVideos(randomVideos);
        
        // Fetch all podcasts
        const podcastsQuery = query(
          collection(db, 'podcasts')
        );
        const podcastsSnapshot = await getDocs(podcastsQuery);
        console.log('Podcasts snapshot:', podcastsSnapshot.size, 'documents found');
        const allPodcasts: Podcast[] = [];
        podcastsSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Podcast data:', data);
          allPodcasts.push({
            id: doc.id,
            title: data.title,
            thumbnail: data.coverUrl,
            externalLink: data.youtubeUrl || data.spotifyUrl || data.audioUrl || '',
            platform: `الحلقة ${data.episodeNumber || ''} - الموسم ${data.season || ''}`,
            listens: data.listens || 0,
            episodeNumber: data.episodeNumber || 0,
            season: data.season || 0
          });
        });
        console.log('All podcasts:', allPodcasts);
        // Get 2 random podcasts
        const randomPodcasts = getRandomItems(allPodcasts, 2);
        console.log('Random podcasts:', randomPodcasts);
        setPodcasts(randomPodcasts);
        
        // Fetch latest benefits
        const benefitsQuery = query(
          collection(db, 'benefits'),
          limit(10)
        );
        const benefitsSnapshot = await getDocs(benefitsQuery);
        console.log('Benefits snapshot:', benefitsSnapshot.size, 'documents found');
        const benefitsData: Benefit[] = [];
        benefitsSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Benefit data:', data);
          benefitsData.push({
            id: doc.id,
            bookName: data.bookName,
            volumeAndPage: data.volumeAndPage,
            benefitText: data.benefitText,
            scholarComment: data.scholarComment,
            category: data.category
          });
        });
        console.log('Benefits data:', benefitsData);
        // Get 3 random benefits
        const randomBenefits = getRandomItems(benefitsData, 3);
        console.log('Random benefits:', randomBenefits);
        setBenefits(randomBenefits);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Add more detailed error logging
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading ? (
        <motion.div 
          className="flex items-center justify-center min-h-[50vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saudi dark:border-saudi-light"></div>
        </motion.div>
      ) : (
        <>
          {/* Hero Section */}
          <motion.section 
            className="py-16 arabesque-bg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="container mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-saudi dark:text-saudi-light mb-4"
                variants={heroVariants}
              >
                ضَـمَّـة
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
                variants={heroVariants}
              >
                منصة إسلامية تهدف إلى نشر الوعي السلفي والبحث العلمي من خلال
                مقاطع الفيديو والبودكاست والفوائد العلمية
              </motion.p>
              <motion.div 
                className="flex justify-center items-center gap-4 flex-wrap"
                variants={containerVariants}
              >
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button 
                    size="lg" 
                    className="bg-saudi hover:bg-saudi-dark dark:bg-saudi-light dark:hover:bg-saudi-light/90 text-white dark:text-saudi rounded-full px-8 py-3 text-lg"
                    onClick={() => navigate('/videos')}
                  >
                    <Play className="w-5 h-5 ml-2" /> استعراض الفيديوهات
                  </Button>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-saudi text-saudi hover:bg-saudi/10 dark:border-saudi-light dark:text-saudi-light dark:hover:bg-saudi/20 rounded-full px-8 py-3 text-lg"
                    onClick={() => navigate('/al-qawl-al-mufid')}
                  >
                    <BookOpen className="w-5 h-5 ml-2" /> القول المفيد
                  </Button>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-saudi text-saudi hover:bg-saudi/10 dark:border-saudi-light dark:text-saudi-light dark:hover:bg-saudi/20 rounded-full px-8 py-3 text-lg"
                    onClick={() => navigate('/coffee-eyes')}
                  >
                    <Coffee className="w-5 h-5 ml-2" /> عيون القهوة
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div 
                className="flex justify-center gap-6 mt-8"
                variants={containerVariants}
              >
                <motion.a 
                  href="https://www.facebook.com/Dhamma.al.Nur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-saudi dark:text-gray-600 dark:hover:text-saudi-light transition-colors"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Facebook size={30} />
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/dhamma.al.nur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-saudi dark:text-gray-600 dark:hover:text-saudi-light transition-colors"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Instagram size={30} />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/company/dhamma-al-nur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-saudi dark:text-gray-600 dark:hover:text-saudi-light transition-colors"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Linkedin size={30} />
                </motion.a>
                <motion.a 
                  href="https://www.youtube.com/@Dhamma.al.Nur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-saudi dark:text-gray-600 dark:hover:text-saudi-light transition-colors"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Youtube size={30} />
                </motion.a>
              </motion.div>
            </div>
          </motion.section>

          {/* Random Videos Section */}
          <section className="py-16 bg-background dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold text-saudi dark:text-saudi-light flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Play className="w-7 h-7 text-saudi dark:text-saudi-light" /> فيديوهات عشوائية
                </motion.h2>
                <motion.a 
                  href="/videos" 
                  className="flex items-center text-gray-600 hover:text-saudi dark:text-gray-400 dark:hover:text-saudi-light transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  عرض المزيد <ArrowLeft className="w-4 h-4 mr-1" />
                </motion.a>
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {videos.map(video => (
                  <motion.div key={video.id} variants={itemVariants}>
                    <VideoCard 
                      id={video.id}
                      title={video.title}
                      videoUrl={video.videoUrl}
                      category={video.category}
                      views={video.views}
                      thumbnail={video.thumbnailUrl}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Random Podcasts Section */}
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold text-saudi dark:text-saudi-light flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Headphones className="w-7 h-7 text-saudi dark:text-saudi-light" /> بودكاست عشوائي
                </motion.h2>
                <motion.a 
                  href="/podcasts" 
                  className="flex items-center text-gray-600 hover:text-saudi dark:text-gray-400 dark:hover:text-saudi-light transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  عرض المزيد <ArrowLeft className="w-4 h-4 mr-1" />
                </motion.a>
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {podcasts.map(podcast => (
                  <motion.div key={podcast.id} variants={itemVariants}>
                    <PodcastCard 
                      id={podcast.id}
                      title={podcast.title}
                      thumbnail={podcast.thumbnail}
                      externalLink={podcast.externalLink}
                      platform={podcast.platform}
                      listens={podcast.listens}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Latest Benefits Section */}
          <section className="py-16 bg-background dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold text-saudi dark:text-saudi-light flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <BookOpen className="w-7 h-7 text-saudi dark:text-saudi-light" /> آخر الفوائد العلمية
                </motion.h2>
                <motion.a 
                  href="/benefits" 
                  className="flex items-center text-gray-600 hover:text-saudi dark:text-gray-400 dark:hover:text-saudi-light transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  عرض المزيد <ArrowLeft className="w-4 h-4 mr-1" />
                </motion.a>
              </div>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {benefits.map(benefit => (
                  <motion.div key={benefit.id} variants={itemVariants}>
                    <BenefitCard 
                      id={benefit.id}
                      bookName={benefit.bookName}
                      volumeAndPage={benefit.volumeAndPage}
                      benefitText={benefit.benefitText}
                      scholarComment={benefit.scholarComment}
                      category={benefit.category}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 text-center">
              <motion.h2 
                className="text-3xl font-bold text-saudi dark:text-saudi-light mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                عن المشروع
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                ضَـمَّـة هي منصة إسلامية علمية تسعى لنشر العلم الشرعي
                 المبني على منهج أهل السنة والجماعة بفهم السلف الصالح، مع التركيز على
                 الفوائد المنتقاة من الكتب المعتمدة والشروح الموثوقة للعلماء الراسخين.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-saudi text-saudi hover:bg-saudi/10 dark:border-saudi-light dark:text-saudi-light dark:hover:bg-saudi/20 rounded-full px-8 py-3 text-lg"
                  onClick={() => navigate('/about')}
                >
                  اقرأ المزيد عنا
                </Button>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
};

export default Index;