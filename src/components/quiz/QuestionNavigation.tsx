interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: (number | null)[];
  onQuestionSelect: (index: number) => void;
}

export function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect,
}: QuestionNavigationProps) {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg md:block hidden">
      <h3 className="text-lg font-bold mb-4 text-center">سوالات</h3>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(index)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm
              ${index === currentQuestion 
                ? 'bg-blue-500 text-white' 
                : answeredQuestions[index] !== null
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}