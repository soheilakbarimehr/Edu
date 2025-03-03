import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API URL in production
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor for authentication
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

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors like 401, 403, 500, etc.
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Admin dashboard data
export const adminApi = {
  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're returning mock data
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