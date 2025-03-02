import { useState } from 'react';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../../store/data';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export function CreateExam() {
  const navigate = useNavigate();
  const { addExam } = useDataStore();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  const [examInfo, setExamInfo] = useState({
    title: '',
    description: '',
    duration: 60,
    passingScore: 70
  });

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: (questions.length + 1).toString(),
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    const newExam = {
      id: Date.now().toString(),
      title: examInfo.title,
      description: examInfo.description,
      duration: examInfo.duration,
      totalQuestions: questions.length,
      status: 'published' as const,
      questions: questions
    };

    addExam(newExam);
    navigate('/admin/exams/manage');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/exams/manage')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">ایجاد آزمون جدید</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold mb-4">اطلاعات کلی آزمون</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">عنوان آزمون</label>
            <input
              type="text"
              value={examInfo.title}
              onChange={(e) => setExamInfo({ ...examInfo, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              placeholder="عنوان آزمون را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">مدت زمان (دقیقه)</label>
            <input
              type="number"
              value={examInfo.duration}
              onChange={(e) => setExamInfo({ ...examInfo, duration: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">توضیحات</label>
            <textarea
              value={examInfo.description}
              onChange={(e) => setExamInfo({ ...examInfo, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
              rows={3}
              placeholder="توضیحات آزمون را وارد کنید"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">سوال {index + 1}</h3>
              {questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">متن سوال</label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].text = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
                  placeholder="متن سوال را وارد کنید"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className="block text-sm font-medium mb-1">
                      گزینه {optionIndex + 1}
                      {question.correctAnswer === optionIndex && (
                        <span className="text-green-500 mr-2">(پاسخ صحیح)</span>
                      )}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].options[optionIndex] = e.target.value;
                          setQuestions(newQuestions);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 transition-colors duration-200"
                        placeholder={`گزینه ${optionIndex + 1}`}
                      />
                      <button
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions[index].correctAnswer = optionIndex;
                          setQuestions(newQuestions);
                        }}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          question.correctAnswer === optionIndex
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          افزودن سوال جدید
        </button>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate('/admin/exams/manage')}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            ذخیره آزمون
          </button>
        </div>
      </div>
    </div>
  );
}