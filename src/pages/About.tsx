import React from 'react';
import { Book, Lightbulb, Target, Users, Youtube, ShoppingCart, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-saudi text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          عن المشروع
        </motion.h1>
        
        <motion.div 
          className="bg-white rounded-2xl p-4 sm:p-8 shadow-md border border-saudi-light arabesque-bg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Introduction */}
          <motion.div 
            className="space-y-6 text-base sm:text-lg mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <p className="leading-relaxed">
              مشروع "ضَـمَّـة" هو مبادرة فكرية وإعلامية شاملة، تهدف إلى إحياء الوعي السلفي الأصيل بين فئة الشباب وطلاب الجامعات، وتقديم محتوى علمي ومعرفي رصين في قالب عصري وجذاب، يجمع بين عمق المضمون وسلاسة العرض. ينطلق المشروع من رؤية تجمع بين التأصيل الشرعي والانفتاح على الوسائط الرقمية الحديثة، ليكون منبرًا لإحياء العلم والفكر السلفي، مع دعم مسارات علمية وتقنية تخدم الأمة الإسلامية في حاضرها ومستقبلها.
            </p>
          </motion.div>

          {/* Vision and Mission */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-saudi" />
                <h2 className="text-xl sm:text-2xl font-bold text-saudi">الرؤية</h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed">
                بناء مجتمع شبابي مثقّف وواعي، متصل بجذوره العلمية الأصيلة، وقادر على إنتاج محتوى مؤثر في مجالات الدين، الفكر، والعلوم الحديثة، عبر وسائط رقمية تنافسية وفعّالة.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-saudi" />
                <h2 className="text-xl sm:text-2xl font-bold text-saudi">الرسالة</h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed">
                تقديم محتوى معرفي مؤصّل يعكس منهج السلف الصالح، ويعزّز من الوعي العلمي والتقني لدى الشباب، وذلك عبر إنتاج مواد إعلامية، ومنصات رقمية، وخدمات احترافية تخدم هذه الغاية.
              </p>
            </motion.div>
          </motion.div>

          {/* Main Sections */}
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-saudi mb-6"
              variants={fadeInUp}
            >
              أقسام المشروع الأساسية
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              variants={staggerContainer}
            >
              {/* Section 1 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-6 h-6 text-saudi" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi">الوعي السلفي – تأسيس وبناء</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed">
                  سلسلة مرئية قصيرة تُبَثّ عبر وسائل التواصل تحت عنوان "تأسيس"، تُعنى بوضع اللبنات الأولى في تصحيح المفاهيم الشرعية والفكرية، عبر اختيار دقيق للنصوص (آيات، أحاديث، آثار) وشرحها بلغة واضحة مع مؤثرات بصرية عالية الجودة.
                </p>
              </motion.div>

              {/* Section 2 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-6 h-6 text-saudi" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi">القول المفيد</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed">
                  منصة فرعية داخل "ضَـمَّـة" تختص بجمع ونشر الفوائد العلمية المنتقاة من كتب العلماء، تتضمن العناصر التالية:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-base sm:text-lg">
                  <li>اسم الكتاب</li>
                  <li>المجلد / الصفحة</li>
                  <li>نص الفائدة</li>
                  <li>تعليق مختصر منضبط</li>
                  <li>تصنيف الفائدة (عقيدة، فقه، آداب...)</li>
                </ul>
              </motion.div>

              {/* Section 3 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-saudi" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi">منصة البحث العلمي</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed">
                  منبر لنشر أبحاث أكاديمية محكمة (خصوصًا في مجالات الذكاء الاصطناعي، الأنظمة الذاتية، والاتصالات)، بهدف دعم الطلبة والباحثين المسلمين، مع الحرص على النزاهة العلمية، وربط العلوم الحديثة بالقيم الإسلامية.
                </p>
              </motion.div>

              {/* Section 4 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-saudi" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi">الخدمات الصوتية والإعلامية</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed">
                  تقديم خدمات احترافية في مجال:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-base sm:text-lg">
                  <li>التعليق الصوتي الدعوي والعلمي</li>
                  <li>إنتاج الفيديوهات التعليمية والتوعوية</li>
                  <li>تصميم الموشن جرافيك للكتب والمفاهيم العلمية</li>
                </ul>
              </motion.div>

              {/* Section 5 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingCart className="w-6 h-6 text-saudi" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi">السوق الرقمي</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed">
                  قسم تجاري مستقل داخل "ضَـمَّـة"، يُعنى بتوفير منتجات رقمية مثل:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-base sm:text-lg">
                  <li>قوالب تصميم دعوي/علمي</li>
                  <li>عروض تقديمية شرعية</li>
                  <li>خطوط عربية أصلية</li>
                  <li>تصاميم واجهات مستخدم (Front-End Ready UI Kits)</li>
                </ul>
              </motion.div>

              {/* Section 6 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Youtube className="w-6 h-6 text-saudi" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi">قناة يوتيوب تقنية</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed">
                  قناة فرعية تهدف إلى نشر الوعي التقني باللغة العربية، عبر شروحات مبسطة، تغطيات للفعاليات التقنية، مراجعات أدوات، وتحفيز الشباب المسلم على دخول مجالات البرمجة، الذكاء الاصطناعي، والعمل الحر.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Funding and Sustainability */}
          <motion.div 
            className="mt-8 bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-saudi mb-4">التمويل والاستدامة</h2>
            <p className="text-base sm:text-lg leading-relaxed mb-4">
              يطمح المشروع إلى تحقيق استقلالية مالية من خلال:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
              <li>بيع المنتجات الرقمية.</li>
              <li>تقديم خدمات احترافية مدفوعة.</li>
              <li>دعم مباشر من المهتمين بالمحتوى الدعوي والمعرفي.</li>
            </ul>
          </motion.div>

          {/* Visual Identity */}
          <motion.div 
            className="mt-8 bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-saudi mb-4">الهوية البصرية</h2>
            <p className="text-base sm:text-lg leading-relaxed mb-4">
              يعتمد مشروع ضَـمَّـة على هوية بصرية راقية تجمع بين الأناقة والبساطة، بألوان هادئة تعكس الطمأنينة والرصانة العلمية، مع التركيز على جودة الخط العربي وتناسق التصاميم في جميع المواد المنشورة.
            </p>
            <motion.div 
              className="mt-4 space-y-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg font-semibold text-saudi mb-2">الخطوط المستخدمة</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Tajawal</p>
                    <p className="text-sm text-muted-foreground">خط عربي احترافي للنصوص العامة والمحتوى</p>
                  </div>
                  <div>
                    <p className="font-medium">Saudi</p>
                    <p className="text-sm text-muted-foreground">خط عربي مخصص للعناوين والشعارات</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg font-semibold text-saudi mb-2">الألوان الرئيسية</h3>
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={staggerContainer}
                >
                  <motion.div 
                    className="flex items-center gap-3"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#006C35]"></div>
              <div>
                      <p className="font-medium">الأخضر السلفي</p>
                      <p className="text-sm text-muted-foreground">#006C35</p>
              </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#004D27]"></div>
              <div>
                      <p className="font-medium">الأخضر الداكن</p>
                      <p className="text-sm text-muted-foreground">#004D27</p>
              </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#F5F5F5] border border-gray-200"></div>
              <div>
                      <p className="font-medium">الخلفية</p>
                      <p className="text-sm text-muted-foreground">#F5F5F5</p>
              </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#1A1A1A]"></div>
                    <div>
                      <p className="font-medium">النص الرئيسي</p>
                      <p className="text-sm text-muted-foreground">#1A1A1A</p>
            </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Name and Meaning */}
          <motion.div 
            className="mt-8 bg-gradient-to-br from-saudi/5 to-saudi/10 p-4 sm:p-6 rounded-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-saudi mb-4">الاسم والمعنى</h2>
            <p className="text-base sm:text-lg leading-relaxed">
              كلمة "ضَـمَّـة" تحمل دلالة الاحتواء والدفء والعودة إلى الأصل، وهي تشير إلى اجتماع الكلمة، واحتضان العلم النافع، وخلق مساحة تجمع بين الفكر والعمل، وبين العلم والإنتاج.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
