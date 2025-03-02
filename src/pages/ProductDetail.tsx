import { useParams } from 'react-router-dom';
import { Book, Video, Package, Clock, Users, Calendar } from 'lucide-react';
import { Product } from '../types';

export function ProductDetail() {
  const { id } = useParams();

  // In a real app, fetch product data from an API
  const product: Product = {
    id: 'javascript-ebook',
    title: 'کتاب الکترونیکی جاوااسکریپت',
    description: 'آموزش جامع و کاربردی جاوااسکریپت از مبتدی تا پیشرفته',
    longDescription: `
      این کتاب شامل آموزش کامل و جامع جاوااسکریپت از سطح مبتدی تا پیشرفته می‌باشد.
      
      مباحث اصلی کتاب:
      - مفاهیم پایه و متغیرها
      - ساختارهای کنترلی و حلقه‌ها
      - توابع و scope
      - شی‌گرایی در جاوااسکریپت
      - Promises و async/await
      - ES6+ و ویژگی‌های جدید
      - طراحی الگوها در جاوااسکریپت
      - بهینه‌سازی و performance
      
      این کتاب برای:
      - برنامه‌نویسان مبتدی
      - توسعه‌دهندگان فرانت‌اند
      - دانشجویان علوم کامپیوتر
    `,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    price: 450000,
    category: 'ebook',
    author: 'دکتر علی محمدی',
    publishDate: '۱۴۰۲/۰۶/۱۵',
    pages: 450,
    level: 'متوسط تا پیشرفته',
    language: 'فارسی',
    format: 'PDF + EPUB',
    updates: 'بروزرسانی رایگان تا ۱ سال',
    support: 'پشتیبانی ۶ ماهه',
    downloadUrl: 'https://example.com/download/javascript-ebook.pdf'
  };

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'ebook':
        return <Book className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
          />
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Clock className="w-5 h-5" />
                <span>تعداد صفحات</span>
              </div>
              <p className="mt-1 text-lg font-bold">{product.pages} صفحه</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Users className="w-5 h-5" />
                <span>سطح</span>
              </div>
              <p className="mt-1 text-lg font-bold">{product.level}</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Calendar className="w-5 h-5" />
                <span>تاریخ انتشار</span>
              </div>
              <p className="mt-1 text-lg font-bold">{product.publishDate}</p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                {getCategoryIcon()}
                <span>فرمت</span>
              </div>
              <p className="mt-1 text-lg font-bold">{product.format}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-600 dark:text-gray-400">نویسنده: {product.author}</span>
            <span className="text-gray-600 dark:text-gray-400">زبان: {product.language}</span>
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="whitespace-pre-line">{product.longDescription}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <div className="text-3xl font-bold mb-4">
              {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {product.updates}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {product.support}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                دانلود فوری پس از خرید
              </li>
            </ul>
            
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
              خرید محصول
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}