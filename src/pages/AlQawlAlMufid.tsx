
import React, { useState, useEffect } from 'react';
import BenefitCard from '@/components/BenefitCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getBenefits, Benefit } from '@/services/benefitsService';
import { useToast } from '@/hooks/use-toast';

const AlQawlAlMufid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchBenefits();
  }, []);
  
  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const data = await getBenefits();
      setBenefits(data);
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
  
  const filteredBenefits = benefits.filter((benefit) => 
    benefit.bookName.includes(searchTerm) || 
    benefit.benefitText.includes(searchTerm) || 
    benefit.category.includes(searchTerm)
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-saudi">القول المفيد</h1>
        
        <div className="mb-8 relative">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <Input
            className="pl-3 pr-10"
            placeholder="ابحث في الفوائد..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">جاري تحميل الفوائد...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredBenefits.map((benefit) => (
              <BenefitCard
                key={benefit.id}
                bookName={benefit.bookName}
                volumeAndPage={benefit.volumeAndPage}
                benefitText={benefit.benefitText}
                scholarComment={benefit.scholarComment}
                category={benefit.category}
              />
            ))}
            
            {filteredBenefits.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">لا توجد فوائد مطابقة للبحث</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlQawlAlMufid;
