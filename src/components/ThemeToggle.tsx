import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/theme';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-white" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}