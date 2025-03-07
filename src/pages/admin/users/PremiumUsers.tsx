import { useState } from 'react';
import { Crown, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../../../components/Tooltip';

export function PremiumUsers() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const users = [
    {
      id: '1',
      name: 'علی رضایی',
      email: 'ali@example.com',
      joinDate: '۱۴۰۲/۰۷/۱۰',
      subscription: 'سالانه',
      courses: 5,
    },
    {
      id: '2',
      name: 'سارا محمدی',
      email: 'sara@example.com',
      joinDate: '۱۴۰۲/۰۸/۰۵',
      subscription: 'ماهانه',
      courses: 3,
    },
    {
      id: '3',
      name: 'سارا محمدی',
      email: 'sara@example.com',
      joinDate: '۱۴۰۲/۰۸/۰۵',
      subscription: 'ماهانه',
      courses: 3,
    },
    {
      id: '4',
      name: 'سارا محمدی',
      email: 'sara@example.com',
      joinDate: '۱۴۰۲/۰۸/۰۵',
      subscription: 'ماهانه',
      courses: 3,
    },
    {
      id: '5',
      name: 'سارا محمدی',
      email: 'sara@example.com',
      joinDate: '۱۴۰۲/۰۸/۰۵',
      subscription: 'ماهانه',
      courses: 3,
    },
    {
      id: '6',
      name: 'سارا محمدی',
      email: 'sara@example.com',
      joinDate: '۱۴۰۲/۰۸/۰۵',
      subscription: 'ماهانه',
      courses: 3,
    },
  ];

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">کاربران ویژه</h2>
        <Tooltip content="افزودن کاربر جدید">
          <button 
            onClick={() => navigate('/admin/users/create')}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            افزودن کاربر جدید
          </button>
        </Tooltip>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-6 py-3 text-right">نام</th>
                <th className="px-6 py-3 text-right">ایمیل</th>
                <th className="px-6 py-3 text-right">تاریخ عضویت</th>
                <th className="px-6 py-3 text-right">نوع اشتراک</th>
                <th className="px-6 py-3 text-right">تعداد دوره‌ها</th>
                <th className="px-6 py-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Tooltip content="کاربر ویژه">
                      <Crown className="w-5 h-5 text-yellow-500" />
                    </Tooltip>
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.joinDate}</td>
                  <td className="px-6 py-4">{user.subscription}</td>
                  <td className="px-6 py-4">{user.courses} دوره</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip content="ویرایش کاربر">
                        <button className="text-blue-500 hover:text-blue-600">
                          <Edit className="w-5 h-5" />
                        </button>
                      </Tooltip>
                      <Tooltip content="حذف کاربر">
                        <button className="text-red-500 hover:text-red-600">
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
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm">نمایش</span>
          <select
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          >
            <option value={5}>۵</option>
            <option value={10}>۱۰</option>
            <option value={20}>۲۰</option>
            <option value={50}>۵۰</option>
          </select>
          <span className="text-sm">کاربر در هر صفحه</span>
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
  );
}