// Import all images
import frontendImage from '../assets/images/courses/frontend.jpg';
import backendImage from '../assets/images/courses/backend.jpg';
import mobileImage from '../assets/images/courses/mobile.jpg';
import javascriptEbook from '../assets/images/products/javascript-ebook.jpg';
import gitCourse from '../assets/images/products/git-course.jpg';
import devopsPackage from '../assets/images/products/devops.jpg';
import slide1 from '../assets/images/slider/slide1.jpg';
import slide2 from '../assets/images/slider/slide2.jpg';
import slide3 from '../assets/images/slider/slide3.jpg';

export const IMAGES = {
  courses: {
    frontend: frontendImage,
    backend: backendImage,
    mobile: mobileImage,
  },
  products: {
    javascriptEbook,
    gitCourse,
    devopsPackage,
  },
  slider: {
    slide1,
    slide2,
    slide3,
  },
} as const;