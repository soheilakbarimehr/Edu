import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QuestionNavigation } from '../components/quiz/QuestionNavigation';
import { QuizTimer } from '../components/quiz/QuizTimer';

// Sample quiz data - in a real app this would come from an API
const sampleQuiz = {
  id: 'javascript-advanced',
  title: 'آزمون جامع جاوااسکریپت',
  duration: 10, // 10 minutes
  questions: [
    {
      id: 1,
      text: 'کدام یک از موارد زیر یک Promise را به درستی تعریف می‌کند؟',
      options: [
        'new Promise((resolve, reject) => { resolve(value); })',
        'Promise.create((resolve, reject) => {})',
        'Promise.new(() => {})',
        'new Promise(() => resolve(value))'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      text: 'در ES6، کدام روش برای تعریف یک کلاس صحیح است؟',
      options: [
        'class MyClass { constructor() {} }',
        'function MyClass() {}',
        'const MyClass = class() {}',
        'class = MyClass { constructor() {} }'
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      text: 'کدام متد آرایه در جاوااسکریپت، آرایه اصلی را تغییر نمی‌دهد؟',
      options: [
        'push()',
        'map()',
        'sort()',
        'splice()'
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      text: 'کدام عبارت در مورد async/await صحیح است؟',
      options: [
        'async/await جایگزینی برای callbacks است',
        'await فقط در توابع async قابل استفاده است',
        'async همیشه یک Promise برمی‌گرداند',
        'همه موارد'
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      text: 'کدام یک از موارد زیر یک Closure را به درستی توصیف می‌کند؟',
      options: [
        'تابعی که درون تابع دیگر تعریف می‌شود',
        'تابعی که به متغیرهای خارج از scope خود دسترسی دارد',
        'تابعی که مقدار برمی‌گرداند',
        'تابعی که پارامتر می‌گیرد'
      ],
      correctAnswer: 1
    }
  ]
};

export function Quiz() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(sampleQuiz.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(sampleQuiz.duration * 60); // Convert minutes to seconds
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, isFinished]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const finishQuiz = () => {
    setIsFinished(true);
    // Calculate results
    const results = calculateResults();
    console.log('Quiz Results:', results);
  };

  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    answers.forEach((answer, index) => {
      if (answer === null) {
        unanswered++;
      } else if (answer === sampleQuiz.questions[index].correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = (correct / sampleQuiz.questions.length) * 100;
    return { correct, wrong, unanswered, score };
  };

  if (isFinished) {
    const results = calculateResults();
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">نتیجه آزمون</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-500 mb-2">
              نمره: {results.score.toFixed(2)}٪
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
              <p className="text-green-800 dark:text-green-200 font-bold text-lg">
                {results.correct}
              </p>
              <p className="text-green-600 dark:text-green-300 text-sm">
                پاسخ صحیح
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
              <p className="text-red-800 dark:text-red-200 font-bold text-lg">
                {results.wrong}
              </p>
              <p className="text-red-600 dark:text-red-300 text-sm">
                پاسخ اشتباه
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
              <p className="text-gray-800 dark:text-gray-200 font-bold text-lg">
                {results.unanswered}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                بدون پاسخ
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <QuizTimer timeLeft={timeLeft} />
      
      <div className="text-xl font-bold mb-6 text-center">
        سوال {currentQuestion + 1} از {sampleQuiz.questions.length}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h3 className="text-xl mb-4">{sampleQuiz.questions[currentQuestion].text}</h3>
        <div className="space-y-3">
          {sampleQuiz.questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-right p-3 rounded-lg border ${
                answers[currentQuestion] === index
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
        >
          سوال قبلی
        </button>
        {currentQuestion === sampleQuiz.questions.length - 1 ? (
          <button
            onClick={finishQuiz}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            پایان آزمون
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion((prev) => Math.min(sampleQuiz.questions.length - 1, prev + 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            سوال بعدی
          </button>
        )}
      </div>

      <QuestionNavigation
        totalQuestions={sampleQuiz.questions.length}
        currentQuestion={currentQuestion}
        answeredQuestions={answers}
        onQuestionSelect={setCurrentQuestion}
      />
    </div>
  );
}