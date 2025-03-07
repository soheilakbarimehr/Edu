import { useState } from 'react';
import { Download, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../../../components/Tooltip';

interface PreviousExam {
  id: string;
  title: string;
  date: string;
  participants: number;
  averageScore: number;
  passingRate: number;
}

export function PreviousExams() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [exams] = useState<PreviousExam[]>([
    {
      id: '1',
      title: 'آزمون جامع جاوااسکریپت',
      date: '۱۴۰۲/۰۸/۱۵',
      participants: 156,
      averageScore: 75.5,
      passingRate: 82
    },
    {
      id: '2',
      title: 'آزمون React.js مقدماتی',
      date: '۱۴۰۲/۰۹/۰۱',
      participants: 98,
      averageScore: 68.3,
      passingRate: 75
    }
  ]);

  const totalPages = Math.ceil(exams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExams = exams.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">آزمون‌های قبلی</h2>
        <div className="flex gap-2">
          <Tooltip content="ایجاد آزمون جدید">
            <button
              onClick={() => navigate('/admin/exams/manage')}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <ArrowLeft className="w-5 h-5" />
              مدیریت آزمون‌ها
            </button>
          </Tooltip>
        </div>
      </div>

      <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-3 text-right">عنوان آزمون</th>
              <th className="px-6 py-3 text-right">تاریخ برگزاری</th>
              <th className="px-6 py-3 text-right">تعداد شرکت‌کنندگان</th>
              <th className="px-6 py-3 text-right">میانگین نمرات</th>
              <th className="px-6 py-3 text-right">درصد قبولی</th>
              <th className="px-6 py-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {currentExams.map((exam) => (
              <tr key={exam.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">{exam.title}</td>
                <td className="px-6 py-4">{exam.date}</td>
                <td className="px-6 py-4">{exam.participants} نفر</td>
                <td className="px-6 py-4">{exam.averageScore}</td>
                <td className="px-6 py-4">{exam.passingRate}%</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip content="مشاهده جزئیات">
                      <button className="text-blue-500 hover:text-blue-600">
                        <Eye className="w-5 h-5" />
                      </button>
                    </Tooltip>
                    <Tooltip content="دانلود گزارش">
                      <button className="text-blue-500 hover:text-blue-600">
                        <Download className="w-5 h-5" />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm">نمایش</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
            >
              <option value={5}>۵</option>
              <option value={10}>۱۰</option>
              <option value={20}>۲۰</option>
              <option value={50}>۵۰</option>
            </select>
            <span className="text-sm">مورد در هر صفحه</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              قبلی
            </button>
            <span className="text-sm">
              صفحه {currentPage} از {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}