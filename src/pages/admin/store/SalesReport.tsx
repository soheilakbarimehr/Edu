import { useQuery } from '@tanstack/react-query';
import { BarChart as BarChartIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart } from '../../../components/charts/LineChart';
import { BarChart } from '../../../components/charts/BarChart';
import { adminApi } from '../../../services/api';
import { Helmet } from 'react-helmet-async';

export function SalesReport() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['storeSalesData'],
    queryFn: adminApi.getStoreSalesData
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
        <title>گزارش فروش محصولات | آکادمی آموزش</title>
        <meta name="description" content="گزارش فروش محصولات آکادمی آموزش" />
      </Helmet>
      
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">گزارش فروش</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-center gap-3 mb-4">
              <BarChartIcon className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">فروش کل</h3>
            </div>
            <p className="text-3xl font-bold">{salesData.totalSales.toLocaleString('fa-IR')} تومان</p>
            <p className={`flex items-center gap-1 mt-2 ${
              salesData.isSalesPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {salesData.isSalesPositive ? 
                <TrendingUp className="w-4 h-4" /> : 
                <TrendingDown className="w-4 h-4" />
              }
              {salesData.isSalesPositive ? '+' : ''}{salesData.salesChange}٪ رشد نسبت به ماه قبل
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <div className="flex items-center gap-3 mb-4">
              <BarChartIcon className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">تعداد فروش</h3>
            </div>
            <p className="text-3xl font-bold">{salesData.totalItems.toLocaleString('fa-IR')} عدد</p>
            <p className={`flex items-center gap-1 mt-2 ${
              salesData.isItemsPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {salesData.isItemsPositive ? 
                <TrendingUp className="w-4 h-4" /> : 
                <TrendingDown className="w-4 h-4" />
              }
              {salesData.isItemsPositive ? '+' : ''}{salesData.itemsChange}٪ رشد نسبت به ماه قبل
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4">فروش ماهانه</h3>
            <LineChart
              data={salesData.monthlySales.data}
              labels={salesData.monthlySales.labels}
              title="فروش (تومان)"
              changes={salesData.monthlySales.changes}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4">فروش به تفکیک محصول</h3>
            <BarChart
              data={salesData.productSales.data}
              labels={salesData.productSales.labels}
              title="تعداد فروش"
              changes={salesData.productSales.changes}
            />
          </div>
        </div>
      </div>
    </>
  );
}