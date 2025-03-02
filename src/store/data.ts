import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  status: 'draft' | 'published';
  chapters?: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: string;
  }[];
}

interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  status: 'draft' | 'published';
  questions?: {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  downloadUrl: string;
}

interface DataStore {
  courses: Course[];
  exams: Exam[];
  products: Product[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addExam: (exam: Exam) => void;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      courses: [],
      exams: [],
      products: [],
      
      addCourse: (course) =>
        set((state) => ({
          courses: [...state.courses, course],
        })),
      
      updateCourse: (id, course) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === id ? { ...c, ...course } : c
          ),
        })),
      
      deleteCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
        })),
      
      addExam: (exam) =>
        set((state) => ({
          exams: [...state.exams, exam],
        })),
      
      updateExam: (id, exam) =>
        set((state) => ({
          exams: state.exams.map((e) =>
            e.id === id ? { ...e, ...exam } : e
          ),
        })),
      
      deleteExam: (id) =>
        set((state) => ({
          exams: state.exams.filter((e) => e.id !== id),
        })),
      
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      
      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...product } : p
          ),
        })),
      
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'education-platform-storage',
    }
  )
);