import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import VideoCard from '@/components/VideoCard';

interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  views: number;
  youtubeId: string;
}

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchVideos();
  }, []);
  
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const videosRef = collection(db, 'videos');
      const q = query(videosRef, orderBy('title'));
      const querySnapshot = await getDocs(q);
      const fetchedVideos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب الفيديوهات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const filteredVideos = videos.filter((video) => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="ابحث في الفيديوهات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">جاري تحميل الفيديوهات...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                youtubeId={video.youtubeId}
                category={video.category}
                views={video.views}
                thumbnail={video.thumbnailUrl}
              />
            ))}
            
            {filteredVideos.length === 0 && (
              <div className="text-center py-12 col-span-3">
                <p className="text-gray-500">لا توجد فيديوهات مطابقة للبحث</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
