
import React from 'react';
import PodcastCard from '@/components/PodcastCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Podcasts: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Sample data (would come from Firebase in real implementation)
  const podcasts = [
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
    {
      id: '3',
      title: 'سلسلة شرح كتاب التوحيد - الحلقة الأولى',
      thumbnail: 'https://via.placeholder.com/400x300',
      externalLink: 'https://example.com',
      platform: 'أبل بودكاست',
    },
    {
      id: '4',
      title: 'حوار حول أهمية السنة النبوية',
      thumbnail: 'https://via.placeholder.com/400x300',
      externalLink: 'https://example.com',
      platform: 'جوجل بودكاست',
    },
  ];
  
  const filteredPodcasts = podcasts.filter((podcast) => 
    podcast.title.includes(searchTerm) || 
    podcast.platform.includes(searchTerm)
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-saudi">البودكاست</h1>
        
        <div className="mb-8 relative">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <Input
            className="pl-3 pr-10"
            placeholder="ابحث عن بودكاست..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPodcasts.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              title={podcast.title}
              thumbnail={podcast.thumbnail}
              externalLink={podcast.externalLink}
              platform={podcast.platform}
            />
          ))}
        </div>
        
        {filteredPodcasts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد بودكاست مطابق للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
