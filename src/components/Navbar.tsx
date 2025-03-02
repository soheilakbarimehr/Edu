import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

interface NavbarProps {
  onAuthClick: () => void;
}

export function Navbar({ onAuthClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'خانه', path: '/' },
    { name: 'دوره‌ها', path: '/courses' },
    { name: 'آزمون‌ها', path: '/quizzes' },
    { name: 'فروشگاه', path: '/store' },
    { name: 'تماس با ما', path: '/contact' },
    { name: 'درباره ما', path: '/about' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Center - Logo */}
          <div className="flex-1 flex items-center justify-center sm:justify-start">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-center flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            <div className="sm:block">
              <ThemeToggle />
            </div>
            <button
              onClick={onAuthClick}
              className="hidden sm:block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              ورود / ثبت‌نام
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                onAuthClick();
                setIsMenuOpen(false);
              }}
              className="w-full mt-2 bg-blue-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
            >
              ورود / ثبت‌نام
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}