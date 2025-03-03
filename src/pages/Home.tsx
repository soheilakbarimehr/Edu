import { Slider } from '../components/Slider';
import { FeaturedSection } from '../components/FeaturedSection';
import { Footer } from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const featuredQuizzes = [
  {
    id: 'q1',
    title: 'آزمون جاوااسکریپت پیشرفته',
    description: 'تست مهارت‌های پیشرفته در جاوااسکریپت',
    image: '/images/courses/frontend.jpg',
    link: '/quizzes/javascript-advanced'
  },
  {
    id: 'q2',
    title: 'آزمون ریکت',
    description: 'ارزیابی دانش React.js',
    image: '/images/courses/backend.jpg',
    link: '/quizzes/react'
  },
  {
    id: 'q3',
    title: 'آزمون پایتون',
    description: 'سنجش مهارت‌های برنامه‌نویسی پایتون',
    image: '/images/courses/mobile.jpg',
    link: '/quizzes/python'
  }
];

const featuredCourses = [
  {
    id: 'c1',
    title: 'دوره جامع فرانت‌اند',
    description: 'آموزش کامل توسعه وب مدرن',
    image: '/images/courses/frontend.jpg',
    link: '/courses/frontend-complete'
  },
  {
    id: 'c2',
    title: 'مسیر یادگیری بک‌اند',
    description: 'آموزش توسعه سمت سرور',
    image: '/images/courses/backend.jpg',
    link: '/courses/backend-path'
  },
  {
    id: 'c3',
    title: 'برنامه‌نویسی موبایل',
    description: 'ساخت اپلیکیشن‌های موبایل',
    image: '/images/courses/mobile.jpg',
    link: '/courses/mobile-dev'
  }
];

const featuredProducts = [
  {
    id: 'p1',
    title: 'کتاب الکترونیکی جاوااسکریپت',
    description: 'آموزش جامع و کاربردی',
    image: '/images/products/javascript-ebook.jpg',
    link: '/store/javascript-ebook'
  },
  {
    id: 'p2',
    title: 'دوره ویدیویی گیت',
    description: 'مدیریت پروژه با Git',
    image: '/images/products/git-course.jpg',
    link: '/store/git-course'
  },
  {
    id: 'p3',
    title: 'پکیج جامع DevOps',
    description: 'مسیر یادگیری DevOps',
    image: '/images/products/devops.jpg',
    link: '/store/devops-package'
  }
];

export function Home() {
  return (
    <>
      <Helmet>
        <title>آکادمی آموزش | خانه</title>
        <meta name="description" content="آکادمی آموزش - پلتفرم آموزش آنلاین برنامه نویسی و فناوری اطلاعات" />
        <meta name="keywords" content="آموزش برنامه نویسی, دوره آنلاین, آموزش آنلاین" />
      </Helmet>
      
      <div>
        <Slider />
        <FeaturedSection title="آزمون‌های برگزیده" items={featuredQuizzes} />
        <FeaturedSection title="دوره‌های پیشنهادی" items={featuredCourses} />
        <FeaturedSection title="محصولات پرفروش" items={featuredProducts} />
        <Footer />
      </div>
    </>
  );
}