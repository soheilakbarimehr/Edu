import { LineChart } from '../../../components/charts/LineChart';
import { BarChart } from '../../../components/charts/BarChart';

export function ExamReports() {
  const monthlyParticipants = {
    data: [156, 189, 210, 178, 245, 267],
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  };

  const examScores = {
    data: [65, 78, 72, 85, 82, 76],
    labels: ['جاوااسکریپت', 'React', 'Node.js', 'Python', 'Git', 'SQL'],
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">نمرات و گزارش‌ها</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-200`}>
          <h3 className="text-lg font-semibold mb-4">تعداد شرکت‌کنندگان ماهانه</h3>
          <LineChart
            data={monthlyParticipants.data}
            labels={monthlyParticipants.labels}
            title="تعداد شرکت‌کنندگان"
          />
        </div>

        <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-200`}>
          <h3 className="text-lg font-semibold mb-4">میانگین نمرات بر اساس موضوع</h3>
          <BarChart
            data={examScores.data}
            labels={examScores.labels}
            title="میانگین نمرات"
          />
        </div>
      </div>

      <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-200`}>
        <h3 className="text-lg font-semibold mb-4">آمار کلی</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h4 className="text-sm font-medium text-blue-600 dark:text-blue-200">کل شرکت‌کنندگان</h4>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-100">۱,۲۴۵ نفر</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
            <h4 className="text-sm font-medium text-green-600 dark:text-green-200">میانگین نمرات کل</h4>
            <p className="text-2xl font-bold text-green-700 dark:text-green-100">۷۶.۵</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
            <h4 className="text-sm font-medium text-purple-600 dark:text-purple-200">درصد قبولی کل</h4>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-100">۸۲٪</p>
          </div>
        </div>
      </div>
    </div>
  );
}