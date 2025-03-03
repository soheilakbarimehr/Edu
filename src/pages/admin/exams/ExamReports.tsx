import { useQuery } from '@tanstack/react-query';
import { LineChart } from '../../../components/charts/LineChart';
import { BarChart } from '../../../components/charts/BarChart';
import { adminApi } from '../../../services/api';
import { Helmet } from 'react-helmet-async';

export function ExamReports() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['examReportsData'],
    queryFn: adminApi.getExamReportsData
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

  const reportsData = data?.data;

  if (!reportsData) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>گزارش آزمون‌ها | آکادمی آموزش</title>
        <meta name="description" content="گزارش آزمون‌های آکادمی آموزش" />
      </Helmet>
      
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">نمرات و گزارش‌ها</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-200`}>
            <h3 className="text-lg font-semibold mb-4">تعداد شرکت‌کنندگان ماهانه</h3>
            <LineChart
              data={reportsData.monthlyParticipants.data}
              labels={reportsData.monthlyParticipants.labels}
              title="تعداد شرکت‌کنندگان"
              changes={reportsData.monthlyParticipants.changes}
            />
          </div>

          <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-200`}>
            <h3 className="text-lg font-semibold mb-4">میانگین نمرات بر اساس موضوع</h3>
            <BarChart
              data={reportsData.examScores.data}
              labels={reportsData.examScores.labels}
              title="میانگین نمرات"
              changes={reportsData.examScores.changes}
            />
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-200`}>
          <h3 className="text-lg font-semibold mb-4">آمار کلی</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h4 className="text-sm font-medium text-blue-600 dark:text-blue-200">کل شرکت‌کنندگان</h4>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-100">{reportsData.totalParticipants.toLocaleString('fa-IR')} نفر</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="text-sm font-medium text-green-600 dark:text-green-200">میانگین نمرات کل</h4>
              <p className="text-2xl font-bold text-green-700 dark:text-green-100">{reportsData.averageScore}</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <h4 className="text-sm font-medium text-purple-600 dark:text-purple-200">درصد قبولی کل</h4>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-100">{reportsData.passRate}٪</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}