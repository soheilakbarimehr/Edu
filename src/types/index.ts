export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  instructor: string;
  status?: 'active' | 'upcoming' | 'completed' | 'draft' | 'published';
  students?: number;
  chapters?: Chapter[];
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
  author?: string;
  publishDate?: string;
  pages?: number;
  level?: string;
  language?: string;
  format?: string;
  updates?: string;
  support?: string;
  longDescription?: string;
  downloadUrl?: string;
}

export interface Exam {
  id: string;
  title: string;
  description?: string;
  subject?: string;
  duration: number;
  totalQuestions: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  status?: 'draft' | 'published';
  questions?: Question[];
  passingScore?: number;
  topics?: string[];
  image?: string;
}

export interface Question {
  id: string | number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  subscription?: string;
  courses?: number;
  type?: 'regular' | 'premium';
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}