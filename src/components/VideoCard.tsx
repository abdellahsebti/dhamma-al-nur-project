import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Eye } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

interface VideoCardProps {
  id: string;
  title: string;
  youtubeId: string;
  category?: string;
  views: number;
  thumbnail: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, title, youtubeId, category, views, thumbnail }) => {
  const handleView = async () => {
    try {
      // Update view count in Firestore
      const videoRef = doc(db, 'videos', id);
      await updateDoc(videoRef, {
        views: increment(1)
      });
      
      // Open video in new tab
      window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  return (
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
      </CardContent>
    </Card>
  );
};

export default VideoCard;
