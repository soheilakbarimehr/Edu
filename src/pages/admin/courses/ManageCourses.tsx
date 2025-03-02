import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../../../components/Tooltip';
import { useDataStore } from '../../../store/data';

export function ManageCourses() {
  const navigate = useNavigate();
  const { courses, deleteCourse } = useDataStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">مدیریت دوره‌ها</h2>
        <Tooltip content="افزودن دوره جدید">
          <button 
            onClick={() => navigate('/admin/courses/create')}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            ایجاد دوره جدید
          </button>
        </Tooltip>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-right">عنوان دوره</th>
                <th className="px-6 py-3 text-right">مدرس</th>
                <th className="px-6 py-3 text-right">دسته‌بندی</th>
                <th className="px-6 py-3 text-right">قیمت</th>
                <th className="px-6 py-3 text-right">وضعیت</th>
                <th className="px-6 py-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4">{course.title}</td>
                  <td className="px-6 py-4">{course.instructor}</td>
                  <td className="px-6 py-4">{course.category}</td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat('fa-IR').format(course.price)} تومان
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      course.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {course.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip content="ویرایش دوره">
                        <button 
                          onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                          className="text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </Tooltip>
                      <Tooltip content="حذف دوره">
                        <button 
                          onClick={() => {
                            if (window.confirm('آیا از حذف این دوره اطمینان دارید؟')) {
                              deleteCourse(course.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
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