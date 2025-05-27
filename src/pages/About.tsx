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
    <div className="min-h-screen py-8 sm:py-12 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-saudi dark:text-saudi-light text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          عن المشروع
        </motion.h1>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-8 shadow-md border border-saudi-light dark:border-border arabesque-bg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Introduction - Moved to top */}
          <motion.div 
            className="mb-12 bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-saudi/10 dark:border-saudi-light/10"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-saudi dark:text-saudi-light mb-8 text-center relative">
              <span className="relative inline-block">
                مقدمة
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saudi dark:via-saudi-light to-transparent"></div>
              </span>
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                مشروع "ضَـمَّـة" هو مبادرة فكرية وإعلامية شاملة، تهدف إلى إحياء الوعي السلفي الأصيل بين فئة الشباب وطلاب الجامعات، وتقديم محتوى علمي ومعرفي رصين في قالب عصري وجذاب، يجمع بين عمق المضمون وسلاسة العرض. ينطلق المشروع من رؤية تجمع بين التأصيل الشرعي والانفتاح على الوسائط الرقمية الحديثة، ليكون منبرًا لإحياء العلم والفكر السلفي، مع دعم مسارات علمية وتقنية تخدم الأمة الإسلامية في حاضرها ومستقبلها.
              </p>
            </div>
          </motion.div>

          {/* Name and Meaning Section */}
          <motion.div 
            className="mb-12 bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-6 sm:p-8 rounded-xl shadow-md relative overflow-hidden"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute top-4 right-4 w-24 h-24 border-4 border-saudi dark:border-saudi-light rounded-full"></div>
              <div className="absolute top-8 right-8 w-16 h-16 border-4 border-saudi dark:border-saudi-light rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
              <div className="absolute bottom-4 left-4 w-24 h-24 border-4 border-saudi dark:border-saudi-light rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 border-4 border-saudi dark:border-saudi-light rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-saudi dark:text-saudi-light mb-8 text-center relative">
                <span className="relative inline-block">
                  الاسم والمعنى
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saudi dark:via-saudi-light to-transparent"></div>
                </span>
              </h2>
              
              {/* Linguistic Meaning */}
              <div className="mb-8 bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-saudi/10 dark:border-saudi-light/10">
                <h3 className="text-xl font-semibold text-saudi dark:text-saudi-light mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light">١</span>
                  المعنى اللغوي
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  كلمة "ضَمَّة" في اللغة العربية مشتقة من الفعل "ضَمَّ"، الذي يعني:
                </p>
                <ul className="list-none space-y-3 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">•</span>
                    <span>جمع الشيء واحتضانه: كقولك "ضمّ الطفل إلى صدره" أي احتواه وقرّبه بحنان.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">•</span>
                    <span>الإحاطة والربط: أي جمع أشياء متفرقة في كيان واحد.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">•</span>
                    <span>وتُستخدم أيضًا للدلالة على الحركة النحوية (الضمة: ُ)، التي تدل على الرفع، وهي أعلى الحركات شأنًا في اللغة.</span>
                  </li>
                </ul>
              </div>

              {/* Symbolic and Intellectual Meaning */}
              <div className="mb-8 bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-saudi/10 dark:border-saudi-light/10">
                <h3 className="text-xl font-semibold text-saudi dark:text-saudi-light mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light">٢</span>
                  المعنى الرمزي والفكري
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                  اسم "ضَـمَّـة" يحمل دلالات فكرية غنية، نوضحها فيما يلي:
                </p>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-saudi/5 to-transparent dark:from-saudi/10 dark:to-transparent p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-saudi dark:text-saudi-light mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">١</span>
                      الاحتواء والدفء
                    </h4>
                    <ul className="list-none space-y-2 text-base sm:text-lg text-gray-700 dark:text-gray-300 mr-8">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 flex-shrink-0 bg-saudi dark:bg-saudi-light rounded-full"></span>
                        <span>"ضَـمَّـة" تشير إلى حضن فكري وإنساني، مكان آمن يحتوي الأفكار والعقول والطاقات، كما يحتوي القلب الأحباب.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 flex-shrink-0 bg-saudi dark:bg-saudi-light rounded-full"></span>
                        <span>توحي بالدفء العاطفي والفكري، وهي نقيض البرود العلمي الجاف أو الانعزال الاجتماعي.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-saudi/5 to-transparent dark:from-saudi/10 dark:to-transparent p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-saudi dark:text-saudi-light mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">٢</span>
                      العودة إلى الأصل
                    </h4>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mr-8">
                      كما "يعود الطفل إلى حضن أمه"، فإن "ضَـمَّـة" ترمز إلى العودة إلى الهوية الأصلية، إلى القيم الثابتة والمنابع الفكرية الصافية، خاصة في عالم مليء بالضجيج والتيه.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-saudi/5 to-transparent dark:from-saudi/10 dark:to-transparent p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-saudi dark:text-saudi-light mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">٣</span>
                      اجتماع الكلمة ووحدة الهدف
                    </h4>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mr-8">
                      "الضمة" في اللغة تجمع الحرف بصوته، وفي المعنى المجازي تشير إلى جمع الكلمة والفكر حول مشروع مشترك. هي رمز لنبذ التفرقة، وإحياء قيمة الاجتماع على الحق، ووحدة الكلمة بين من يحملون همّ الإصلاح والتأسيس.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-saudi/5 to-transparent dark:from-saudi/10 dark:to-transparent p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-saudi dark:text-saudi-light mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">٤</span>
                      احتضان العلم النافع
                    </h4>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mr-8">
                      المشروع "ضَـمَّـة" يسعى إلى احتضان العلوم الشرعية والعقلية معًا، لا ليكون مجرد مكتبة أو منصة معرفية، بل ليصنع بذلك بيئة إنتاجية واعية.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-saudi/5 to-transparent dark:from-saudi/10 dark:to-transparent p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-saudi dark:text-saudi-light mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">٥</span>
                      الربط بين الفكر والعمل
                    </h4>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mr-8">
                      "ضَـمَّـة" ليست فقط للحفظ والتلقي، بل هي دعوة إلى تحويل الفكر إلى عمل، والعلم إلى إنتاج، بحيث تتكامل المعرفة مع الفعل.
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Context */}
              <div className="mb-8 bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-saudi/10 dark:border-saudi-light/10">
                <h3 className="text-xl font-semibold text-saudi dark:text-saudi-light mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light">٣</span>
                  في سياق المشروع
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  ضَـمَّـة كاسم يحمل في ذاته رسالة: أن هذه المنصة أو هذا المشروع ليس مجرد فضاء عشوائي، بل هو حضن فكري نقي يجمع:
                </p>
                <ul className="list-none space-y-3 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">•</span>
                    <span>الباحثين والمفكرين.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">•</span>
                    <span>المواد النافعة من الدين والعلم.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-saudi/10 dark:bg-saudi-light/10 rounded-full text-saudi dark:text-saudi-light text-sm">•</span>
                    <span>الإنتاج الرقمي والثقافي الملتزم.</span>
                  </li>
                </ul>
              </div>

              {/* Summary Table */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-saudi dark:text-saudi-light mb-6 text-center relative">
                  <span className="relative inline-block">
                    ختامًا: تلخيص المعاني
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saudi dark:via-saudi-light to-transparent"></div>
                  </span>
                </h3>
                <div className="overflow-x-auto rounded-xl shadow-sm border border-saudi/10 dark:border-saudi-light/10">
                  <table className="min-w-full bg-white/50 dark:bg-gray-800/50">
                    <thead className="bg-saudi/10 dark:bg-saudi/20">
                      <tr>
                        <th className="px-6 py-4 text-right text-saudi dark:text-saudi-light font-semibold">البُعد</th>
                        <th className="px-6 py-4 text-right text-saudi dark:text-saudi-light font-semibold">المعنى</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-saudi/5 dark:hover:bg-saudi/10 transition-colors">
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">لغوي</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">جمع واحتواء ورفع وشأن</td>
                      </tr>
                      <tr className="hover:bg-saudi/5 dark:hover:bg-saudi/10 transition-colors">
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">فكري</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">وحدة، دفء، عودة للأصل</td>
                      </tr>
                      <tr className="hover:bg-saudi/5 dark:hover:bg-saudi/10 transition-colors">
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">ثقافي</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">خلق مساحة حضارية واعية تجمع بين الفكر والعمل</td>
                      </tr>
                      <tr className="hover:bg-saudi/5 dark:hover:bg-saudi/10 transition-colors">
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">رمزي</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">ضمّ القلوب والعقول في حضن واحد يخدم الحقيقة والعلم النافع</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision and Mission */}
          <motion.div 
            className="mb-12 bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-saudi/10 dark:border-saudi-light/10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-saudi dark:text-saudi-light mb-8 text-center relative">
              <span className="relative inline-block">
                الرؤية والرسالة
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saudi dark:via-saudi-light to-transparent"></div>
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-transparent dark:from-saudi/10 dark:to-transparent p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-xl sm:text-2xl font-bold text-saudi dark:text-saudi-light">الرؤية</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  بناء مجتمع شبابي مثقّف وواعي، متصل بجذوره العلمية الأصيلة، وقادر على إنتاج محتوى مؤثر في مجالات الدين، الفكر، والعلوم الحديثة، عبر وسائط رقمية تنافسية وفعّالة.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-transparent dark:from-saudi/10 dark:to-transparent p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-xl sm:text-2xl font-bold text-saudi dark:text-saudi-light">الرسالة</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  تقديم محتوى معرفي مؤصّل يعكس منهج السلف الصالح، ويعزّز من الوعي العلمي والتقني لدى الشباب، وذلك عبر إنتاج مواد إعلامية، ومنصات رقمية، وخدمات احترافية تخدم هذه الغاية.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Sections */}
          <motion.div 
            className="mb-12 bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-saudi/10 dark:border-saudi-light/10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-saudi dark:text-saudi-light mb-8 text-center relative">
              <span className="relative inline-block">
                أقسام المشروع الأساسية
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saudi dark:via-saudi-light to-transparent"></div>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Section 1 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">الوعي السلفي – تأسيس وبناء</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  سلسلة مرئية قصيرة تُبَثّ عبر وسائل التواصل تحت عنوان "تأسيس"، تُعنى بوضع اللبنات الأولى في تصحيح المفاهيم الشرعية والفكرية، عبر اختيار دقيق للنصوص (آيات، أحاديث، آثار) وشرحها بلغة واضحة مع مؤثرات بصرية عالية الجودة.
                </p>
              </motion.div>

              {/* Section 2 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">القول المفيد</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  منصة فرعية داخل "ضَـمَّـة" تختص بجمع ونشر الفوائد العلمية المنتقاة من كتب العلماء، تتضمن العناصر التالية:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  <li>اسم الكتاب</li>
                  <li>المجلد / الصفحة</li>
                  <li>نص الفائدة</li>
                  <li>تعليق مختصر منضبط</li>
                  <li>تصنيف الفائدة (عقيدة، فقه، آداب...)</li>
                </ul>
              </motion.div>

              {/* Section 3 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">منصة البحث العلمي</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  منبر لنشر أبحاث أكاديمية محكمة (خصوصًا في مجالات الذكاء الاصطناعي، الأنظمة الذاتية، والاتصالات)، بهدف دعم الطلبة والباحثين المسلمين، مع الحرص على النزاهة العلمية، وربط العلوم الحديثة بالقيم الإسلامية.
                </p>
              </motion.div>

              {/* Section 4 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">الخدمات الصوتية والإعلامية</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  تقديم خدمات احترافية في مجال:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  <li>التعليق الصوتي الدعوي والعلمي</li>
                  <li>إنتاج الفيديوهات التعليمية والتوعوية</li>
                  <li>تصميم الموشن جرافيك للكتب والمفاهيم العلمية</li>
                </ul>
              </motion.div>

              {/* Section 5 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingCart className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">السوق الرقمي</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  قسم تجاري مستقل داخل "ضَـمَّـة"، يُعنى بتوفير منتجات رقمية مثل:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                  <li>قوالب تصميم دعوي/علمي</li>
                  <li>عروض تقديمية شرعية</li>
                  <li>خطوط عربية أصلية</li>
                  <li>تصاميم واجهات مستخدم (Front-End Ready UI Kits)</li>
                </ul>
              </motion.div>

              {/* Section 6 */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Youtube className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">قناة يوتيوب تقنية</h3>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  قناة فرعية تهدف إلى نشر الوعي التقني باللغة العربية، عبر شروحات مبسطة، تغطيات للفعاليات التقنية، مراجعات أدوات، وتحفيز الشباب المسلم على دخول مجالات البرمجة، الذكاء الاصطناعي، والعمل الحر.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Funding and Sustainability */}
          <motion.div 
            className="mt-8 bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-saudi dark:text-saudi-light mb-4">التمويل والاستدامة</h2>
            <p className="text-base sm:text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
              يطمح المشروع إلى تحقيق استقلالية مالية من خلال:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-gray-700 dark:text-gray-300">
              <li>بيع المنتجات الرقمية.</li>
              <li>تقديم خدمات احترافية مدفوعة.</li>
              <li>دعم مباشر من المهتمين بالمحتوى الدعوي والمعرفي.</li>
            </ul>
          </motion.div>

          {/* Visual Identity */}
          <motion.div 
            className="mt-8 bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-6 sm:p-8 rounded-xl shadow-md"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-saudi dark:text-saudi-light mb-6">الهوية البصرية</h2>
            <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-300">
              يعتمد مشروع ضَـمَّـة على هوية بصرية راقية تجمع بين الأناقة والبساطة، بألوان هادئة تعكس الطمأنينة والرصانة العلمية، مع التركيز على جودة الخط العربي وتناسق التصاميم في جميع المواد المنشورة.
            </p>

            {/* Layout container for the three sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Typography */}
              <div className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-inner">
                <h3 className="text-xl font-semibold text-saudi dark:text-saudi-light mb-4">الخطوط المستخدمة</h3>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="p-3 rounded bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500">
                    <p className="font-tajawal text-lg font-medium">Tajawal</p>
                    <p className="text-sm">خط عربي احترافي للنصوص العامة والمحتوى</p>
                  </div>
                  <div className="p-3 rounded bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500">
                    <p className="font-saudi text-lg font-medium">Saudi</p>
                    <p className="text-sm">خط عربي مخصص للعناوين والشعارات</p>
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-inner">
                <h3 className="text-xl font-semibold text-saudi dark:text-saudi-light mb-4">الألوان الرئيسية</h3>
                <div className="grid grid-cols-1 gap-4 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-600">
                    <p className="text-lg">الأخضر السلفي</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm">#006C35</p>
                      <div className="w-8 h-8 bg-[#006C35] rounded shadow"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-600">
                    <p className="text-lg">الأخضر الداكن</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm">#004D27</p>
                      <div className="w-8 h-8 bg-[#004D27] rounded shadow"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-600">
                    <p className="text-lg">النص الرئيسي</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm">#1A1A1A</p>
                      <div className="w-8 h-8 bg-[#1A1A1A] rounded shadow"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-600">
                    <p className="text-lg">الخلفية</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm">#F5F5F5</p>
                      <div className="w-8 h-8 bg-[#F5F5F5] rounded border border-gray-300 dark:border-gray-600 shadow"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Elements */}
              <div className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-inner">
                <h3 className="text-xl font-semibold text-saudi dark:text-saudi-light mb-4">عناصر التصميم</h3>
                <ul className="list-disc list-inside space-y-2 text-base text-gray-700 dark:text-gray-300">
                  <li>استخدام الزخارف الإسلامية التقليدية في الخلفيات والحدود</li>
                  <li>تدرجات لونية ناعمة تعتمد على اللون الأخضر السعودي</li>
                  <li>زوايا دائرية للعناصر</li>
                  <li>ظلال خفيفة وعمق</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
