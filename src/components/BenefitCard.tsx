
import React from 'react';

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
    <div className="benefit-card">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-saudi">📘</span>
            <span className="font-bold">اسم الكتاب:</span>
            <span>{bookName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-saudi">📕</span>
            <span className="font-bold">المجلد والصفحة:</span>
            <span>{volumeAndPage}</span>
          </div>
        </div>
        
        {category && (
          <div className="flex justify-start">
            <div className="category-badge">{category}</div>
          </div>
        )}
        
        <div className="mt-2">
          <div className="flex items-start gap-2">
            <span className="text-saudi mt-1">✏️</span>
            <div>
              <div className="font-bold mb-1">نص الفائدة:</div>
              <p className="text-gray-800 leading-relaxed">{benefitText}</p>
            </div>
          </div>
        </div>
        
        {scholarComment && (
          <div className="mt-2">
            <div className="flex items-start gap-2">
              <span className="text-saudi mt-1">🗣️</span>
              <div>
                <div className="font-bold mb-1">تعليق العلماء:</div>
                <p className="text-gray-700 leading-relaxed">{scholarComment}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitCard;
