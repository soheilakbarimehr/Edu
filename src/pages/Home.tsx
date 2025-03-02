import { Slider } from '../components/Slider';
import { FeaturedSection } from '../components/FeaturedSection';
import { Footer } from '../components/Footer';

const featuredQuizzes = [
  {
    id: 'q1',
    title: 'آزمون جاوااسکریپت پیشرفته',
    description: 'تست مهارت‌های پیشرفته در جاوااسکریپت',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a',
    link: '/quizzes/javascript-advanced'
  },
  {
    id: 'q2',
    title: 'آزمون ریکت',
    description: 'ارزیابی دانش React.js',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    link: '/quizzes/react'
  },
  {
    id: 'q3',
    title: 'آزمون پایتون',
    description: 'سنجش مهارت‌های برنامه‌نویسی پایتون',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
    link: '/quizzes/python'
  }
];

const featuredCourses = [
  {
    id: 'c1',
    title: 'دوره جامع فرانت‌اند',
    description: 'آموزش کامل توسعه وب مدرن',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
    link: '/courses/frontend-complete'
  },
  {
    id: 'c2',
    title: 'مسیر یادگیری بک‌اند',
    description: 'آموزش توسعه سمت سرور',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    link: '/courses/backend-path'
  },
  {
    id: 'c3',
    title: 'برنامه‌نویسی موبایل',
    description: 'ساخت اپلیکیشن‌های موبایل',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    link: '/courses/mobile-dev'
  }
];

const featuredProducts = [
  {
    id: 'p1',
    title: 'کتاب الکترونیکی جاوااسکریپت',
    description: 'آموزش جامع و کاربردی',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    link: '/store/javascript-ebook'
  },
  {
    id: 'p2',
    title: 'دوره ویدیویی گیت',
    description: 'مدیریت پروژه با Git',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb',
    link: '/store/git-course'
  },
  {
    id: 'p3',
    title: 'پکیج جامع DevOps',
    description: 'مسیر یادگیری DevOps',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9',
    link: '/store/devops-package'
  }
];

export function Home() {
  return (
    <div>
      <Slider />
      <FeaturedSection title="آزمون‌های برگزیده" items={featuredQuizzes} />
      <FeaturedSection title="دوره‌های پیشنهادی" items={featuredCourses} />
      <FeaturedSection title="محصولات پرفروش" items={featuredProducts} />
      <Footer />
    </div>
  );
}