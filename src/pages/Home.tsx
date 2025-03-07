import { useQuery } from '@tanstack/react-query';
import { Slider } from '../components/Slider';
import { FeaturedSection } from '../components/FeaturedSection';
import { Footer } from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { mockApi } from '../services/api';
import { IMAGES } from '../constants/images';

// Default featured items if no data is available
const defaultCourses = [
  {
    id: 'c1',
    title: 'دوره جامع فرانت‌اند',
    description: 'آموزش کامل توسعه وب مدرن',
    image: IMAGES.courses.frontend,
    link: '/courses/frontend-complete'
  },
  {
    id: 'c2',
    title: 'مسیر یادگیری بک‌اند',
    description: 'آموزش توسعه سمت سرور',
    image: IMAGES.courses.backend,
    link: '/courses/backend-path'
  },
  {
    id: 'c3',
    title: 'برنامه‌نویسی موبایل',
    description: 'ساخت اپلیکیشن‌های موبایل',
    image: IMAGES.courses.mobile,
    link: '/courses/mobile-dev'
  }
];

const defaultQuizzes = [
  {
    id: 'q1',
    title: 'آزمون جاوااسکریپت پیشرفته',
    description: 'تست مهارت‌های پیشرفته در جاوااسکریپت',
    image: IMAGES.courses.frontend,
    link: '/quizzes/javascript-advanced'
  },
  {
    id: 'q2',
    title: 'آزمون ریکت',
    description: 'ارزیابی دانش React.js',
    image: IMAGES.courses.backend,
    link: '/quizzes/react'
  },
  {
    id: 'q3',
    title: 'آزمون پایتون',
    description: 'سنجش مهارت‌های برنامه‌نویسی پایتون',
    image: IMAGES.courses.mobile,
    link: '/quizzes/python'
  }
];

const defaultProducts = [
  {
    id: 'p1',
    title: 'کتاب الکترونیکی جاوااسکریپت',
    description: 'آموزش جامع و کاربردی',
    image: IMAGES.products.javascriptEbook,
    link: '/store/javascript-ebook'
  },
  {
    id: 'p2',
    title: 'دوره ویدیویی گیت',
    description: 'مدیریت پروژه با Git',
    image: IMAGES.products.gitCourse,
    link: '/store/git-course'
  },
  {
    id: 'p3',
    title: 'پکیج جامع DevOps',
    description: 'مسیر یادگیری DevOps',
    image: IMAGES.products.devopsPackage,
    link: '/store/devops-package'
  }
];

export function Home() {
  const { data: coursesData } = useQuery({
    queryKey: ['courses'],
    queryFn: mockApi.getCourses
  });

  const { data: examsData } = useQuery({
    queryKey: ['exams'],
    queryFn: mockApi.getExams
  });

  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: mockApi.getProducts
  });

  // Map courses to featured items, fallback to default if no data
  const featuredCourses = coursesData?.data?.length ? coursesData.data.slice(0, 3).map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    image: course.category === 'frontend' ? IMAGES.courses.frontend :
           course.category === 'backend' ? IMAGES.courses.backend :
           course.category === 'mobile' ? IMAGES.courses.mobile :
           IMAGES.courses.frontend,
    link: `/courses/${course.id}`
  })) : defaultCourses;

  // Map exams to featured items, fallback to default if no data
  const featuredQuizzes = examsData?.data?.length ? examsData.data.slice(0, 3).map(exam => ({
    id: exam.id,
    title: exam.title,
    description: exam.description || `آزمون ${exam.subject}`,
    image: exam.subject?.toLowerCase().includes('javascript') ? IMAGES.courses.frontend :
           exam.subject?.toLowerCase().includes('python') ? IMAGES.courses.backend :
           IMAGES.courses.mobile,
    link: `/quizzes/${exam.id}`
  })) : defaultQuizzes;

  // Map products to featured items, fallback to default if no data
  const featuredProducts = productsData?.data?.length ? productsData.data.slice(0, 3).map(product => ({
    id: product.id,
    title: product.title,
    description: product.description,
    image: product.title.toLowerCase().includes('javascript') ? IMAGES.products.javascriptEbook :
           product.title.toLowerCase().includes('git') ? IMAGES.products.gitCourse :
           IMAGES.products.devopsPackage,
    link: `/store/${product.id}`
  })) : defaultProducts;

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