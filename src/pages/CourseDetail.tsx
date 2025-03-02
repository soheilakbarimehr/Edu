import { useParams } from 'react-router-dom';
import { Course } from '../types';

export function CourseDetail() {
  const { id } = useParams();

  // In a real app, fetch course data from an API
  const course: Course = {
    id: 'frontend-complete',
    title: 'دوره جامع فرانت‌اند',
    description: 'آموزش کامل توسعه وب مدرن',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
    price: 1200000,
    category: 'web-development',
    difficulty: 'intermediate',
    duration: '40 ساعت',
    instructor: 'علی محمدی',
    chapters: [
      {
        id: 'ch1',
        title: 'مقدمه و آشنایی با HTML',
        description: 'آشنایی با مفاهیم پایه HTML و ساختار صفحات وب',
        videoUrl: 'https://example.com/video1.mp4',
        duration: '1:30:00'
      },
      // More chapters...
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{course.description}</p>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">سرفصل‌ها</h2>
            {course.chapters.map((chapter) => (
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
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow sticky top-20">
            <div className="text-2xl font-bold mb-4">
              {new Intl.NumberFormat('fa-IR').format(course.price)} تومان
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>سطح دوره</span>
                <span>{course.difficulty === 'intermediate' ? 'متوسط' : ''}</span>
              </div>
              <div className="flex justify-between">
                <span>مدت زمان</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>مدرس</span>
                <span>{course.instructor}</span>
              </div>
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