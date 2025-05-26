import React from 'react';
import { Play, Eye, Tag } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';

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
  category, 
  views, 
  thumbnail,
  videoUrl
}) => {
  const handleView = async () => {
    try {
      // Try to update view count in Firestore
      const videoRef = doc(db, 'videos', id);
      await updateDoc(videoRef, {
        views: increment(1)
      });
    } catch (error) {
      // Silently handle the error - we still want to open the video
      console.error('Error updating view count:', error);
    }
    
    // Navigate directly to the video URL
    window.location.href = videoUrl;
  };

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300" onClick={handleView}>
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-saudi hover:bg-saudi-dark rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-saudi/10 text-saudi text-sm">
              <Tag className="w-4 h-4" />
              <span>{category}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{views.toLocaleString()} مشاهدة</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
