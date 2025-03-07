import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api';
import { IMAGES } from '../constants/images';

export function CourseDetail() {
  const { id } = useParams();

  const { data: courseData, isLoading, error } = useQuery({
    queryKey: ['course', id],
    queryFn: () => mockApi.getCourseById(id || ''),
    enabled: !!id
  });

  const course = courseData?.data;

  const getCourseImage = () => {
    if (!course) return IMAGES.courses.frontend;
    
    if (course.category === 'frontend') {
      return IMAGES.courses.frontend;
    } else if (course.category === 'backend') {
      return IMAGES.courses.backend;
    } else if (course.category === 'mobile') {
      return IMAGES.courses.mobile;
    } else {
      return IMAGES.courses.frontend;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          خطا در دریافت اطلاعات دوره. لطفا دوباره تلاش کنید.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img
            src={getCourseImage()}
            alt={course.title}
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{course.description}</p>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">سرفصل‌ها</h2>
            {course.chapters && course.chapters.length > 0 ? (
              course.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                >
                  <h3 className="font-semibold mb-2">{chapter.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {chapter.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    مدت زمان: {chapter.duration}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p>سرفصل‌های این دوره هنوز تعریف نشده است.</p>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow sticky top-20">
            <div className="text-2xl font-bold mb-4">
              {new Intl.NumberFormat('fa-IR').format(course.price)} تومان
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>مدرس</span>
                <span>{course.instructor}</span>
              </div>
              {course.difficulty && (
                <div className="flex justify-between">
                  <span>سطح دوره</span>
                  <span>
                    {course.difficulty === 'beginner' ? 'مبتدی' :
                     course.difficulty === 'intermediate' ? 'متوسط' : 'پیشرفته'}
                  </span>
                </div>
              )}
              {course.duration && (
                <div className="flex justify-between">
                  <span>مدت زمان</span>
                  <span>{course.duration}</span>
                </div>
              )}
              {course.students && (
                <div className="flex justify-between">
                  <span>تعداد دانشجویان</span>
                  <span>{course.students} نفر</span>
                </div>
              )}
              {course.status && (
                <div className="flex justify-between">
                  <span>وضعیت</span>
                  <span>
                    {course.status === 'active' ? 'در حال برگزاری' :
                     course.status === 'upcoming' ? 'در حال ثبت‌نام' : 
                     course.status === 'completed' ? 'تکمیل شده' : 
                     course.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                  </span>
                </div>
              )}
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
              ثبت‌نام در دوره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}