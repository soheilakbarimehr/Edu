import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FilterBar } from '../components/FilterBar';
import { mockApi } from '../services/api';
import { Course } from '../types';
import { IMAGES } from '../constants/images';

const categoryFilters = [
  { id: 'frontend', label: 'فرانت‌اند', value: 'frontend' },
  { id: 'backend', label: 'بک‌اند', value: 'backend' },
  { id: 'mobile', label: 'موبایل', value: 'mobile' },
  { id: 'devops', label: 'دواپس', value: 'devops' }
];

const levelFilters = [
  { id: 'beginner', label: 'مبتدی', value: 'beginner' },
  { id: 'intermediate', label: 'متوسط', value: 'intermediate' },
  { id: 'advanced', label: 'پیشرفته', value: 'advanced' }
];

export function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const { data: coursesData, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: mockApi.getCourses
  });

  useEffect(() => {
    if (coursesData?.data) {
      const filtered = coursesData.data.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
        const matchesLevel = selectedLevels.length === 0 || 
                            (course.difficulty && selectedLevels.includes(course.difficulty));
        return matchesSearch && matchesCategory && matchesLevel;
      });
      setFilteredCourses(filtered);
    }
  }, [coursesData, searchTerm, selectedCategories, selectedLevels]);

  const getCourseImage = (course: Course) => {
    if (course.category === 'frontend') {
      return IMAGES.courses.frontend;
    } else if (course.category === 'backend') {
      return IMAGES.courses.backend;
    } else if (course.category === 'mobile') {
      return IMAGES.courses.mobile;
    } else {
      // Default image
      return IMAGES.courses.frontend;
    }
  };

  if (isLoading) {
    return (
      <div className="pt-8 px-4 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-8 px-4 max-w-7xl mx-auto">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">دوره‌های آموزشی</h1>
        
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجو در دوره‌ها..."
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
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <img
              src={getCourseImage(course)}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{course.description}</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                  {course.category === 'frontend' ? 'فرانت‌اند' : 
                   course.category === 'backend' ? 'بک‌اند' : 
                   course.category === 'mobile' ? 'موبایل' : 'دواپس'}
                </span>
                {course.difficulty && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    course.difficulty === 'beginner' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : course.difficulty === 'intermediate'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {course.difficulty === 'beginner' ? 'مبتدی' :
                     course.difficulty === 'intermediate' ? 'متوسط' : 'پیشرفته'}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-lg">هیچ دوره‌ای با فیلترهای انتخاب شده یافت نشد.</p>
        </div>
      )}
    </div>
  );
}