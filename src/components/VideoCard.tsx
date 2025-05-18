
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface VideoCardProps {
  title: string;
  youtubeId: string;
  category?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, youtubeId, category }) => {
  return (
    <Card className="overflow-hidden border-saudi-light">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          className="absolute top-0 right-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?controls=0&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        ></iframe>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        {category && (
          <div className="category-badge">{category}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
