import axios from 'axios';
import { useDataStore } from '../store/data';
import { Course, Exam, Product } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const mockApi = {
  // Courses
  getCourses: async () => {
    const store = useDataStore.getState();
    return { data: store.courses };
  },

  getCourseById: async (id: string) => {
    const store = useDataStore.getState();
    const course = store.courses.find(c => c.id === id);
    return { data: course };
  },

  createCourse: async (course: Omit<Course, 'id'>) => {
    const store = useDataStore.getState();
    const newCourse = {
      ...course,
      id: Date.now().toString(),
    } as Course;
    store.addCourse(newCourse);
    return { data: newCourse };
  },

  updateCourse: async (id: string, course: Partial<Course>) => {
    const store = useDataStore.getState();
    store.updateCourse(id, course);
    const updatedCourse = store.courses.find(c => c.id === id);
    return { data: updatedCourse };
  },

  deleteCourse: async (id: string) => {
    const store = useDataStore.getState();
    store.deleteCourse(id);
    return { success: true };
  },

  // Exams
  getExams: async () => {
    const store = useDataStore.getState();
    return { data: store.exams };
  },

  getExamById: async (id: string) => {
    const store = useDataStore.getState();
    const exam = store.exams.find(e => e.id === id);
    return { data: exam };
  },

  createExam: async (exam: Omit<Exam, 'id'>) => {
    const store = useDataStore.getState();
    const newExam = {
      ...exam,
      id: Date.now().toString(),
    } as Exam;
    store.addExam(newExam);
    return { data: newExam };
  },

  updateExam: async (id: string, exam: Partial<Exam>) => {
    const store = useDataStore.getState();
    store.updateExam(id, exam);
    const updatedExam = store.exams.find(e => e.id === id);
    return { data: updatedExam };
  },

  deleteExam: async (id: string) => {
    const store = useDataStore.getState();
    store.deleteExam(id);
    return { success: true };
  },

  // Products
  getProducts: async () => {
    const store = useDataStore.getState();
    return { data: store.products };
  },

  getProductById: async (id: string) => {
    const store = useDataStore.getState();
    const product = store.products.find(p => p.id === id);
    return { data: product };
  },

  createProduct: async (product: Omit<Product, 'id'>) => {
    const store = useDataStore.getState();
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    } as Product;
    store.addProduct(newProduct);
    return { data: newProduct };
  },

  updateProduct: async (id: string, product: Partial<Product>) => {
    const store = useDataStore.getState();
    store.updateProduct(id, product);
    const updatedProduct = store.products.find(p => p.id === id);
    return { data: updatedProduct };
  },

  deleteProduct: async (id: string) => {
    const store = useDataStore.getState();
    store.deleteProduct(id);
    return { success: true };
  },
};

// Admin dashboard API
export const adminApi = {
  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      return {
        data: {
          userStats: {
            total: 1234,
            change: 12,
            isPositive: true
          },
          courseStats: {
            total: 45,
            change: 8,
            isPositive: true
          },
          examStats: {
            total: 156,
            change: -5,
            isPositive: false
          },
          productStats: {
            total: 890,
            change: -3,
            isPositive: false
          },
          monthlyRevenue: {
            data: [12500000, 15800000, 14200000, 16900000, 18500000, 17800000],
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
            changes: [5, -2, 8, -3, 10, -1]
          },
          userGrowth: {
            data: [850, 920, 1100, 980, 1250, 1450],
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
            changes: [8, 10, -5, 12, -2, 7]
          }
        }
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get course sales data
  getCourseSalesData: async () => {
    try {
      return {
        data: {
          totalRevenue: 35800000,
          revenueChange: 23,
          isRevenuePositive: true,
          totalStudents: 456,
          studentChange: 12,
          isStudentPositive: true,
          averageCourseRevenue: 8950000,
          averageChange: -3,
          isAveragePositive: false,
          monthlySales: {
            data: [12500000, 15800000, 14200000, 16900000, 18500000, 17800000],
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
          },
          courseRevenue: {
            data: [8500000, 12000000, 9800000, 15000000, 11200000],
            labels: ['React', 'JavaScript', 'Python', 'Node.js', 'DevOps'],
          }
        }
      };
    } catch (error) {
      console.error('Error fetching course sales data:', error);
      throw error;
    }
  },

  // Get exam reports data
  getExamReportsData: async () => {
    try {
      return {
        data: {
          totalParticipants: 1245,
          averageScore: 76.5,
          passRate: 82,
          monthlyParticipants: {
            data: [156, 189, 210, 178, 245, 267],
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
            changes: [10, -5, 12, -8, 15, -2]
          },
          examScores: {
            data: [65, 78, 72, 85, 82, 76],
            labels: ['جاوااسکریپت', 'React', 'Node.js', 'Python', 'Git', 'SQL'],
            changes: [-3, 5, -2, 8, -1, 4]
          }
        }
      };
    } catch (error) {
      console.error('Error fetching exam reports data:', error);
      throw error;
    }
  },

  // Get store sales data
  getStoreSalesData: async () => {
    try {
      return {
        data: {
          totalSales: 12500000,
          salesChange: 15,
          isSalesPositive: true,
          totalItems: 125,
          itemsChange: -5,
          isItemsPositive: false,
          monthlySales: {
            data: [8500000, 12000000, 9800000, 15000000, 11200000, 13500000],
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
            changes: [8, -3, 12, -5, 7, -2]
          },
          productSales: {
            data: [45, 32, 28, 18, 12],
            labels: ['کتاب جاوااسکریپت', 'دوره گیت', 'کتاب پایتون', 'دوره React', 'بسته DevOps'],
            changes: [5, -2, 8, -3, 4]
          }
        }
      };
    } catch (error) {
      console.error('Error fetching store sales data:', error);
      throw error;
    }
  }
};

export default api;