
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-saudi">عن المشروع</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light arabesque-bg">
          <h2 className="text-2xl font-bold mb-6 text-saudi">ضمة - الأثر الدائم</h2>
          
          <div className="space-y-6 text-lg">
            <p>
              مشروع "ضمة" هو مبادرة علمية تهدف إلى نشر الوعي الإسلامي السلفي والبحث العلمي الرصين من خلال مجموعة متنوعة من الوسائط التعليمية.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">المنهجية</h3>
            
            <p>
              يعتمد المشروع على منهجية علمية رصينة تقوم على:
            </p>
            
            <ul className="list-disc list-inside space-y-3 mr-6">
              <li>الالتزام بمنهج أهل السنة والجماعة في جميع المحتويات المقدمة.</li>
              <li>الاعتماد على المصادر الأصيلة والموثوقة في النقل والاستدلال.</li>
              <li>التبسيط والتيسير في العرض مع الحفاظ على الدقة العلمية.</li>
              <li>التنويع في وسائل العرض لمراعاة اختلاف المستفيدين.</li>
              <li>المحافظة على الأدب الإسلامي والاحترام في طرح الآراء والمناقشات.</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">محتويات المشروع</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-saudi-dark">الفيديوهات التعليمية</h4>
                <p>سلسلة من المقاطع المرئية التي تغطي مختلف الموضوعات الشرعية والعلمية.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-saudi-dark">البودكاست</h4>
                <p>محتوى صوتي يمكن الاستماع إليه في أوقات مختلفة، يتناول موضوعات متنوعة بطريقة سهلة وميسرة.</p>
              </div>
              
              <div>
                <h4 className="font-bold text-saudi-dark">القول المفيد</h4>
                <p>مجموعة من الفوائد العلمية المقتبسة من كتب العلماء، منظمة بطريقة تسهل الاستفادة منها.</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">الرؤية والرسالة</h3>
            
            <p>
              نسعى أن يكون مشروع "ضمة" مرجعًا موثوقًا للباحثين عن المعرفة الشرعية الصحيحة، وأن يسهم في نشر العلم النافع وتيسيره للجميع، محققًا بذلك معنى الضمة - الأثر الدائم - في بناء الوعي الإسلامي الصحيح.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
