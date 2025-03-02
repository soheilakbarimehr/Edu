import { useState } from 'react';
import { Edit, Trash2, Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../../../components/Tooltip';
import { usePagination } from '../../../hooks/usePagination';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  students: number;
  status: 'active' | 'upcoming' | 'completed';
  price: number;
}

export function CoursesList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'frontend' | 'backend' | 'mobile' | 'devops'>('all');

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'دوره جامع فرانت‌اند',
      instructor: 'علی محمدی',
      category: 'frontend',
      students: 156,
      status: 'active',
      price: 2500000
    },
    {
      id: '2',
      title: 'آموزش پایتون',
      instructor: 'سارا احمدی',
      category: 'backend',
      students: 89,
      status: 'upcoming',
      price: 1800000
    },
    {
      id: '3',
      title: 'برنامه‌نویسی React Native',
      instructor: 'رضا کریمی',
      category: 'mobile',
      students: 120,
      status: 'active',
      price: 3200000
    },
    {
      id: '4',
      title: 'دوره DevOps',
      instructor: 'مهدی حسینی',
      category: 'devops',
      students: 75,
      status: 'completed',
      price: 4500000
    }
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const {
    currentItems: currentCourses,
    currentPage,
    totalPages,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange
  } = usePagination(filteredCourses);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'frontend': return 'فرانت‌اند';
      case 'backend': return 'بک‌اند';
      case 'mobile': return 'موبایل';
      case 'devops': return 'دواپس';
      default: return category;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'در حال برگزاری';
      case 'upcoming': return 'در حال ثبت‌نام';
      case 'completed': return 'تکمیل شده';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">دوره‌های موجود</h2>
        <Tooltip content="افزودن دوره جدید">
          <button 
            onClick={() => navigate('/admin/courses/create')}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            ایجاد دوره جدید
          </button>
        </Tooltip>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در دوره‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'upcoming' | 'completed')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">در حال برگزاری</option>
              <option value="upcoming">در حال ثبت‌نام</option>
              <option value="completed">تکمیل شده</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as 'all' | 'frontend' | 'backend' | 'mobile' | 'devops')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="all">همه دسته‌بندی‌ها</option>
              <option value="frontend">فرانت‌اند</option>
              <option value="backend">بک‌اند</option>
              <option value="mobile">موبایل</option>
              <option value="devops">دواپس</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-right">عنوان دوره</th>
                <th className="px-6 py-3 text-right">مدرس</th>
                <th className="px-6 py-3 text-right">دسته‌بندی</th>
                <th className="px-6 py-3 text-right">تعداد دانشجویان</th>
                <th className="px-6 py-3 text-right">قیمت (تومان)</th>
                <th className="px-6 py-3 text-right">وضعیت</th>
                <th className="px-6 py-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course) => (
                <tr key={course.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4">{course.title}</td>
                  <td className="px-6 py-4">{course.instructor}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {getCategoryLabel(course.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{course.students} نفر</td>
                  <td className="px-6 py-4">{new Intl.NumberFormat('fa-IR').format(course.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      course.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : course.status === 'upcoming'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {getStatusLabel(course.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip content="ویرایش دوره">
                        <button className="text-blue-500 hover:text-blue-600 transition-colors">
                          <Edit className="w-5 h-5" />
                        </button>
                      </Tooltip>
                      <Tooltip content="حذف دوره">
                        <button className="text-red-500 hover:text-red-600 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">نمایش</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
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
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              قبلی
            </button>
            <span className="text-sm">
              صفحه {currentPage} از {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
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