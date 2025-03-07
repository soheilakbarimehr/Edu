import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CreateUser() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    type: 'regular',
    subscription: 'monthly'
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/users/regular')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">افزودن کاربر جدید</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">نام و نام خانوادگی</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="نام کاربر را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ایمیل</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="ایمیل کاربر را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">رمز عبور</label>
            <input
              type="password"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="رمز عبور را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">نوع کاربر</label>
            <select
              value={userInfo.type}
              onChange={(e) => setUserInfo({ ...userInfo, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
            >
              <option value="regular">کاربر عادی</option>
              <option value="premium">کاربر ویژه</option>
            </select>
          </div>
          {userInfo.type === 'premium' && (
            <div>
              <label className="block text-sm font-medium mb-1">نوع اشتراک</label>
              <select
                value={userInfo.subscription}
                onChange={(e) => setUserInfo({ ...userInfo, subscription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              >
                <option value="monthly">ماهانه</option>
                <option value="yearly">سالانه</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => navigate('/admin/users/regular')}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={() => {
              // Handle save
              navigate('/admin/users/regular');
            }}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            ذخیره کاربر
          </button>
        </div>
      </div>
    </div>
  );
}