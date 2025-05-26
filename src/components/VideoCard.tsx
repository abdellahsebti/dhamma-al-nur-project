import React from 'react';
<<<<<<< HEAD
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';
=======
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Eye } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
>>>>>>> parent of cea0485 (enhanced design)

interface VideoCardProps {
  id: string;
  title: string;
  category: string;
  views: number;
  thumbnail: string;
  videoUrl: string;
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
      // Update view count through the API
      await api.videos.update(id, { views: views + 1 });
    } catch (error) {
      // Silently handle the error - we still want to open the video
      console.error('Error updating view count:', error);
    }
    
    // Navigate directly to the video URL
    window.location.href = videoUrl;
  };

  return (
<<<<<<< HEAD
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
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{category}</span>
            <span>{views} مشاهدة</span>
          </div>
        </div>
=======
    <Card className="overflow-hidden border-saudi-light">
      <div className="relative pb-[56.25%] h-0">
        <img
          className="absolute top-0 right-0 w-full h-full object-cover"
          src={thumbnail}
          alt={title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Button
            onClick={handleView}
            className="bg-saudi hover:bg-saudi-dark rounded-full p-4"
          >
            <Play size={24} className="text-white" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          {category && (
            <div className="category-badge">{category}</div>
          )}
          <div className="flex items-center gap-1 text-gray-500">
            <Eye size={16} />
            <span>{views} مشاهدة</span>
          </div>
        </div>
>>>>>>> parent of cea0485 (enhanced design)
      </CardContent>
    </Card>
  );
};

export default VideoCard;
