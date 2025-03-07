import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, BarChart3 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api';
import { IMAGES } from '../constants/images';

export function QuizDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const { data: examData, isLoading, error } = useQuery({
    queryKey: ['exam', id],
    queryFn: () => mockApi.getExamById(id || ''),
    enabled: !!id
  });

  const exam = examData?.data;

  const handleStartQuiz = () => {
    setIsStarting(true);
    setTimeout(() => {
      navigate(`/quiz/${id}`);
    }, 1500);
  };

  const getExamImage = () => {
    if (!exam) return IMAGES.courses.frontend;
    
    if (exam.subject?.toLowerCase().includes('javascript') || 
        exam.subject?.toLowerCase().includes('react') || 
        exam.subject?.toLowerCase().includes('vue') || 
        exam.subject?.toLowerCase().includes('angular')) {
      return IMAGES.courses.frontend;
    } else if (exam.subject?.toLowerCase().includes('python') || 
               exam.subject?.toLowerCase().includes('node') || 
               exam.subject?.toLowerCase().includes('django')) {
      return IMAGES.courses.backend;
    } else {
      return IMAGES.courses.mobile;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 pt-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="max-w-4xl mx-auto p-6 pt-8">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          خطا در دریافت اطلاعات آزمون. لطفا دوباره تلاش کنید.
        </div>
      </div>
    );
  }

  // Generate topics based on subject if not provided
  const topics = exam.topics || [
    exam.subject || 'برنامه‌نویسی',
    'مفاهیم پایه',
    'مفاهیم پیشرفته'
  ];

  // Default passing score if not provided
  const passingScore = exam.passingScore || 70;

  return (
    <div className="max-w-4xl mx-auto p-6 pt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img
          src={getExamImage()}
          alt={exam.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {exam.description || `این آزمون شامل مباحث ${exam.subject} می‌باشد.`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <Clock className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">مدت زمان</p>
                <p className="font-semibold">{exam.duration} دقیقه</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">تعداد سوالات</p>
                <p className="font-semibold">{exam.totalQuestions} سوال</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">نمره قبولی</p>
                <p className="font-semibold">{passingScore}٪</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">سرفصل‌های آزمون</h2>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleStartQuiz}
              disabled={isStarting}
              className={`
                px-8 py-3 rounded-lg text-white font-semibold
                ${isStarting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 transition-colors'
                }
              `}
            >
              {isStarting ? 'در حال آماده‌سازی آزمون...' : 'شروع آزمون'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}