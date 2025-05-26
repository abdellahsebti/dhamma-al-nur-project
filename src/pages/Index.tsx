import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/VideoCard';
import PodcastCard from '@/components/PodcastCard';
import BenefitCard from '@/components/BenefitCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
          limit(1)
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
        setBenefits(benefitsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 arabesque-bg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-saudi">ضمة</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            منصة إسلامية تهدف إلى نشر الوعي السلفي والبحث العلمي من خلال مقاطع الفيديو والبودكاست والفوائد العلمية
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-saudi hover:bg-saudi-dark"
              onClick={() => navigate('/videos')}
            >
              استعراض الفيديوهات
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-saudi text-saudi hover:bg-saudi-light"
              onClick={() => navigate('/al-qawl-al-mufid')}
            >
              القول المفيد
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#6F4E37] text-[#6F4E37] hover:bg-[#6F4E37]/10 flex items-center gap-2"
              onClick={() => navigate('/coffee-eyes')}
            >
              <Coffee size={18} />
              عيون القهوة
            </Button>
          </div>
<<<<<<< HEAD

          {/* Social Media Links */}
          <div className="flex justify-center items-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transform hover:scale-110 transition-all duration-300 group"
            >
              <Youtube className="w-6 h-6 text-saudi group-hover:text-saudi-dark transition-colors duration-300" />
              <span className="sr-only">YouTube</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transform hover:scale-110 transition-all duration-300 group"
            >
              <Linkedin className="w-6 h-6 text-saudi group-hover:text-saudi-dark transition-colors duration-300" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/dhamma.productions/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transform hover:scale-110 transition-all duration-300 group"
            >
              <Instagram className="w-6 h-6 text-saudi group-hover:text-saudi-dark transition-colors duration-300" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transform hover:scale-110 transition-all duration-300 group"
            >
              <Facebook className="w-6 h-6 text-saudi group-hover:text-saudi-dark transition-colors duration-300" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
=======
>>>>>>> parent of cea0485 (enhanced design)
        </div>
      </section>

      {/* Random Videos Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-saudi">فيديوهات عشوائية</h2>
            <Button
              variant="ghost"
              className="text-saudi hover:text-saudi-dark flex items-center gap-2"
              onClick={() => navigate('/videos')}
            >
              عرض المزيد
              <ArrowLeft size={16} />
            </Button>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">جاري تحميل الفيديوهات...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  videoUrl={video.videoUrl}
                  category={video.category}
                  views={video.views}
                  thumbnail={video.thumbnailUrl}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Random Podcasts Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-saudi">بودكاست عشوائي</h2>
            <Button
              variant="ghost"
              className="text-saudi hover:text-saudi-dark flex items-center gap-2"
              onClick={() => navigate('/podcasts')}
            >
              عرض المزيد
              <ArrowLeft size={16} />
            </Button>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">جاري تحميل البودكاست...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  thumbnail={podcast.thumbnail}
                  externalLink={podcast.externalLink}
                  platform={podcast.platform}
                  listens={podcast.listens}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Benefit Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-saudi">القول المفيد</h2>
            <Button
              variant="ghost"
              className="text-saudi hover:text-saudi-dark flex items-center gap-2"
              onClick={() => navigate('/al-qawl-al-mufid')}
            >
              عرض المزيد
              <ArrowLeft size={16} />
            </Button>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">جاري تحميل الفوائد...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {benefits.map((benefit) => (
                <BenefitCard
                  key={benefit.id}
                  id={benefit.id}
                  bookName={benefit.bookName}
                  volumeAndPage={benefit.volumeAndPage}
                  benefitText={benefit.benefitText}
                  scholarComment={benefit.scholarComment}
                  category={benefit.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;