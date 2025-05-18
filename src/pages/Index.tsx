
import React from 'react';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/VideoCard';
import PodcastCard from '@/components/PodcastCard';
import BenefitCard from '@/components/BenefitCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample data (would come from Firebase in real implementation)
  const featuredVideos = [
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
  
  const featuredPodcasts = [
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
  
  const featuredBenefits = [
    {
      id: '1',
      bookName: 'البداية والنهاية - لابن كثير',
      volumeAndPage: 'المجلد 9، صفحة 357',
      benefitText: 'قال ابن كثير: "وكان عمر بن عبد العزيز من خيار خلفاء بني أمية، وكان عادلًا في رعيته، متبعًا للسنة، مجتهدًا في العبادة."',
      scholarComment: 'قال الإمام الذهبي: "كان عمر بن عبد العزيز إمامًا عادلًا، مقتديًا بالخلفاء الراشدين، في زهده وورعه وعدله."',
      category: 'التاريخ الإسلامي',
    },
  ];

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
            {featuredVideos.map((video) => (
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
            {featuredPodcasts.map((podcast) => (
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
            {featuredBenefits.map((benefit) => (
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
    </div>
  );
};

export default Index;
