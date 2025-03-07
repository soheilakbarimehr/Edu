import { useState } from 'react';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../../store/data';

interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
}

export function CreateCourse() {
  const navigate = useNavigate();
  const { addCourse } = useDataStore();
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: '1',
      title: '',
      description: '',
      videoUrl: '',
      duration: ''
    }
  ]);

  const [courseInfo, setCourseInfo] = useState({
    title: '',
    description: '',
    instructor: '',
    price: '',
    category: '',
    level: 'beginner'
  });

  const addChapter = () => {
    setChapters([
      ...chapters,
      {
        id: (chapters.length + 1).toString(),
        title: '',
        description: '',
        videoUrl: '',
        duration: ''
      }
    ]);
  };

  const removeChapter = (id: string) => {
    setChapters(chapters.filter(c => c.id !== id));
  };

  const handleSave = () => {
    const newCourse = {
      id: Date.now().toString(),
      title: courseInfo.title,
      description: courseInfo.description,
      instructor: courseInfo.instructor,
      price: Number(courseInfo.price),
      category: courseInfo.category,
      status: 'draft' as const,
      chapters: chapters
    };

    addCourse(newCourse);
    navigate('/admin/courses/manage');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/courses/manage')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">ایجاد دوره جدید</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold mb-4">اطلاعات کلی دوره</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">عنوان دوره</label>
            <input
              type="text"
              value={courseInfo.title}
              onChange={(e) => setCourseInfo({ ...courseInfo, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="عنوان دوره را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">مدرس</label>
            <input
              type="text"
              value={courseInfo.instructor}
              onChange={(e) => setCourseInfo({ ...courseInfo, instructor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="نام مدرس را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">قیمت (تومان)</label>
            <input
              type="text"
              value={courseInfo.price}
              onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="قیمت را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">دسته‌بندی</label>
            <select
              value={courseInfo.category}
              onChange={(e) => setCourseInfo({ ...courseInfo, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
            >
              <option value="">انتخاب دسته‌بندی</option>
              <option value="web">وب</option>
              <option value="mobile">موبایل</option>
              <option value="programming">برنامه‌نویسی</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">توضیحات</label>
            <textarea
              value={courseInfo.description}
              onChange={(e) => setCourseInfo({ ...courseInfo, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              rows={3}
              placeholder="توضیحات دوره را وارد کنید"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">فصل {index + 1}</h3>
              {chapters.length > 1 && (
                <button
                  onClick={() => removeChapter(chapter.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">عنوان فصل</label>
                <input
                  type="text"
                  value={chapter.title}
                  onChange={(e) => {
                    const newChapters = [...chapters];
                    newChapters[index].title = e.target.value;
                    setChapters(newChapters);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
                  placeholder="عنوان فصل را وارد کنید"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">توضیحات</label>
                <textarea
                  value={chapter.description}
                  onChange={(e) => {
                    const newChapters = [...chapters];
                    newChapters[index].description = e.target.value;
                    setChapters(newChapters);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
                  rows={2}
                  placeholder="توضیحات فصل را وارد کنید"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">لینک ویدیو</label>
                  <input
                    type="text"
                    value={chapter.videoUrl}
                    onChange={(e) => {
                      const newChapters = [...chapters];
                      newChapters[index].videoUrl = e.target.value;
                      setChapters(newChapters);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
                    placeholder="لینک ویدیو را وارد کنید"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">مدت زمان</label>
                  <input
                    type="text"
                    value={chapter.duration}
                    onChange={(e) => {
                      const newChapters = [...chapters];
                      newChapters[index].duration = e.target.value;
                      setChapters(newChapters);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
                    placeholder="مثال: 1:30:00"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addChapter}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن فصل جدید
        </button>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate('/admin/courses/manage')}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            ذخیره دوره
          </button>
        </div>
      </div>
    </div>
  );
}