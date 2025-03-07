import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QuestionNavigation } from '../components/quiz/QuestionNavigation';
import { QuizTimer } from '../components/quiz/QuizTimer';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/api';

export function Quiz() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { data: examData, isLoading, error } = useQuery({
    queryKey: ['exam', id],
    queryFn: () => mockApi.getExamById(id || ''),
    enabled: !!id
  });

  const exam = examData?.data;

  useEffect(() => {
    if (exam) {
      setAnswers(new Array(exam.questions?.length || 0).fill(null));
      setTimeLeft(exam.duration * 60); // Convert minutes to seconds
    }
  }, [exam]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
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
  };

  const calculateResults = () => {
    if (!exam?.questions) return { correct: 0, wrong: 0, unanswered: 0, score: 0 };

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    answers.forEach((answer, index) => {
      if (answer === null) {
        unanswered++;
      } else if (answer === exam.questions![index].correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = (correct / exam.questions.length) * 100;
    return { correct, wrong, unanswered, score };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !exam || !exam.questions) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          خطا در دریافت اطلاعات آزمون. لطفا دوباره تلاش کنید.
        </div>
      </div>
    );
  }

  if (isFinished) {
    const results = calculateResults();
    const isPassed = results.score >= (exam.passingScore || 70);

    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">نتیجه آزمون</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div className="text-center">
            <p className={`text-3xl font-bold mb-2 ${
              isPassed ? 'text-green-500' : 'text-red-500'
            }`}>
              نمره: {results.score.toFixed(2)}٪
            </p>
            <p className={`text-lg ${
              isPassed ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPassed ? 'تبریک! شما در این آزمون قبول شدید' : 'متأسفانه در این آزمون قبول نشدید'}
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
        سوال {currentQuestion + 1} از {exam.questions.length}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h3 className="text-xl mb-4">{exam.questions[currentQuestion].text}</h3>
        <div className="space-y-3">
          {exam.questions[currentQuestion].options.map((option, index) => (
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
        {currentQuestion === exam.questions.length - 1 ? (
          <button
            onClick={finishQuiz}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            پایان آزمون
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion((prev) => Math.min(exam.questions.length - 1, prev + 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            سوال بعدی
          </button>
        )}
      </div>

      <QuestionNavigation
        totalQuestions={exam.questions.length}
        currentQuestion={currentQuestion}
        answeredQuestions={answers}
        onQuestionSelect={setCurrentQuestion}
      />
    </div>
  );
}