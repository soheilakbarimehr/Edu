import { BarChart as BarChartIcon, TrendingUp } from 'lucide-react';
import { LineChart } from '../../../components/charts/LineChart';
import { BarChart } from '../../../components/charts/BarChart';

export function SalesReport() {
  const monthlySales = {
    data: [8500000, 12000000, 9800000, 15000000, 11200000, 13500000],
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  };

  const productSales = {
    data: [45, 32, 28, 18, 12],
    labels: ['کتاب جاوااسکریپت', 'دوره گیت', 'کتاب پایتون', 'دوره React', 'بسته DevOps'],
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">گزارش فروش</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4">
            <BarChartIcon className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">فروش کل</h3>
          </div>
          <p className="text-3xl font-bold">۱۲,۵۰۰,۰۰۰ تومان</p>
          <p className="text-green-500 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            ۱۵٪ رشد نسبت به ماه قبل
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4">
            <BarChartIcon className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">تعداد فروش</h3>
          </div>
          <p className="text-3xl font-bold">۱۲۵ عدد</p>
          <p className="text-green-500 flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            ۸٪ رشد نسبت به ماه قبل
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4">فروش ماهانه</h3>
          <LineChart
            data={monthlySales.data}
            labels={monthlySales.labels}
            title="فروش (تومان)"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4">فروش به تفکیک محصول</h3>
          <BarChart
            data={productSales.data}
            labels={productSales.labels}
            title="تعداد فروش"
          />
        </div>
      </div>
    </div>
  );
}