import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FilterBar } from '../components/FilterBar';

const categoryFilters = [
  { id: 'book', label: 'کتاب', value: 'book' },
  { id: 'video', label: 'ویدیو', value: 'video' },
  { id: 'package', label: 'پکیج', value: 'package' }
];

const priceFilters = [
  { id: 'under-100', label: 'زیر ۱۰۰ هزار', value: 'under-100' },
  { id: '100-500', label: '۱۰۰ تا ۵۰۰ هزار', value: '100-500' },
  { id: 'over-500', label: 'بالای ۵۰۰ هزار', value: 'over-500' }
];

export function Store() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const allProducts = [
    {
      id: 'p1',
      title: 'کتاب الکترونیکی جاوااسکریپت',
      description: 'آموزش جامع و کاربردی جاوااسکریپت از مبتدی تا پیشرفته',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
      link: '/store/javascript-ebook',
      category: 'book',
      price: 89000
    },
    {
      id: 'p2',
      title: 'دوره ویدیویی گیت',
      description: 'آموزش کامل مدیریت پروژه با Git و GitHub',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb',
      link: '/store/git-course',
      category: 'video',
      price: 299000
    },
    {
      id: 'p3',
      title: 'پکیج جامع DevOps',
      description: 'مسیر یادگیری کامل DevOps از صفر تا صد',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9',
      link: '/store/devops-package',
      category: 'package',
      price: 890000
    }
  ];

  const getPriceRange = (price: number) => {
    if (price < 100000) return 'under-100';
    if (price <= 500000) return '100-500';
    return 'over-500';
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPriceRange = selectedPriceRanges.length === 0 || selectedPriceRanges.includes(getPriceRange(product.price));
    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  return (
    <div className="pt-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">فروشگاه</h1>
        
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">
          <FilterBar
            options={categoryFilters}
            selectedFilters={selectedCategories}
            onFilterChange={setSelectedCategories}
            label="دسته‌بندی"
            className="w-full md:w-auto"
          />
          <FilterBar
            options={priceFilters}
            selectedFilters={selectedPriceRanges}
            onFilterChange={setSelectedPriceRanges}
            align="end"
            label="محدوده قیمت"
            className="w-full md:w-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={product.link}
            className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                  {product.category === 'book' ? 'کتاب' : 
                   product.category === 'video' ? 'ویدیو' : 'پکیج'}
                </span>
                <span className="font-bold text-lg">
                  {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}