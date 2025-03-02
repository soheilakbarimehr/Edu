import { useThemeStore } from '../../store/theme';
import { Users, BookOpen, ClipboardList, ShoppingBag } from 'lucide-react';
import { LineChart } from '../../components/charts/LineChart';
import { BarChart } from '../../components/charts/BarChart';

export function AdminHome() {
  const { isDark } = useThemeStore();

  const stats = [
    {
      title: 'کاربران فعال',
      value: '۱,۲۳۴',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      change: '+۱۲٪'
    },
    {
      title: 'دوره‌های فعال',
      value: '۴۵',
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
      change: '+۸٪'
    },
    {
      title: 'آزمون‌های برگزار شده',
      value: '۱۵۶',
      icon: <ClipboardList className="w-8 h-8 text-purple-500" />,
      change: '+۲۳٪'
    },
    {
      title: 'محصولات فروخته شده',
      value: '۸۹۰',
      icon: <ShoppingBag className="w-8 h-8 text-yellow-500" />,
      change: '+۱۵٪'
    }
  ];

  const monthlyRevenue = {
    data: [12500000, 15800000, 14200000, 16900000, 18500000, 17800000],
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  };

  const userGrowth = {
    data: [850, 920, 1100, 980, 1250, 1450],
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${
              isDark ? 'bg-gray-800' : 'bg-white'
            } p-6 rounded-lg shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              {stat.icon}
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className={`text-lg font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {stat.title}
            </h3>
            <p className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            درآمد ماهانه
          </h3>
          <LineChart
            data={monthlyRevenue.data}
            labels={monthlyRevenue.labels}
            title="درآمد (تومان)"
          />
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            رشد کاربران
          </h3>
          <BarChart
            data={userGrowth.data}
            labels={userGrowth.labels}
            title="تعداد کاربران"
          />
        </div>
      </div>
    </div>
  );
}