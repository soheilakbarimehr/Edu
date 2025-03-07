import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../store/theme';
import {
  ChevronDown,
  ClipboardList,
  BookOpen,
  Store,
  Users,
  BarChart,
  PlusCircle,
  UserCheck,
  ShoppingBag,
  LayoutDashboard
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: JSX.Element;
  path?: string;
  subItems?: MenuItem[];
}

export function Sidebar() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isDark } = useThemeStore();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'داشبورد ادمین',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin'
    },
    {
      id: 'exams',
      label: 'مدیریت آزمون‌ها',
      icon: <ClipboardList className="w-5 h-5" />,
      subItems: [
        {
          id: 'create-exams',
          label: 'ایجاد و حذف آزمون‌ها',
          path: '/admin/exams/manage',
          icon: <PlusCircle className="w-4 h-4" />
        },
        {
          id: 'previous-exams',
          label: 'آزمون‌های قبلی',
          path: '/admin/exams/previous',
          icon: <ClipboardList className="w-4 h-4" />
        },
        {
          id: 'exam-reports',
          label: 'نمرات و گزارش‌ها',
          path: '/admin/exams/reports',
          icon: <BarChart className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'courses',
      label: 'مدیریت دوره‌ها',
      icon: <BookOpen className="w-5 h-5" />,
      subItems: [
        {
          id: 'courses-list',
          label: 'ایجاد و حذف دوره‌ها',
          path: '/admin/courses/list',
          icon: <PlusCircle className="w-4 h-4" />
        },
        {
          id: 'course-sales',
          label: 'گزارش فروش دوره‌ها',
          path: '/admin/courses/sales',
          icon: <BarChart className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'store',
      label: 'مدیریت محصولات',
      icon: <Store className="w-5 h-5" />,
      subItems: [
        {
          id: 'manage-products',
          label: 'ایجاد و حذف محصولات',
          path: '/admin/store/manage',
          icon: <PlusCircle className="w-4 h-4" />
        },
        {
          id: 'sales-report',
          label: 'گزارش فروش',
          path: '/admin/store/sales',
          icon: <BarChart className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'users',
      label: 'مدیریت کاربران',
      icon: <Users className="w-5 h-5" />,
      subItems: [
        {
          id: 'regular-users',
          label: 'کاربران عادی',
          path: '/admin/users/regular',
          icon: <UserCheck className="w-4 h-4" />
        },
        {
          id: 'premium-users',
          label: 'کاربران ویژه',
          path: '/admin/users/premium',
          icon: <UserCheck className="w-4 h-4" />
        }
      ]
    }
  ];

  const handleItemClick = (item: MenuItem) => {
    if (item.subItems) {
      setExpandedItem(expandedItem === item.id ? null : item.id);
    } else if (item.path) {
      navigate(item.path);
      setExpandedItem(null);
    }
  };

  return (
    <aside className={`w-full lg:w-64 lg:fixed lg:top-16 lg:right-0 lg:h-[calc(100vh-4rem)] ${
      isDark ? 'bg-gray-800' : 'bg-white'
    } shadow-lg transition-colors duration-200 lg:overflow-y-auto z-40`}>
      <nav className="py-4">
        {menuItems.map(item => (
          <div key={item.id} className="w-full">
            <button
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-2 px-4 py-3 text-right ${
                isDark 
                  ? 'hover:bg-gray-700 text-white' 
                  : 'hover:bg-gray-100 text-gray-900'
              } transition-colors`}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.subItems && (
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedItem === item.id ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>
            {item.subItems && expandedItem === item.id && (
              <div className={isDark ? 'bg-gray-900' : 'bg-gray-50'}>
                {item.subItems.map(subItem => (
                  <button
                    key={subItem.id}
                    onClick={() => handleItemClick(subItem)}
                    className={`w-full flex items-center gap-2 px-8 py-2 text-right ${
                      isDark 
                        ? 'hover:bg-gray-800 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    } transition-colors`}
                  >
                    {subItem.icon}
                    <span className="flex-1">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}