import { BarChart as BarChartIcon, TrendingUp, Users } from 'lucide-react';
import { LineChart } from '../../../components/charts/LineChart';
import { BarChart } from '../../../components/charts/BarChart';

export function CourseSalesReport() {
  const monthlySales = {
    data: [12500000, 15800000, 14200000, 16900000, 18500000, 17800000],
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  };

  const courseRevenue = {
    data: [8500000, 12000000, 9800000, 15000000, 11200000],
    labels: ['React', 'JavaScript', 'Python', 'Node.js', 'DevOps'],
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">گزارش فروش دوره‌ها</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4">
            <BarChartIcon className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">درآمد کل</h3>
          </div>
          <p className="text-3xl font-bold">۳۵,۸۰۰,۰۰۰ تومان</p>
          <p className="text-green-500 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            ۲۳٪ رشد نسبت به ماه قبل
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">تعداد دانشجویان</h3>
          </div>
          <p className="text-3xl font-bold">۴۵۶ نفر</p>
          <p className="text-green-500 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            ۱۲٪ رشد نسبت به ماه قبل
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4">
            <BarChartIcon className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">میانگین درآمد هر دوره</h3>
          </div>
          <p className="text-3xl font-bold">۸,۹۵۰,۰۰۰ تومان</p>
          <p className="text-green-500 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            ۸٪ رشد نسبت به ماه قبل
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4">درآمد ماهانه</h3>
          <LineChart
            data={monthlySales.data}
            labels={monthlySales.labels}
            title="درآمد (تومان)"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4">درآمد به تفکیک دوره</h3>
          <BarChart
            data={courseRevenue.data}
            labels={courseRevenue.labels}
            title="درآمد (تومان)"
          />
        </div>
      </div>
    </div>
  );
}