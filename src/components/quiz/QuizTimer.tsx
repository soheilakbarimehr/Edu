interface QuizTimerProps {
  timeLeft: number;
}

export function QuizTimer({ timeLeft }: QuizTimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-xl font-bold text-center mb-6">
      زمان باقیمانده: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}