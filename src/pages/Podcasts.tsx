import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Headphones } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
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
      const q = query(podcastsRef, orderBy('title'));
      const querySnapshot = await getDocs(q);
      const fetchedPodcasts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Raw podcast data from Firestore:', data);
        return {
          id: doc.id,
          ...data
        };
      }) as Podcast[];
      console.log('Processed podcasts:', fetchedPodcasts);
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
  
  const filteredPodcasts = podcasts.filter((podcast) => 
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    podcast.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="ابحث في البودكاست..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                <Headphones className="mx-auto h-12 w-12 text-gray-400 mb-4" />
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
