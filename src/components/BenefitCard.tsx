import React from 'react';
import { BookOpen, MessageSquare, Tag } from 'lucide-react';

interface BenefitCardProps {
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  bookName,
  volumeAndPage,
  benefitText,
  scholarComment,
  category,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Header with Book Info */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className="p-2 bg-saudi/10 rounded-lg">
          <BookOpen className="w-5 h-5 text-saudi" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{bookName}</h3>
          <p className="text-sm text-gray-600">{volumeAndPage}</p>
        </div>
      </div>

      {/* Category Badge */}
      {category && (
        <div className="mb-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-saudi/10 text-saudi text-sm">
            <Tag className="w-4 h-4" />
            <span>{category}</span>
          </div>
        </div>
      )}

      {/* Benefit Text */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed text-lg">{benefitText}</p>
      </div>

      {/* Scholar Comment */}
      {scholarComment && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-saudi/10 rounded-lg mt-1">
              <MessageSquare className="w-5 h-5 text-saudi" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">تعليق العلماء</h4>
              <p className="text-gray-700 leading-relaxed">{scholarComment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefitCard;
