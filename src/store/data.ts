import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, Exam, Product } from '../types';

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

// Default items
const defaultExams: Exam[] = [
  {
    id: 'js-1',
    title: 'آزمون جامع جاوااسکریپت',
    description: 'تست مهارت‌های پیشرفته در جاوااسکریپت',
    subject: 'JavaScript',
    duration: 60,
    totalQuestions: 30,
    difficulty: 'intermediate',
    status: 'published'
  },
  {
    id: 'react-1',
    title: 'آزمون React.js مقدماتی',
    description: 'ارزیابی دانش React.js',
    subject: 'React',
    duration: 45,
    totalQuestions: 20,
    difficulty: 'beginner',
    status: 'published'
  },
  {
    id: 'python-1',
    title: 'آزمون پایتون پیشرفته',
    description: 'سنجش مهارت‌های برنامه‌نویسی پایتون',
    subject: 'Python',
    duration: 90,
    totalQuestions: 40,
    difficulty: 'advanced',
    status: 'published'
  }
];

const defaultCourses: Course[] = [
  {
    id: 'frontend-1',
    title: 'دوره جامع فرانت‌اند',
    description: 'آموزش کامل توسعه وب مدرن',
    image: '/images/courses/frontend.jpg',
    price: 0,
    category: 'frontend',
    instructor: 'علی محمدی',
    difficulty: 'intermediate',
    status: 'active'
  },
  {
    id: 'backend-1',
    title: 'دوره Node.js',
    description: 'آموزش کامل توسعه سمت سرور',
    image: '/images/courses/backend.jpg',
    price: 2500000,
    category: 'backend',
    instructor: 'رضا کریمی',
    difficulty: 'advanced',
    status: 'active'
  },
  {
    id: 'mobile-1',
    title: 'برنامه‌نویسی React Native',
    description: 'ساخت اپلیکیشن‌های موبایل',
    image: '/images/courses/mobile.jpg',
    price: 1800000,
    category: 'mobile',
    instructor: 'سارا احمدی',
    difficulty: 'beginner',
    status: 'active'
  }
];

const defaultProducts: Product[] = [
  {
    id: 'ebook-1',
    title: 'کتاب الکترونیکی جاوااسکریپت',
    description: 'آموزش جامع و کاربردی جاوااسکریپت',
    image: '/images/products/javascript-ebook.jpg',
    price: 250000,
    category: 'book'
  },
  {
    id: 'video-1',
    title: 'دوره آموزشی گیت',
    description: 'آموزش کامل Git و GitHub',
    image: '/images/products/git-course.jpg',
    price: 0,
    category: 'video'
  },
  {
    id: 'package-1',
    title: 'پکیج جامع DevOps',
    description: 'آموزش DevOps و CI/CD',
    image: '/images/products/devops.jpg',
    price: 3500000,
    category: 'package'
  }
];

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      courses: defaultCourses,
      exams: defaultExams,
      products: defaultProducts,
      
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