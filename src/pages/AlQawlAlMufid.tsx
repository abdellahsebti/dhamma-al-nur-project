
import React from 'react';
import BenefitCard from '@/components/BenefitCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const AlQawlAlMufid: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Sample data (would come from Firebase in real implementation)
  const benefits = [
    {
      id: '1',
      bookName: 'البداية والنهاية - لابن كثير',
      volumeAndPage: 'المجلد 9، صفحة 357',
      benefitText: 'قال ابن كثير: "وكان عمر بن عبد العزيز من خيار خلفاء بني أمية، وكان عادلًا في رعيته، متبعًا للسنة، مجتهدًا في العبادة."',
      scholarComment: 'قال الإمام الذهبي: "كان عمر بن عبد العزيز إمامًا عادلًا، مقتديًا بالخلفاء الراشدين، في زهده وورعه وعدله."',
      category: 'التاريخ الإسلامي',
    },
    {
      id: '2',
      bookName: 'مجموع الفتاوى - لابن تيمية',
      volumeAndPage: 'المجلد 3، صفحة 125',
      benefitText: 'قال ابن تيمية: "إن الأعمال بالنيات، وإنما لكل امرئ ما نوى، فالتوحيد أصل الدين وأساسه، وهو أول واجب على المكلف."',
      scholarComment: 'قال ابن القيم: "وهذا من أعظم قواعد الإسلام، إذ لا يصح عمل إلا بإخلاص النية لله تعالى."',
      category: 'العقيدة',
    },
    {
      id: '3',
      bookName: 'صحيح البخاري',
      volumeAndPage: 'كتاب العلم، حديث رقم 67',
      benefitText: 'عن معاوية رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: "من يرد الله به خيرا يفقهه في الدين".',
      scholarComment: 'قال ابن حجر: "وفيه فضل التفقه في الدين، وأن التوفيق إليه علامة إرادة الله الخير بالشخص."',
      category: 'العلم',
    },
  ];
  
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
        </div>
        
        {filteredBenefits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد فوائد مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlQawlAlMufid;
