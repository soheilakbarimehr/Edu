import { useParams } from 'react-router-dom';
import { Book, Video, Package, Clock, Users, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api';
import { IMAGES } from '../constants/images';

export function ProductDetail() {
  const { id } = useParams();

  const { data: productData, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => mockApi.getProductById(id || ''),
    enabled: !!id
  });

  const product = productData?.data;

  const getProductImage = () => {
    if (!product) return IMAGES.products.javascriptEbook;
    
    if (product.title.toLowerCase().includes('javascript') || product.title.toLowerCase().includes('جاوااسکریپت')) {
      return IMAGES.products.javascriptEbook;
    } else if (product.title.toLowerCase().includes('git') || product.title.toLowerCase().includes('گیت')) {
      return IMAGES.products.gitCourse;
    } else if (product.title.toLowerCase().includes('devops') || product.title.toLowerCase().includes('دواپس')) {
      return IMAGES.products.devopsPackage;
    } else {
      // Default image based on category
      if (product.category === 'book' || product.category === 'کتاب') {
        return IMAGES.products.javascriptEbook;
      } else if (product.category === 'video' || product.category === 'دوره') {
        return IMAGES.products.gitCourse;
      } else {
        return IMAGES.products.devopsPackage;
      }
    }
  };

  const getCategoryIcon = () => {
    if (!product) return <Book className="w-6 h-6" />;
    
    if (product.category === 'book' || product.category === 'کتاب') {
      return <Book className="w-6 h-6" />;
    } else if (product.category === 'video' || product.category === 'دوره') {
      return <Video className="w-6 h-6" />;
    } else {
      return <Package className="w-6 h-6" />;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          خطا در دریافت اطلاعات محصول. لطفا دوباره تلاش کنید.
        </div>
      </div>
    );
  }

  // Default values for missing fields
  const author = product.author || 'تیم آکادمی آموزش';
  const publishDate = product.publishDate || '۱۴۰۲/۰۶/۱۵';
  const pages = product.pages || (product.category === 'کتاب' || product.category === 'book' ? 250 : null);
  const level = product.level || 'متوسط تا پیشرفته';
  const language = product.language || 'فارسی';
  const format = product.format || (product.category === 'کتاب' || product.category === 'book' ? 'PDF + EPUB' : 'MP4');
  const updates = product.updates || 'بروزرسانی رایگان تا ۱ سال';
  const support = product.support || 'پشتیبانی ۶ ماهه';
  const longDescription = product.longDescription || `
    ${product.description}
    
    این محصول با کیفیت بالا و توسط متخصصان حوزه برنامه‌نویسی تهیه شده است.
    
    مناسب برای:
    - برنامه‌نویسان مبتدی
    - توسعه‌دهندگان حرفه‌ای
    - دانشجویان علوم کامپیوتر
  `;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={getProductImage()}
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
          />
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            {pages && (
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Clock className="w-5 h-5" />
                  <span>تعداد صفحات</span>
                </div>
                <p className="mt-1 text-lg font-bold">{pages} صفحه</p>
              </div>
            )}
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Users className="w-5 h-5" />
                <span>سطح</span>
              </div>
              <p className="mt-1 text-lg font-bold">{level}</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Calendar className="w-5 h-5" />
                <span>تاریخ انتشار</span>
              </div>
              <p className="mt-1 text-lg font-bold">{publishDate}</p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                {getCategoryIcon()}
                <span>فرمت</span>
              </div>
              <p className="mt-1 text-lg font-bold">{format}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-600 dark:text-gray-400">نویسنده: {author}</span>
            <span className="text-gray-600 dark:text-gray-400">زبان: {language}</span>
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="whitespace-pre-line">{longDescription}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <div className="text-3xl font-bold mb-4">
              {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {updates}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {support}
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