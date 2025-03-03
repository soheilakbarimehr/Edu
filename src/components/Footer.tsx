import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useThemeStore } from '../store/theme';

export function Footer() {
  const { isDark } = useThemeStore();
  
  return (
    <footer className={isDark ? 'dark' : 'light'}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">درباره آکادمی</h3>
            <p className="text-sm leading-relaxed mb-4">
              آکادمی آموزش با هدف ارائه آموزش‌های با کیفیت در حوزه برنامه‌نویسی و فناوری اطلاعات فعالیت می‌کند. ما متعهد به ارائه بهترین محتوای آموزشی هستیم.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="hover:text-gray-900 dark:hover:text-white transition-colors">دوره‌های آموزشی</Link>
              </li>
              <li>
                <Link to="/quizzes" className="hover:text-gray-900 dark:hover:text-white transition-colors">آزمون‌ها</Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-gray-900 dark:hover:text-white transition-colors">فروشگاه</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gray-900 dark:hover:text-white transition-colors">وبلاگ</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">درباره ما</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">تماس با ما</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">دسته‌بندی‌ها</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?category=frontend" className="hover:text-gray-900 dark:hover:text-white transition-colors">برنامه‌نویسی فرانت‌اند</Link>
              </li>
              <li>
                <Link to="/courses?category=backend" className="hover:text-gray-900 dark:hover:text-white transition-colors">برنامه‌نویسی بک‌اند</Link>
              </li>
              <li>
                <Link to="/courses?category=mobile" className="hover:text-gray-900 dark:hover:text-white transition-colors">برنامه‌نویسی موبایل</Link>
              </li>
              <li>
                <Link to="/courses?category=database" className="hover:text-gray-900 dark:hover:text-white transition-colors">پایگاه داده</Link>
              </li>
              <li>
                <Link to="/courses?category=devops" className="hover:text-gray-900 dark:hover:text-white transition-colors">دواپس</Link>
              </li>
              <li>
                <Link to="/courses?category=security" className="hover:text-gray-900 dark:hover:text-white transition-colors">امنیت</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">اطلاعات تماس</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>تهران، خیابان آزادی، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <a href="tel:02112345678" className="hover:text-gray-900 dark:hover:text-white transition-colors">۰۲۱-۱۲۳۴۵۶۷۸</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <a href="mailto:info@example.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">info@example.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              © ۱۴۰۳ آکادمی آموزش. تمامی حقوق محفوظ است.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">حریم خصوصی</Link>
              <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">قوانین و مقررات</Link>
              <Link to="/faq" className="hover:text-gray-900 dark:hover:text-white transition-colors">سوالات متداول</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}