
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones } from 'lucide-react';

interface PodcastCardProps {
  title: string;
  thumbnail: string;
  externalLink: string;
  platform?: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  title,
  thumbnail,
  externalLink,
  platform = 'استماع',
}) => {
  return (
    <Card className="overflow-hidden border-saudi-light">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex justify-end mt-4">
          <Button 
            onClick={() => window.open(externalLink, '_blank')}
            className="bg-saudi hover:bg-saudi-dark flex items-center gap-2"
          >
            <Headphones size={16} />
            <span>{platform}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastCard;
