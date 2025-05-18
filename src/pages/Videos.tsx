
import React from 'react';
import VideoCard from '@/components/VideoCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Sample data (would come from Firebase in real implementation)
  const videos = [
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
    {
      id: '3',
      title: 'الأذكار المشروعة بعد الصلاة',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'الفقه',
    },
    {
      id: '4',
      title: 'أحكام الصيام',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'الفقه',
    },
    {
      id: '5',
      title: 'قصة موسى عليه السلام',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'القصص',
    },
    {
      id: '6',
      title: 'سلسلة الأخلاق - الصبر',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'الأخلاق',
    },
  ];
  
  const filteredVideos = videos.filter((video) => 
    video.title.includes(searchTerm) || 
    video.category.includes(searchTerm)
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-saudi">الفيديوهات</h1>
        
        <div className="mb-8 relative">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <Input
            className="pl-3 pr-10"
            placeholder="ابحث عن فيديو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              youtubeId={video.youtubeId}
              category={video.category}
            />
          ))}
        </div>
        
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد فيديوهات مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
