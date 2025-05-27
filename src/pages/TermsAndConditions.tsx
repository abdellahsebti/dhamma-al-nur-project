import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-saudi">الشروط والأحكام</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-md border border-saudi-light arabesque-bg">
          <h2 className="text-2xl font-bold mb-6 text-saudi">شروط استخدام المنصة</h2>
          
          <div className="space-y-6 text-lg">
            <p>
              باستخدامكم لمنصة ضمة، فإنكم توافقون على الالتزام بهذه الشروط والأحكام وفقاً للمنهج السلفي وقوانين الجمهورية الجزائرية. إذا لم توافقوا على هذه الشروط، يرجى عدم استخدام المنصة.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">المبادئ الأساسية</h3>
            
            <ul className="list-disc list-inside space-y-3 mr-6">
              <li>الالتزام التام بالمنهج السلفي في العقيدة والفقه والأخلاق</li>
              <li>اتباع نهج السلف الصالح في فهم النصوص الشرعية</li>
              <li>الالتزام بقوانين الجمهورية الجزائرية في جميع التعاملات</li>
              <li>احترام العلماء الربانيين وعدم الطعن فيهم</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">استخدام المنصة</h3>
            
            <ul className="list-disc list-inside space-y-3 mr-6">
              <li>يجب أن تكونوا فوق 18 عاماً أو بموافقة ولي الأمر</li>
              <li>يجب تقديم معلومات دقيقة وصحيحة وفقاً للقانون الجزائري</li>
              <li>يجب الحفاظ على سرية حسابكم وكلمة المرور</li>
              <li>يجب استخدام المنصة بشكل قانوني وأخلاقي</li>
              <li>الالتزام بعدم نشر أي محتوى يخالف الشريعة الإسلامية أو القانون الجزائري</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">المحتوى والملكية الفكرية</h3>
            
            <p>
              جميع المحتويات المتاحة على المنصة (بما في ذلك النصوص، الصور، الفيديوهات، والبودكاست) هي ملك لمنصة ضمة أو مرخصة لها. لا يجوز نسخ أو توزيع أو تعديل أي من هذه المحتويات دون إذن مسبق، مع مراعاة حقوق الملكية الفكرية وفقاً للقانون الجزائري.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">المسؤولية القانونية</h3>
            
            <p>
              لا تتحمل منصة ضمة المسؤولية عن:
            </p>
            
            <ul className="list-disc list-inside space-y-3 mr-6 mt-4">
              <li>أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام المنصة</li>
              <li>أي محتوى غير دقيق أو غير مكتمل</li>
              <li>أي خسائر أو أضرار ناتجة عن تعطل الخدمة</li>
              <li>أي مخالفات للقانون الجزائري يقوم بها المستخدمون</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">تعديل الشروط</h3>
            
            <p>
              نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت بما يتوافق مع الشريعة الإسلامية والقانون الجزائري. سيتم إخطاركم بأي تغييرات جوهرية من خلال المنصة أو عبر البريد الإلكتروني.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">إنهاء الخدمة</h3>
            
            <p>
              نحتفظ بالحق في تعليق أو إنهاء خدمة أي مستخدم في حالة:
            </p>
            
            <ul className="list-disc list-inside space-y-3 mr-6 mt-4">
              <li>انتهاك هذه الشروط والأحكام</li>
              <li>إساءة استخدام المنصة</li>
              <li>نشاط غير قانوني أو غير أخلاقي</li>
              <li>مخالفة المنهج السلفي أو نشر البدع والضلالات</li>
              <li>مخالفة قوانين الجمهورية الجزائرية</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">القانون المطبق</h3>
            
            <p>
              تخضع هذه الشروط والأحكام لقوانين الجمهورية الجزائرية. أي نزاع ينشأ عن استخدام المنصة سيخضع للاختصاص الحصري لمحاكم الجمهورية الجزائرية.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-saudi">اتصل بنا</h3>
            
            <p>
              إذا كان لديكم أي أسئلة أو استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا من خلال:
            </p>
            
            <ul className="list-disc list-inside space-y-3 mr-6 mt-4">
              <li>البريد الإلكتروني: info@dhamma.com</li>
              <li>صفحة التواصل على المنصة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 