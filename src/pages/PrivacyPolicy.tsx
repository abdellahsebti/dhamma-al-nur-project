import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, AlertCircle, Mail, Users, Database } from 'lucide-react';

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

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen py-8 sm:py-12 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-saudi dark:text-saudi-light text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          سياسة الخصوصية
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
              نحن في منصة ضَـمَّـة نلتزم بحماية خصوصية مستخدمينا وفقاً للمنهج السلفي وقوانين حماية البيانات في الجمهورية الجزائرية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات الشخصية التي تقدمها لنا.
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
              حماية خصوصيتكم
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
                    'الالتزام بمبادئ الشريعة الإسلامية في حفظ الأسرار والخصوصية',
                    'احترام خصوصية المستخدمين وحماية بياناتهم الشخصية',
                    'الالتزام بقوانين حماية البيانات في الجمهورية الجزائرية',
                    'عدم استخدام البيانات الشخصية في أي غرض يخالف الشريعة الإسلامية'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi dark:text-saudi-light mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Information Collection */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">المعلومات التي نجمعها</h3>
                </div>
                <ul className="list-none space-y-3">
                  {[
                    'الاسم والبريد الإلكتروني',
                    'معلومات الحساب الأساسية',
                    'سجل النشاط على المنصة',
                    'تفضيلات المحتوى والاهتمامات'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi dark:text-saudi-light mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Data Protection */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">حماية البيانات</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  نحن نستخدم تقنيات تشفير متقدمة لحماية بياناتكم الشخصية، ونتخذ إجراءات أمنية صارمة لمنع الوصول غير المصرح به.
                </p>
                <ul className="list-none space-y-3">
                  {[
                    'تشفير البيانات الحساسة',
                    'حماية كلمات المرور',
                    'مراقبة مستمرة للأنشطة المشبوهة',
                    'تحديثات دورية لأنظمة الحماية'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi dark:text-saudi-light mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Data Usage */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">استخدام البيانات</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  نستخدم بياناتكم فقط للأغراض المصرح بها، مثل:
                </p>
                <ul className="list-none space-y-3">
                  {[
                    'تحسين تجربة المستخدم',
                    'تخصيص المحتوى حسب اهتماماتكم',
                    'تحليل استخدام المنصة',
                    'التواصل معكم حول التحديثات المهمة'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi dark:text-saudi-light mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* User Rights */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">حقوق المستخدمين</h3>
                </div>
                <ul className="list-none space-y-3">
                  {[
                    'الحق في الوصول إلى بياناتكم الشخصية',
                    'الحق في تصحيح البيانات غير الدقيقة',
                    'الحق في طلب حذف بياناتكم',
                    'الحق في الاعتراض على معالجة بياناتكم'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-saudi dark:text-saudi-light mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Policy Updates */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">تحديثات السياسة</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  نحتفظ بالحق في تحديث سياسة الخصوصية في أي وقت. سيتم إخطاركم بأي تغييرات جوهرية من خلال المنصة أو عبر البريد الإلكتروني.
                </p>
              </motion.div>

              {/* Contact Information */}
              <motion.div 
                className="bg-gradient-to-br from-saudi/5 to-saudi/10 dark:from-saudi/10 dark:to-saudi/15 p-4 sm:p-6 rounded-xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-saudi dark:text-saudi-light" />
                  <h3 className="text-lg sm:text-xl font-bold text-saudi dark:text-saudi-light">اتصل بنا</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  إذا كان لديكم أي أسئلة حول سياسة الخصوصية، يمكنكم التواصل معنا من خلال:
                </p>
                <ul className="list-none space-y-3">
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-saudi dark:text-saudi-light mt-2">•</span>
                    <span>البريد الإلكتروني: <a href="mailto:dhamma.productionss@gmail.com" className="text-saudi dark:text-saudi-light hover:underline">dhamma.productionss@gmail.com</a></span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-saudi dark:text-saudi-light mt-2">•</span>
                    <span>صفحة التواصل على المنصة</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 