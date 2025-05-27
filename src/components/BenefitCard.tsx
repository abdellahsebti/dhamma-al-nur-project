import React, { useState } from 'react';
import { BookOpen, MessageSquare, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

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
  const [isExpanded, setIsExpanded] = useState(false);

  // Get preview text (first 150 characters)
  const previewText = benefitText.length > 150 
    ? benefitText.substring(0, 150) + '...'
    : benefitText;

  return (
    <motion.div 
      className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/50 p-4 hover:border-saudi/20 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with Book Info */}
      <motion.div 
        className="flex items-center gap-2 mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="p-1.5 bg-saudi/10 dark:bg-saudi/20 rounded-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <BookOpen className="w-4 h-4 text-saudi dark:text-saudi-light" />
        </motion.div>
        <div>
          <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{bookName}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{volumeAndPage}</p>
        </div>
      </motion.div>

      {/* Category Badge */}
      {category && (
        <motion.div 
          className="mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.div 
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-saudi/5 text-saudi text-xs dark:bg-saudi/10 dark:text-saudi-light"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Tag className="w-3 h-3" />
            <span>{category}</span>
          </motion.div>
        </motion.div>
      )}

      {/* Benefit Text */}
      <motion.div 
        className="mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.p 
            key={isExpanded ? 'expanded' : 'preview'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm"
          >
            {isExpanded ? benefitText : previewText}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Scholar Comment */}
      <AnimatePresence>
        {isExpanded && scholarComment && (
          <motion.div 
            className="mt-3 pt-3 border-t border-gray-100/50 dark:border-gray-800/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-2">
              <motion.div 
                className="p-1.5 bg-saudi/10 dark:bg-saudi/20 rounded-lg mt-0.5"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-4 h-4 text-saudi dark:text-saudi-light" />
              </motion.div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-0.5">تعليق العلماء</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{scholarComment}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Read More Button */}
      <motion.div 
        className="mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Button 
          variant="ghost" 
          className="w-full text-saudi dark:text-saudi-light hover:bg-saudi/10 dark:hover:bg-saudi/20"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="flex items-center gap-2">
            {isExpanded ? (
              <>
                <span>عرض أقل</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>اقرأ المزيد</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default BenefitCard;
