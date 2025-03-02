import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, BarChart3 } from 'lucide-react';

export function QuizDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  // In a real app, fetch quiz data from an API
  const quiz = {
    id: id,
    title: 'آزمون جامع جاوااسکریپت',
    description: 'این آزمون شامل مباحث پیشرفته جاوااسکریپت مانند Promises، Async/Await، و Design Patterns می‌باشد.',
    duration: 60,
    totalQuestions: 30,
    level: 'پیشرفته',
    topics: ['Promises', 'Async/Await', 'Design Patterns', 'ES6+', 'Performance'],
    passingScore: 70,
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a'
  };

  const handleStartQuiz = () => {
    setIsStarting(true);
    setTimeout(() => {
      navigate(`/quiz/${id}`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img
          src={quiz.image}
          alt={quiz.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {quiz.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <Clock className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">مدت زمان</p>
                <p className="font-semibold">{quiz.duration} دقیقه</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">تعداد سوالات</p>
                <p className="font-semibold">{quiz.totalQuestions} سوال</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">نمره قبولی</p>
                <p className="font-semibold">{quiz.passingScore}٪</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">سرفصل‌های آزمون</h2>
            <div className="flex flex-wrap gap-2">
              {quiz.topics.map((topic, index) => (
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