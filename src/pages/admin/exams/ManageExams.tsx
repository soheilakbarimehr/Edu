import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tooltip } from '../../../components/Tooltip';
import { mockApi } from '../../../services/api';
import { Exam } from '../../../types';

export function ManageExams() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const { data: examsData, isLoading, error } = useQuery({
    queryKey: ['exams'],
    queryFn: mockApi.getExams
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => mockApi.deleteExam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
    }
  });

  const exams = examsData?.data || [];
  
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (exam.subject && exam.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    const matchesDifficulty = difficultyFilter === 'all' || exam.difficulty === difficultyFilter;
    return matchesSearch && matchesStatus && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExams = filteredExams.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage, searchTerm, statusFilter, difficultyFilter]);

  const handleDeleteExam = (id: string) => {
    if (window.confirm('آیا از حذف این آزمون اطمینان دارید؟')) {
      deleteMutation.mutate(id);
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'مبتدی';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'پیشرفته';
      default: return difficulty;
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">مدیریت آزمون‌ها</h2>
        <Tooltip content="افزودن آزمون جدید">
          <button 
            onClick={() => navigate('/admin/exams/create')}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            ایجاد آزمون جدید
          </button>
        </Tooltip>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در آزمون‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="published">منتشر شده</option>
              <option value="draft">پیش‌نویس</option>
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as 'all' | 'beginner' | 'intermediate' | 'advanced')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="all">همه سطوح</option>
              <option value="beginner">مبتدی</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">پیشرفته</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-6 py-3 text-right">عنوان آزمون</th>
                <th className="px-6 py-3 text-right">موضوع</th>
                <th className="px-6 py-3 text-right">مدت زمان (دقیقه)</th>
                <th className="px-6 py-3 text-right">تعداد سوالات</th>
                <th className="px-6 py-3 text-right">سطح</th>
                <th className="px-6 py-3 text-right">وضعیت</th>
                <th className="px-6 py-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {currentExams.map((exam: Exam) => (
                <tr key={exam.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4">{exam.title}</td>
                  <td className="px-6 py-4">{exam.subject}</td>
                  <td className="px-6 py-4">{exam.duration}</td>
                  <td className="px-6 py-4">{exam.totalQuestions}</td>
                  <td className="px-6 py-4">
                    {exam.difficulty && (
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        exam.difficulty === 'beginner' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : exam.difficulty === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {getDifficultyLabel(exam.difficulty)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      exam.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {exam.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip content="ویرایش آزمون">
                        <button 
                          onClick={() => navigate(`/admin/exams/edit/${exam.id}`)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </Tooltip>
                      <Tooltip content="حذف آزمون">
                        <button 
                          onClick={() => handleDeleteExam(exam.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
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
                صفحه {currentPage} از {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages || 1, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                بعدی
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}