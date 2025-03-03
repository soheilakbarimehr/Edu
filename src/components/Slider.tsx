import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/slider/slide1.jpg',
    title: 'دوره‌های برنامه‌نویسی پیشرفته',
    description: 'یادگیری برنامه‌نویسی با بهترین اساتید'
  },
  {
    id: 2,
    image: '/images/slider/slide2.jpg',
    title: 'آزمون‌های آنلاین تخصصی',
    description: 'آماده‌سازی برای موفقیت در بازار کار'
  },
  {
    id: 3,
    image: '/images/slider/slide3.jpg',
    title: 'محصولات آموزشی دیجیتال',
    description: 'دسترسی به بهترین منابع آموزشی'
  }
];

export function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : index < currentSlide ? 'translate-x-full' : '-translate-x-full'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}