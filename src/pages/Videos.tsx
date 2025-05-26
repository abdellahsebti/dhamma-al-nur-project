import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  date?: any; // Add date field
}

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchVideos();
  }, []);
  
  const fetchVideos = async () => {
    try {
      setLoading(true);
      console.log('Starting to fetch videos...');
      
      const videosRef = collection(db, 'videos');
      console.log('Created videos reference');
      
      // Try to get videos without ordering first
      const querySnapshot = await getDocs(videosRef);
      console.log('Got query snapshot, size:', querySnapshot.size);
      
      const fetchedVideos = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Processing video document:', doc.id, data);
        return {
          id: doc.id,
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          duration: data.duration || '',
          videoUrl: data.videoUrl || '',
          thumbnailUrl: data.thumbnailUrl || '',
          featured: data.featured || false,
          views: data.views || 0,
          youtubeId: data.youtubeId || '',
          date: data.date || data.createdAt || data.uploadDate || new Date()
        };
      });
      
      console.log('Fetched videos:', fetchedVideos);
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب الفيديوهات. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Get unique categories
  const categories = ['all', ...new Set(videos.map(video => video.category))];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-saudi">الفيديوهات</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="w-full md:w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-saudi" />
                  <SelectValue placeholder="اختر التصنيف" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'جميع التصنيفات' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
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
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saudi mx-auto"></div>
            <p className="text-gray-500 mt-4">جاري تحميل الفيديوهات...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد فيديوهات متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
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
            
            {filteredVideos.length === 0 && (
              <div className="text-center py-12 col-span-full">
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
