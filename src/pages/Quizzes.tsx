import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FilterBar } from '../components/FilterBar';

const categoryFilters = [
  { id: 'frontend', label: 'فرانت‌اند', value: 'frontend' },
  { id: 'backend', label: 'بک‌اند', value: 'backend' }
];

const levelFilters = [
  { id: 'beginner', label: 'مبتدی', value: 'beginner' },
  { id: 'intermediate', label: 'متوسط', value: 'intermediate' },
  { id: 'advanced', label: 'پیشرفته', value: 'advanced' }
];

const quizzes = [
  {
    id: 'javascript-advanced',
    title: 'آزمون جامع جاوااسکریپت',
    description: 'تست مهارت‌های پیشرفته در جاوااسکریپت',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a',
    category: 'frontend',
    level: 'advanced',
    duration: 60,
    questions: 30
  },
  {
    id: 'react',
    title: 'آزمون React.js',
    description: 'ارزیابی دانش React.js',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    category: 'frontend',
    level: 'intermediate',
    duration: 45,
    questions: 20
  },
  {
    id: 'python',
    title: 'آزمون پایتون',
    description: 'سنجش مهارت‌های برنامه‌نویسی پایتون',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
    category: 'backend',
    level: 'beginner',
    duration: 30,
    questions: 15
  },
  {
    id: 'node',
    title: 'آزمون Node.js',
    description: 'تست مهارت‌های توسعه سمت سرور با Node.js',
    image: 'https://images.unsplash.com/photo-1661961111247-e218f67d1cd2',
    category: 'backend',
    level: 'advanced',
    duration: 50,
    questions: 25
  },
  {
    id: 'typescript',
    title: 'آزمون TypeScript',
    description: 'ارزیابی دانش TypeScript',
    image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667',
    category: 'frontend',
    level: 'intermediate',
    duration: 40,
    questions: 20
  }
];

export function Quizzes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(quiz.category);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(quiz.level);
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="pt-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">آزمون‌های آنلاین</h1>
        
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجو در آزمون‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
          <FilterBar
            options={categoryFilters}
            selectedFilters={selectedCategories}
            onFilterChange={setSelectedCategories}
            label="دسته‌بندی"
            className="w-full md:w-auto"
          />
          <FilterBar
            options={levelFilters}
            selectedFilters={selectedLevels}
            onFilterChange={setSelectedLevels}
            align="end"
            label="سطح"
            className="w-full md:w-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <Link
            key={quiz.id}
            to={`/quizzes/${quiz.id}`}
            className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <img
              src={quiz.image}
              alt={quiz.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{quiz.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                  {quiz.category === 'frontend' ? 'فرانت‌اند' : 'بک‌اند'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  quiz.level === 'beginner' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : quiz.level === 'intermediate'
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {quiz.level === 'beginner' ? 'مبتدی' :
                   quiz.level === 'intermediate' ? 'متوسط' : 'پیشرفته'}
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-xs">
                  {quiz.duration} دقیقه
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-xs">
                  {quiz.questions} سوال
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}