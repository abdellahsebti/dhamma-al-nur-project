# مشروع ضَـمَّـة - Dummah Project

![ضَـمَّـة](https://via.placeholder.com/1200x300/006C35/FFFFFF?text=مشروع+ضَـمَّـة)

## نبذة عن المشروع
مشروع ضَـمَّـة هو منصة إسلامية متكاملة تهدف إلى نشر الوعي السلفي والبحث العلمي من خلال عدة وسائط تعليمية متنوعة.

## المميزات الرئيسية

- **الفيديوهات التعليمية**: دروس فيديو في العقيدة والفقه والتفسير وغيرها
- **البودكاست**: محتوى صوتي متميز ودروس مسموعة
- **القول المفيد**: فوائد علمية منتقاة من كتب أهل العلم
- **عيون القهوة**: روايات وقصص هادفة للقراءة بتصميم مريح للعين

## التقنيات المستخدمة

- **واجهة المستخدم**: React, TypeScript, Tailwind CSS
- **حالة التطبيق**: TanStack React Query
- **قاعدة البيانات**: Firebase Firestore
- **المصادقة**: Firebase Authentication
- **التخزين**: Firebase Storage
- **مكتبة واجهات الاستخدام**: shadcn/ui

## التنصيب والتشغيل محلياً

### المتطلبات الأساسية

- Node.js (النسخة 16.x أو أعلى)
- NPM (النسخة 8.x أو أعلى)

### خطوات التنصيب

1. استنساخ المشروع:
   ```bash
   git clone https://github.com/yourusername/dummah-project.git
   cd dummah-project
   ```

2. تثبيت الاعتمادات:
   ```bash
   npm install
   ```

3. تكوين Firebase:
   - أنشئ مشروع Firebase جديد من [لوحة تحكم Firebase](https://console.firebase.google.com/)
   - قم بإضافة تطبيق ويب للمشروع
   - قم بنسخ تكوين Firebase واستبداله في ملف `src/lib/firebase.ts`

4. تشغيل التطبيق محلياً:
   ```bash
   npm run dev
   ```

5. افتح متصفحك على العنوان: `http://localhost:5173`

## هيكل المشروع

```
src/
  ├── components/       # مكونات واجهة المستخدم المشتركة
  ├── hooks/           # React Hooks المخصصة
  ├── lib/            # مكتبات ووظائف مساعدة
  ├── pages/          # صفحات التطبيق
  ├── services/       # خدمات الاتصال بقاعدة البيانات
  ├── App.tsx         # المكون الرئيسي للتطبيق
  └── main.tsx        # نقطة الدخول للتطبيق
```

## بيانات الدخول للوحة التحكم

- **البريد الإلكتروني**: abdellahsebti001@gmail.com
- **كلمة المرور**: F9k#2pL$7xQz@5Jm!8Tb

## النشر والاستضافة

يمكن نشر هذا المشروع على خدمات الاستضافة المختلفة مثل:
- Firebase Hosting
- Vercel
- Netlify
- GitHub Pages

### خطوات النشر على Firebase Hosting

1. تثبيت أدوات Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. تسجيل الدخول إلى Firebase:
   ```bash
   firebase login
   ```

3. بدء مشروع Firebase:
   ```bash
   firebase init
   ```

4. بناء المشروع:
   ```bash
   npm run build
   ```

5. نشر المشروع:
   ```bash
   firebase deploy
   ```

## المساهمة في المشروع

نرحب بالمساهمات في تطوير المشروع، يرجى اتباع الخطوات التالية:

1. انشئ Fork للمشروع
2. أنشئ Branch جديد للميزة الجديدة: `git checkout -b feature/amazing-feature`
3. قم بإجراء التغييرات اللازمة وحفظها: `git commit -m 'Add amazing feature'`
4. ارسل التغييرات إلى Fork الخاص بك: `git push origin feature/amazing-feature`
5. أنشئ طلب دمج (Pull Request)

## تكوين Firebase

يجب تكوين مشروع Firebase الخاص بك مع الخدمات التالية:

1. **Firebase Authentication**: تمكين المصادقة بالبريد الإلكتروني وكلمة المرور
2. **Firestore Database**: إنشاء قواعد البيانات التالية:
   - `videos`: لتخزين مقاطع الفيديو
   - `podcasts`: لتخزين البودكاست
   - `benefits`: لتخزين الفوائد العلمية
   - `coffeeStories`: لتخزين القصص والروايات
   - `coffeeChapters`: لتخزين فصول القصص
   - `joinRequests`: لتخزين طلبات الانضمام للمشروع
   - `contactMessages`: لتخزين رسائل التواصل
3. **Firebase Storage**: لتخزين صور أغلفة الكتب والصور الأخرى

### قواعد الأمان المقترحة لـ Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to all content
    match /videos/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /podcasts/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /benefits/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /coffeeStories/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /coffeeChapters/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow only authenticated users to write contact messages and join requests
    match /contactMessages/{document=**} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    match /joinRequests/{document=**} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

## الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

---

تم تطويره بواسطة فريق مشروع ضَـمَّـة © 2023-2024
