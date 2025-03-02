import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <GraduationCap className="h-8 w-8 text-blue-500" />
      <span className="text-xl font-bold">آکادمی آموزش</span>
    </Link>
  );
}