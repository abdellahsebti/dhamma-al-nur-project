import React from 'react';
import { Headphones, Play, Tag } from 'lucide-react';
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
      if (!externalLink) {
        console.error('No external link provided');
        return;
      }

      let url = externalLink;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const podcastRef = doc(db, 'podcasts', id);
      await updateDoc(podcastRef, {
        listens: increment(1)
      });
      
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error in handleListen:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Thumbnail with Play Button */}
      <div className="relative aspect-[3/2] group">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleListen}
            className="bg-saudi hover:bg-saudi-dark rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            <Play size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
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
    </div>
  );
};

export default PodcastCard;
