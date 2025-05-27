import React, { useState, useEffect } from 'react';
import BenefitCard from '@/components/BenefitCard';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Benefit {
  id: string;
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AlQawlAlMufid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchBenefits();
  }, []);
  
  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const benefitsRef = collection(db, 'benefits');
      const q = query(benefitsRef, orderBy('bookName'));
      const querySnapshot = await getDocs(q);
      const fetchedBenefits = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Benefit[];
      setBenefits(fetchedBenefits);
    } catch (error) {
      console.error("Error fetching benefits:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب الفوائد",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(benefits.map(benefit => benefit.category))];
  
  const filteredBenefits = benefits.filter((benefit) => {
    const matchesSearch = 
      benefit.bookName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      benefit.benefitText.toLowerCase().includes(searchTerm.toLowerCase()) || 
      benefit.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || benefit.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      className="min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-saudi"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          القول المفيد
        </motion.h1>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {/* Category Filter */}
          <motion.div 
            className="w-full md:w-64"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-saudi" />
                  <SelectValue placeholder="اختر التصنيف" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'جميع التصنيفات' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Search Input */}
          <motion.div 
            className="flex-1 relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <Input
              className="pl-3 pr-10"
              placeholder="ابحث في الفوائد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </motion.div>
        
        {loading ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-gray-500">جاري تحميل الفوائد...</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="wait">
              {filteredBenefits.map((benefit) => (
                <motion.div
                  key={benefit.id}
                  variants={fadeInUp}
                  layout
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <BenefitCard
                    id={benefit.id}
                    bookName={benefit.bookName}
                    volumeAndPage={benefit.volumeAndPage}
                    benefitText={benefit.benefitText}
                    scholarComment={benefit.scholarComment}
                    category={benefit.category}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredBenefits.length === 0 && (
              <motion.div 
                className="text-center py-12 col-span-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-gray-500">لا توجد فوائد مطابقة للبحث</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AlQawlAlMufid;
