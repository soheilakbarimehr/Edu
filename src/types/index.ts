export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  instructor: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  downloadUrl?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimit: number;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}