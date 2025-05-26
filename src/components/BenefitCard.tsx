import React from 'react';
import { BookOpen, MessageSquare, Tag } from 'lucide-react';

interface BenefitCardProps {
  id: string;
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  id,
  bookName,
  volumeAndPage,
  benefitText,
  scholarComment,
  category,
}) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/50 p-4 hover:border-saudi/20 hover:bg-white/80">
      {/* Header with Book Info */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-saudi/10 rounded-lg">
          <BookOpen className="w-4 h-4 text-saudi" />
        </div>
        <div>
          <h3 className="font-bold text-base text-gray-900">{bookName}</h3>
          <p className="text-xs text-gray-500">{volumeAndPage}</p>
        </div>
      </div>

      {/* Category Badge */}
      {category && (
        <div className="mb-3">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-saudi/5 text-saudi text-xs">
            <Tag className="w-3 h-3" />
            <span>{category}</span>
          </div>
        </div>
      )}

      {/* Benefit Text */}
      <div className="mb-3">
        <p className="text-gray-700 leading-relaxed text-sm line-clamp-3">{benefitText}</p>
      </div>

      {/* Scholar Comment */}
      {scholarComment && (
        <div className="mt-3 pt-3 border-t border-gray-100/50">
          <div className="flex items-start gap-2">
            <div className="p-1.5 bg-saudi/10 rounded-lg mt-0.5">
              <MessageSquare className="w-4 h-4 text-saudi" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm mb-0.5">تعليق العلماء</h4>
              <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">{scholarComment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefitCard;
