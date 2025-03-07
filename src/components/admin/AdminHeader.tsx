import { useThemeStore } from '../../store/theme';

export function AdminHeader() {
  const { isDark } = useThemeStore();
  
  return (
    <header className={`px-4 lg:px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-200`}>
      <div className="flex items-center justify-center">
        <h1 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          به پنل مدیریت خوش آمدید
        </h1>
      </div>
    </header>
  );
}