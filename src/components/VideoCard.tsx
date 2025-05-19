import React from 'react';
import { Play, Eye, Tag } from 'lucide-react';
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Thumbnail with Play Button */}
      <div className="relative pb-[56.25%] h-0 group">
        <img
          className="absolute top-0 right-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={thumbnail}
          alt={title}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleView}
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
          {category && (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-saudi/10 text-saudi text-sm">
              <Tag className="w-4 h-4" />
              <span>{category}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-600">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{views.toLocaleString()} مشاهدة</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
