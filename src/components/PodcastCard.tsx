import React, { useState } from 'react';
import { Headphones, Play, Tag, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleListen = async () => {
    try {
      if (!externalLink) {
        console.error('No external link provided');
        return;
      }

      // Update listen count in Firestore
      const podcastRef = doc(db, 'podcasts', id);
      await updateDoc(podcastRef, {
        listens: increment(1)
      });
      
      // Open the modal
      setIsOpen(true);
    } catch (error) {
      console.error('Error in handleListen:', error);
    }
  };

  // Extract platform-specific embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('spotify.com')) {
      return url.replace('open.spotify.com', 'open.spotify.com/embed');
    } else if (url.includes('soundcloud.com')) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true`;
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0` : url;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(externalLink);

  return (
    <>
      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300" onClick={handleListen}>
        <CardContent className="p-0">
          <div className="aspect-[3/2] relative overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-saudi hover:bg-saudi-dark rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Play size={24} className="text-white" />
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">{title}</h3>
            
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-saudi/10 text-saudi text-sm">
                <Headphones className="w-4 h-4" />
                <span>{platform}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Headphones className="w-4 h-4" />
                <span className="text-sm">{listens.toLocaleString()} استماع</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[90vw] p-0 bg-black">
          <DialogHeader className="absolute top-2 right-2 z-10">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PodcastCard;
