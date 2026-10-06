# کلینیک مامایی — نسخه آماده GitHub Pages

این پروژه یک وب‌سایت HTML/CSS/JS است و برای اجرا به Build Tool یا Node.js نیاز ندارد.

## ساختار استاندارد
- `index.html` → صفحه اصلی
- `services/` → صفحات خدمات
- `courses/` → صفحات دوره‌ها
- `journey/` → صفحات مسیر همراهی
- `blog/` → وبلاگ
- `assets/css/style.css` → استایل اصلی
- `assets/js/main.js` → اسکریپت‌های سایت
- `images/` → تمام تصاویر سایت
- `.nojekyll` → جلوگیری از پردازش ناخواسته توسط Jekyll در GitHub Pages
- `robots.txt` و `sitemap.xml` → فایل‌های پایه SEO

## انتشار در GitHub Pages
1. یک Repository با نام `midwifery-clinic` بسازید.
2. **محتویات همین پوشه را داخل ریشه Repository** آپلود کنید؛ خود پوشه‌ی مادر را دوباره داخل یک پوشه‌ی دیگر قرار ندهید.
3. در GitHub به `Settings → Pages` بروید.
4. در بخش `Build and deployment` گزینه `Deploy from a branch` را انتخاب کنید.
5. Branch را روی `main` و Folder را روی `/ (root)` بگذارید و ذخیره کنید.

آدرس مورد انتظار:
https://sahar-eshghi.github.io/midwifery-clinic/

## نکته مهم
نام فایل‌های تصاویر عمداً فقط با حروف انگلیسی، عدد و خط تیره تنظیم شده تا روی Linux/GitHub Pages با مشکل فاصله، حروف فارسی یا Encoding مواجه نشود.

برای سئوی نهایی، بعد از انتشار، آدرس canonical و sitemap را با دامنه واقعی پروژه بررسی کنید.


## چیدمان صحیح داخل GitHub
پس از استخراج ZIP، **خود فایل ZIP را داخل Repository آپلود نکنید**. محتویات باید دقیقاً در ریشه Repository باشند؛ یعنی `index.html` باید هم‌سطح `assets` و `images` قرار داشته باشد.

نمونه آدرس برای Repository با نام `midwifery-clinic`:
`https://sahar-eshghi.github.io/midwifery-clinic/`

اگر نام Repository چیز دیگری است، فقط مسیر GitHub Pages و آدرس‌های `canonical`/`sitemap.xml` باید با نام واقعی Repository هماهنگ شوند؛ مسیرهای نسبی `assets/...`، `images/...` و `services/...` را به شکل فعلی تغییر ندهید.
