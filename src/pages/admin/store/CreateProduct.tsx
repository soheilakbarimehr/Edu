import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CreateProduct() {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    downloadUrl: ''
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/store/manage')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">افزودن محصول جدید</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">عنوان محصول</label>
            <input
              type="text"
              value={productInfo.title}
              onChange={(e) => setProductInfo({ ...productInfo, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="عنوان محصول را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">قیمت (تومان)</label>
            <input
              type="text"
              value={productInfo.price}
              onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="قیمت را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">دسته‌بندی</label>
            <select
              value={productInfo.category}
              onChange={(e) => setProductInfo({ ...productInfo, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
            >
              <option value="">انتخاب دسته‌بندی</option>
              <option value="book">کتاب</option>
              <option value="video">ویدیو</option>
              <option value="package">پکیج</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">تصویر محصول</label>
            <input
              type="text"
              value={productInfo.imageUrl}
              onChange={(e) => setProductInfo({ ...productInfo, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="لینک تصویر محصول را وارد کنید"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">توضیحات</label>
            <textarea
              value={productInfo.description}
              onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              rows={4}
              placeholder="توضیحات محصول را وارد کنید"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">لینک دانلود</label>
            <input
              type="text"
              value={productInfo.downloadUrl}
              onChange={(e) => setProductInfo({ ...productInfo, downloadUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="لینک دانلود محصول را وارد کنید"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => navigate('/admin/store/manage')}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={() => {
              // Handle save
              navigate('/admin/store/manage');
            }}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            ذخیره محصول
          </button>
        </div>
      </div>
    </div>
  );
}