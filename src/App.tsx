import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Quizzes } from './pages/Quizzes';
import { QuizDetails } from './pages/QuizDetails';
import { Quiz } from './pages/Quiz';
import { Store } from './pages/Store';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { AdminDashboard } from './pages/admin/Dashboard';
import { useThemeStore } from './store/theme';

export function App() {
  const { isDark } = useThemeStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <Helmet>
        <title>آکادمی آموزش | پلتفرم آموزش آنلاین</title>
        <meta name="description" content="آکادمی آموزش با هدف ارائه آموزش‌های با کیفیت در حوزه برنامه‌نویسی و فناوری اطلاعات" />
        <meta name="keywords" content="آموزش برنامه نویسی, دوره آنلاین, آموزش آنلاین, برنامه نویسی" />
        <meta property="og:title" content="آکادمی آموزش | پلتفرم آموزش آنلاین" />
        <meta property="og:description" content="آکادمی آموزش با هدف ارائه آموزش‌های با کیفیت در حوزه برنامه‌نویسی و فناوری اطلاعات" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://academy-example.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="utf-8" />
        <html lang="fa" dir="rtl" />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/:id" element={<QuizDetails />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </Router>
  );
}