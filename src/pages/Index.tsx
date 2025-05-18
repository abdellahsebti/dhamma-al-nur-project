
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/VideoCard';
import PodcastCard from '@/components/PodcastCard';
import BenefitCard from '@/components/BenefitCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Define types for our data
interface Video {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
}

interface Podcast {
  id: string;
  title: string;
  thumbnail: string;
  externalLink: string;
  platform: string;
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
  
  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch videos
        const videosQuery = query(
          collection(db, 'videos'),
          orderBy('createdAt', 'desc'),
          limit(2)
        );
        const videosSnapshot = await getDocs(videosQuery);
        const videosData: Video[] = [];
        videosSnapshot.forEach((doc) => {
          const data = doc.data();
          videosData.push({
            id: doc.id,
            title: data.title,
            youtubeId: data.youtubeId,
            category: data.category
          });
        });
        setVideos(videosData);
        
        // Fetch podcasts
        const podcastsQuery = query(
          collection(db, 'podcasts'),
          orderBy('createdAt', 'desc'),
          limit(2)
        );
        const podcastsSnapshot = await getDocs(podcastsQuery);
        const podcastsData: Podcast[] = [];
        podcastsSnapshot.forEach((doc) => {
          const data = doc.data();
          podcastsData.push({
            id: doc.id,
            title: data.title,
            thumbnail: data.thumbnail,
            externalLink: data.externalLink,
            platform: data.platform
          });
        });
        setPodcasts(podcastsData);
        
        // Fetch benefits
        const benefitsQuery = query(
          collection(db, 'benefits'),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const benefitsSnapshot = await getDocs(benefitsQuery);
        const benefitsData: Benefit[] = [];
        benefitsSnapshot.forEach((doc) => {
          const data = doc.data();
          benefitsData.push({
            id: doc.id,
            bookName: data.bookName,
            volumeAndPage: data.volumeAndPage,
            benefitText: data.benefitText,
            scholarComment: data.scholarComment,
            category: data.category
          });
        });
        setBenefits(benefitsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Sample data as fallback if Firebase returns empty
  const sampleVideos = [
    {
      id: '1',
      title: 'شرح أصول السنة للإمام أحمد - الدرس الأول',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'العقيدة',
    },
    {
      id: '2',
      title: 'تفسير سورة الفاتحة',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'التفسير',
    },
  ];
  
  const samplePodcasts = [
    {
      id: '1',
      title: 'أهمية طلب العلم',
      thumbnail: 'https://via.placeholder.com/400x300',
      externalLink: 'https://example.com',
      platform: 'سبوتيفاي',
    },
    {
      id: '2',
      title: 'منهج السلف في التعامل مع النوازل',
      thumbnail: 'https://via.placeholder.com/400x300',
      externalLink: 'https://example.com',
      platform: 'ساوند كلاود',
    },
  ];
  
  const sampleBenefits = [
    {
      id: '1',
      bookName: 'البداية والنهاية - لابن كثير',
      volumeAndPage: 'المجلد 9، صفحة 357',
      benefitText: 'قال ابن كثير: "وكان عمر بن عبد العزيز من خيار خلفاء بني أمية، وكان عادلًا في رعيته، متبعًا للسنة، مجتهدًا في العبادة."',
      scholarComment: 'قال الإمام الذهبي: "كان عمر بن عبد العزيز إمامًا عادلًا، مقتديًا بالخلفاء الراشدين، في زهده وورعه وعدله."',
      category: 'التاريخ الإسلامي',
    },
  ];

  // Use fetched data or sample data if not available
  const displayVideos = videos.length > 0 ? videos : sampleVideos;
  const displayPodcasts = podcasts.length > 0 ? podcasts : samplePodcasts;
  const displayBenefits = benefits.length > 0 ? benefits : sampleBenefits;

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
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-saudi">أحدث الفيديوهات</h2>
            <Button 
              variant="ghost" 
              className="text-saudi hover:bg-saudi-light flex items-center gap-2"
              onClick={() => navigate('/videos')}
            >
              عرض المزيد
              <ArrowLeft size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayVideos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                youtubeId={video.youtubeId}
                category={video.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Podcasts */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-saudi">أحدث البودكاست</h2>
            <Button 
              variant="ghost" 
              className="text-saudi hover:bg-saudi-light flex items-center gap-2"
              onClick={() => navigate('/podcasts')}
            >
              عرض المزيد
              <ArrowLeft size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayPodcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                title={podcast.title}
                thumbnail={podcast.thumbnail}
                externalLink={podcast.externalLink}
                platform={podcast.platform}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Benefits */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-saudi">من القول المفيد</h2>
            <Button 
              variant="ghost" 
              className="text-saudi hover:bg-saudi-light flex items-center gap-2"
              onClick={() => navigate('/al-qawl-al-mufid')}
            >
              عرض المزيد
              <ArrowLeft size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {displayBenefits.map((benefit) => (
              <BenefitCard
                key={benefit.id}
                bookName={benefit.bookName}
                volumeAndPage={benefit.volumeAndPage}
                benefitText={benefit.benefitText}
                scholarComment={benefit.scholarComment}
                category={benefit.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Eyes Section */}
      <section className="py-16" style={{ backgroundColor: "#F5F1EB" }}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "#6F4E37" }}>عيون القهوة</h2>
            <Button 
              variant="ghost" 
              style={{ color: "#6F4E37" }}
              className="hover:bg-[#6F4E37]/10 flex items-center gap-2"
              onClick={() => navigate('/coffee-eyes')}
            >
              عرض المزيد
              <ArrowLeft size={16} />
            </Button>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md border border-[#D2B48C]/30 relative overflow-hidden">
            <div className="absolute inset-0 arabesque-bg opacity-5"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-8">
              <Coffee className="w-16 h-16 text-[#6F4E37] mb-6" />
              <h3 className="text-2xl font-bold text-[#6F4E37] mb-2">الروايات والقصص</h3>
              <p className="text-lg mb-6 max-w-2xl text-[#6F4E37]/80">
                استمتع بمجموعة مختارة من الروايات والقصص الممتعة والهادفة، مع تصميم مميز للقراءة
              </p>
              <Button
                className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white"
                onClick={() => navigate('/coffee-eyes')}
              >
                استكشاف عيون القهوة
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
