import React, { useState } from 'react';
import { Play, Eye, Tag, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoCardProps {
  id: string;
  title: string;
  videoUrl: string;
  category: string;
  views: number;
  thumbnail: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  id, 
  title, 
  videoUrl, 
  category, 
  views, 
  thumbnail 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleView = async () => {
    setIsOpen(true);
    try {
      const videoRef = doc(db, 'videos', id);
      await updateDoc(videoRef, {
        views: increment(1)
      });
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(videoUrl);
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0` : videoUrl;

  return (
    <>
      <Card className="group cursor-pointer hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/20 transition-all duration-300" onClick={handleView}>
        <CardContent className="p-0">
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={thumbnail} 
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-saudi hover:bg-saudi-dark dark:bg-saudi-light dark:hover:bg-saudi-light/90 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Play size={24} className="text-white dark:text-saudi" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{title}</h3>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-saudi/10 dark:bg-saudi/20 text-saudi dark:text-saudi-light text-sm">
                <Tag className="w-4 h-4" />
                <span>{category}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{views.toLocaleString()} مشاهدة</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-background">
          <DialogHeader className="p-4 border-b border-border">
            <DialogTitle className="text-foreground">{title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoCard;
