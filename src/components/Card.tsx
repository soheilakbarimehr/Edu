import { cn } from '../lib/utils';

interface CardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  price?: number;
  className?: string;
}

export function Card({ title, description, image, link, price, className }: CardProps) {
  return (
    <a
      href={link}
      className={cn(
        "block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow",
        className
      )}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{description}</p>
        {typeof price !== 'undefined' && (
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {price === 0 ? 'رایگان' : `${new Intl.NumberFormat('fa-IR').format(price)} تومان`}
          </p>
        )}
      </div>
    </a>
  );
}