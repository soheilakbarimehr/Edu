import { useQuery } from '@tanstack/react-query';
import { BarChart as BarChartIcon, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { LineChart } from '../../../components/charts/LineChart';
import { BarChart } from '../../../components/charts/BarChart';
import { adminApi } from '../../../services/api';
import { Helmet } from 'react-helmet-async';

export function CourseSalesReport() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['courseSalesData'],
    queryFn: adminApi.getCourseSalesData
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
        خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
      </div>
    );
  }

  const salesData = data?.data;

  if (!salesData) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>گزارش فروش دوره‌ها | آکادمی آموزش</title>
        <meta name="description" content="گزارش فروش دوره‌های آکادمی آموزش" />
      </Helmet>
      
      <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-6">گزارش فروش دوره‌ها</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-center gap-3 mb-4">
              <BarChartIcon className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">درآمد کل</h3>
            </div>
            <p className="text-3xl font-bold">{salesData.totalRevenue.toLocaleString('fa-IR')} تومان</p>
            <p className={`flex items-center gap-1 mt-2 ${
              salesData.isRevenuePositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {salesData.isRevenuePositive ? 
                <TrendingUp className="w-4 h-4" /> : 
                <TrendingDown className="w-4 h-4" />
              }
              {salesData.isRevenuePositive ? '+' : ''}{salesData.revenueChange}٪ رشد نسبت به ماه قبل
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">تعداد دانشجویان</h3>
            </div>
            <p className="text-3xl font-bold">{salesData.totalStudents.toLocaleString('fa-IR')} نفر</p>
            <p className={`flex items-center gap-1 mt-2 ${
              salesData.isStudentPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {salesData.isStudentPositive ? 
                <TrendingUp className="w-4 h-4" /> : 
                <TrendingDown className="w-4 h-4" />
              }
              {salesData.isStudentPositive ? '+' : ''}{salesData.studentChange}٪ رشد نسبت به ماه قبل
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-center gap-3 mb-4">
              <BarChartIcon className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">میانگین درآمد هر دوره</h3>
            </div>
            <p className="text-3xl font-bold">{salesData.averageCourseRevenue.toLocaleString('fa-IR')} تومان</p>
            <p className={`flex items-center gap-1 mt-2 ${
              salesData.isAveragePositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {salesData.isAveragePositive ? 
                <TrendingUp className="w-4 h-4" /> : 
                <TrendingDown className="w-4 h-4" />
              }
              {salesData.isAveragePositive ? '+' : ''}{salesData.averageChange}٪ رشد نسبت به ماه قبل
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4">درآمد ماهانه</h3>
            <LineChart
              data={salesData.monthlySales.data}
              labels={salesData.monthlySales.labels}
              title="درآمد (تومان)"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4">درآمد به تفکیک دوره</h3>
            <BarChart
              data={salesData.courseRevenue.data}
              labels={salesData.courseRevenue.labels}
              title="درآمد (تومان)"
            />
          </div>
        </div>
      </div>
    </>
  );
}