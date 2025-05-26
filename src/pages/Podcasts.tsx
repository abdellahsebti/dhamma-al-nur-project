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
import PodcastCard from '@/components/PodcastCard';

interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  episodeNumber: number;
  season: number;
  guests?: string[];
  showNotes?: string;
  audioUrl: string;
  coverUrl: string;
  listens: number;
  featured: boolean;
  externalLink: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
}

const Podcasts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchPodcasts();
  }, []);
  
  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const podcastsRef = collection(db, 'podcasts');
      const q = query(podcastsRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPodcasts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Podcast[];
      setPodcasts(fetchedPodcasts);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب البودكاست",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Get unique categories
  const categories = ['all', ...new Set(podcasts.map(podcast => podcast.category))];

  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesSearch = 
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      podcast.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || podcast.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-saudi">البودكاست</h1>
        
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
              placeholder="ابحث في البودكاست..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">جاري تحميل البودكاست...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPodcasts.map((podcast) => {
              console.log('Rendering podcast:', podcast);
              // Get the first available URL, supporting older data structure
              const externalLink = podcast.youtubeUrl || podcast.spotifyUrl || podcast.audioUrl;
              console.log('External link for podcast:', podcast.title, externalLink);
              
              return (
                <PodcastCard
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  thumbnail={podcast.coverUrl}
                  externalLink={externalLink || ''}
                  platform={`الحلقة ${podcast.episodeNumber || ''} - الموسم ${podcast.season || ''}`}
                  listens={podcast.listens || 0}
                />
              );
            })}
            
            {filteredPodcasts.length === 0 && (
              <div className="text-center py-12 col-span-3">
                <p className="text-gray-500">لا توجد حلقات بودكاست مطابقة للبحث</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
