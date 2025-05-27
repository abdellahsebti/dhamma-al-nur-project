import React from 'react';
import { motion } from 'framer-motion';
import { Book, Shield, FileText, AlertCircle, Scale, Mail, Clock, Users } from 'lucide-react';

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

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen py-8 sm:py-12 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-saudi dark:text-saudi-light text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          الشروط والأحكام
        </motion.h1>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-8 shadow-md border border-saudi-light dark:border-border arabesque-bg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Introduction */}
          <motion.div 
            className="space-y-6 text-base sm:text-lg mb-8 text-gray-700 dark:text-gray-300"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <p className="leading-relaxed">
              باستخدامكم لمنصة ضَـمَّـة، فإنكم توافقون على الالتزام بهذه الشروط والأحكام وفقاً للمنهج السلفي وقوانين الجمهورية الجزائرية. إذا لم توافقوا على هذه الشروط، يرجى عدم استخدام المنصة.
            </p>
          </motion.div>

          {/* Main Sections */}
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-saudi dark:text-saudi-light mb-6"
              variants={fadeInUp}
            >
              شروط استخدام المنصة
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              variants={staggerContainer}
            >
              {/* Basic Principles */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">المبادئ الأساسية</h3>
                </div>
                <ul className="list-none space-y-3">
                  {[
                    'الالتزام التام بالمنهج السلفي في العقيدة والفقه والأخلاق',
                    'اتباع نهج السلف الصالح في فهم النصوص الشرعية',
                    'الالتزام بقوانين الجمهورية الجزائرية في جميع التعاملات',
                    'احترام العلماء الربانيين وعدم الطعن فيهم'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Platform Usage */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">استخدام المنصة</h3>
                </div>
                <ul className="list-none space-y-3">
                  {[
                    'يجب أن تكونوا فوق 18 عاماً أو بموافقة ولي الأمر',
                    'يجب تقديم معلومات دقيقة وصحيحة وفقاً للقانون الجزائري',
                    'يجب الحفاظ على سرية حسابكم وكلمة المرور',
                    'يجب استخدام المنصة بشكل قانوني وأخلاقي',
                    'الالتزام بعدم نشر أي محتوى يخالف الشريعة الإسلامية أو القانون الجزائري'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Content and IP */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">المحتوى والملكية الفكرية</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  جميع المحتويات المتاحة على المنصة (بما في ذلك النصوص، الصور، الفيديوهات، والبودكاست) متاحة للتحميل والمشاركة بحرية. نحن لا نحتفظ بحقوق الملكية الفكرية لهذه المحتويات.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  عند مشاركة أو استخدام أي محتوى من المنصة، نرجو فقط ذكر المصدر: <span className="font-bold text-saudi dark:text-saudi-light">ضمة</span>
                </p>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-saudi-light/30 dark:border-border">
                  <p className="font-bold text-saudi dark:text-saudi-light mb-2">يمكنكم:</p>
                  <ul className="list-none space-y-2">
                    {[
                      'تحميل المحتوى واستخدامه بحرية',
                      'مشاركة المحتوى مع الآخرين',
                      'استخدام المحتوى في مشاريعكم الشخصية',
                      'تعديل المحتوى حسب احتياجاتكم'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-saudi mt-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Legal Responsibility */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">المسؤولية القانونية</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  لا تتحمل منصة ضَـمَّـة المسؤولية عن:
                </p>
                <ul className="list-none space-y-3">
                  {[
                    'أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام المنصة',
                    'أي محتوى غير دقيق أو غير مكتمل',
                    'أي خسائر أو أضرار ناتجة عن تعطل الخدمة',
                    'أي مخالفات للقانون الجزائري يقوم بها المستخدمون'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Terms Modification */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">تعديل الشروط</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت بما يتوافق مع الشريعة الإسلامية والقانون الجزائري. سيتم إخطاركم بأي تغييرات جوهرية من خلال المنصة أو عبر البريد الإلكتروني.
                </p>
              </motion.div>

              {/* Service Termination */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">إنهاء الخدمة</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  نحتفظ بالحق في تعليق أو إنهاء خدمة أي مستخدم في حالة:
                </p>
                <ul className="list-none space-y-3">
                  {[
                    'انتهاك هذه الشروط والأحكام',
                    'إساءة استخدام المنصة',
                    'نشاط غير قانوني أو غير أخلاقي',
                    'مخالفة المنهج السلفي أو نشر البدع والضلالات',
                    'مخالفة قوانين الجمهورية الجزائرية'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Applicable Law */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Book className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">القانون المطبق</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  تخضع هذه الشروط والأحكام لقوانين الجمهورية الجزائرية. أي نزاع ينشأ عن استخدام المنصة سيخضع للاختصاص الحصري لمحاكم الجمهورية الجزائرية.
                </p>
              </motion.div>

              {/* Contact Us */}
              <motion.div 
                className="p-4 sm:p-6 rounded-xl bg-saudi/5 dark:bg-saudi/10 border border-saudi/10 dark:border-saudi-light/10"
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  للتواصل المباشر:<br />
                  البريد الإلكتروني: <a href="mailto:dhamma.productionss@gmail.com" className="text-saudi dark:text-saudi-light hover:underline">dhamma.productionss@gmail.com</a><br />
                  انستغرام: <a href="https://www.instagram.com/dhamma.productions/" target="_blank" rel="noopener noreferrer" className="text-saudi dark:text-saudi-light hover:underline">@dhamma.productions</a>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 