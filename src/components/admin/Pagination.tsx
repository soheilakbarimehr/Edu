import { useThemeStore } from '../../store/theme';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: PaginationProps) {
  const { isDark } = useThemeStore();

  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm">نمایش</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          >
            <option value={5}>۵</option>
            <option value={10}>۱۰</option>
            <option value={20}>۲۰</option>
            <option value={50}>۵۰</option>
          </select>
          <span className="text-sm">مورد در هر صفحه</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            قبلی
          </button>
          <span className="text-sm">
            صفحه {currentPage} از {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}