import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones, Play } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

interface PodcastCardProps {
  id: string;
  title: string;
  thumbnail: string;
  externalLink: string;
  platform?: string;
  listens: number;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  id,
  title,
  thumbnail,
  externalLink,
  platform = 'استماع',
  listens
}) => {
  const handleListen = async () => {
    try {
      // Update listen count in Firestore
      const podcastRef = doc(db, 'podcasts', id);
      await updateDoc(podcastRef, {
        listens: increment(1)
      });
      
      // Open podcast in new tab
      window.open(externalLink, '_blank');
    } catch (error) {
      console.error('Error updating listen count:', error);
    }
  };

  return (
    <Card className="overflow-hidden border-saudi-light">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Button
            onClick={handleListen}
            className="bg-saudi hover:bg-saudi-dark rounded-full p-4"
          >
            <Play size={24} className="text-white" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-500">
            <Headphones size={16} />
            <span>{listens} استماع</span>
          </div>
          <Button 
            onClick={handleListen}
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
