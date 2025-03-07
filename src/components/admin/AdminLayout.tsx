import { AdminHeader } from './AdminHeader';
import { Sidebar } from './Sidebar';
import { useThemeStore } from '../../store/theme';
import { Pagination } from './Pagination';

interface AdminLayoutProps {
  children: React.ReactNode;
  showPagination?: boolean;
  paginationProps?: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
  };
}

export function AdminLayout({ children, showPagination, paginationProps }: AdminLayoutProps) {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200 flex flex-col`}>
      <AdminHeader />
      <div className="flex-1 flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 lg:mr-64 flex flex-col">
          {/* Main content with max height to prevent scrolling */}
          <div className="flex-1 p-4 lg:p-6 overflow-auto" style={{ height: 'calc(100vh - 13rem)' }}>
            {children}
          </div>
          
          {/* Fixed bottom section */}
          <div className="sticky bottom-0 w-full">
            {/* Pagination Bar */}
            {showPagination && paginationProps && (
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
                <Pagination {...paginationProps} />
              </div>
            )}

            {/* Team Info Bar */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-4 py-3`}>
              <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">طراحی و توسعه توسط </span>
                  <span className="font-semibold">تیم آکادمی آموزش</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  نسخه ۱.۰.۰
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}