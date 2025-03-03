import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useThemeStore } from '../../store/theme';
import { Users, BookOpen, ClipboardList, ShoppingBag, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart } from '../../components/charts/LineChart';
import { BarChart } from '../../components/charts/BarChart';
import { adminApi } from '../../services/api';
import { Helmet } from 'react-helmet-async';

interface DashboardStats {
  userStats: {
    total: number;
    change: number;
    isPositive: boolean;
  };
  courseStats: {
    total: number;
    change: number;
    isPositive: boolean;
  };
  examStats: {
    total: number;
    change: number;
    isPositive: boolean;
  };
  productStats: {
    total: number;
    change: number;
    isPositive: boolean;
  };
  monthlyRevenue: {
    data: number[];
    labels: string[];
    changes: number[];
  };
  userGrowth: {
    data: number[];
    labels: string[];
    changes: number[];
  };
}

export function AdminHome() {
  const { isDark } = useThemeStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: adminApi.getDashboardStats
  });

  useEffect(() => {
    if (data) {
      setStats(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
        خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      title: 'کاربران فعال',
      value: stats.userStats.total.toLocaleString('fa-IR'),
      icon: <Users className="w-8 h-8 text-blue-500" />,
      change: `${stats.userStats.isPositive ? '+' : ''}${stats.userStats.change}٪`,
      isPositive: stats.userStats.isPositive
    },
    {
      title: 'دوره‌های فعال',
      value: stats.courseStats.total.toLocaleString('fa-IR'),
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
      change: `${stats.courseStats.isPositive ? '+' : ''}${stats.courseStats.change}٪`,
      isPositive: stats.courseStats.isPositive
    },
    {
      title: 'آزمون‌های برگزار شده',
      value: stats.examStats.total.toLocaleString('fa-IR'),
      icon: <ClipboardList className="w-8 h-8 text-purple-500" />,
      change: `${stats.examStats.isPositive ? '+' : ''}${stats.examStats.change}٪`,
      isPositive: stats.examStats.isPositive
    },
    {
      title: 'محصولات فروخته شده',
      value: stats.productStats.total.toLocaleString('fa-IR'),
      icon: <ShoppingBag className="w-8 h-8 text-yellow-500" />,
      change: `${stats.productStats.isPositive ? '+' : ''}${stats.productStats.change}٪`,
      isPositive: stats.productStats.isPositive
    }
  ];

  return (
    <>
      <Helmet>
        <title>داشبورد مدیریت | آکادمی آموزش</title>
        <meta name="description" content="پنل مدیریت آکادمی آموزش" />
      </Helmet>
      
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`${
                isDark ? 'bg-gray-800' : 'bg-white'
              } p-6 rounded-lg shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                {stat.icon}
                <span className={`text-sm font-medium flex items-center ${
                  stat.isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.isPositive ? 
                    <TrendingUp className="w-4 h-4 mr-1" /> : 
                    <TrendingDown className="w-4 h-4 mr-1" />
                  }
                  {stat.change}
                </span>
              </div>
              <h3 className={`text-lg font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stat.title}
              </h3>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              درآمد ماهانه
            </h3>
            <LineChart
              data={stats.monthlyRevenue.data}
              labels={stats.monthlyRevenue.labels}
              title="درآمد (تومان)"
              changes={stats.monthlyRevenue.changes}
            />
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              رشد کاربران
            </h3>
            <BarChart
              data={stats.userGrowth.data}
              labels={stats.userGrowth.labels}
              title="تعداد کاربران"
              changes={stats.userGrowth.changes}
            />
          </div>
        </div>
      </div>
    </>
  );
}