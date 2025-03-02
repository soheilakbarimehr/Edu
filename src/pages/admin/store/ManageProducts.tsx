import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../../../components/Tooltip';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
}

export function ManageProducts() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', title: 'کتاب جاوااسکریپت پیشرفته', price: 450000, category: 'کتاب' },
    { id: '2', title: 'دوره آموزشی گیت', price: 850000, category: 'دوره' },
  ]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">مدیریت محصولات</h2>
        <Tooltip content="افزودن محصول جدید">
          <button 
            onClick={() => navigate('/admin/store/create')}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            افزودن محصول جدید
          </button>
        </Tooltip>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-3 text-right">عنوان</th>
              <th className="px-6 py-3 text-right">دسته‌بندی</th>
              <th className="px-6 py-3 text-right">قیمت</th>
              <th className="px-6 py-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">{product.title}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">
                  {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip content="ویرایش محصول">
                      <button className="text-blue-500 hover:text-blue-600">
                        <Edit className="w-5 h-5" />
                      </button>
                    </Tooltip>
                    <Tooltip content="حذف محصول">
                      <button className="text-blue-500 hover:text-blue-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm">نمایش</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            >
              <option value={5}>۵</option>
              <option value={10}>۱۰</option>
              <option value={20}>۲۰</option>
              <option value={50}>۵۰</option>
            </select>
            <span className="text-sm">مورد در هر صفحه</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              قبلی
            </button>
            <span className="text-sm">
              صفحه {currentPage} از {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}