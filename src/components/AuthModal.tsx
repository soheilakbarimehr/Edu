import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold dark:text-white">
              {isLogin ? 'ورود به حساب کاربری' : 'ثبت‌نام'}
            </h2>
            <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">نام و نام خانوادگی</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">ایمیل</label>
              <input
                type="email"
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">رمز عبور</label>
              <input
                type="password"
                className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-8"
            >
              {isLogin ? 'ورود' : 'ثبت‌نام'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {isLogin ? 'ثبت‌نام حساب جدید' : 'ورود به حساب موجود'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}