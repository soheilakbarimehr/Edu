import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FilterBar } from '../components/FilterBar';
import { mockApi } from '../services/api';
import { Product } from '../types';
import { IMAGES } from '../constants/images';

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: mockApi.getProducts
  });

  const getPriceRange = (price: number) => {
    if (price < 100000) return 'under-100';
    if (price <= 500000) return '100-500';
    return 'over-500';
  };

  useEffect(() => {
    if (productsData?.data) {
      const filtered = productsData.data.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPriceRange = selectedPriceRanges.length === 0 || 
                                 selectedPriceRanges.includes(getPriceRange(product.price));
        return matchesSearch && matchesCategory && matchesPriceRange;
      });
      setFilteredProducts(filtered);
    }
  }, [productsData, searchTerm, selectedCategories, selectedPriceRanges]);

  const getProductImage = (product: Product) => {
    if (product.title.toLowerCase().includes('javascript') || product.title.toLowerCase().includes('جاوااسکریپت')) {
      return IMAGES.products.javascriptEbook;
    } else if (product.title.toLowerCase().includes('git') || product.title.toLowerCase().includes('گیت')) {
      return IMAGES.products.gitCourse;
    } else if (product.title.toLowerCase().includes('devops') || product.title.toLowerCase().includes('دواپس')) {
      return IMAGES.products.devopsPackage;
    } else {
      // Default image based on category
      if (product.category === 'book') {
        return IMAGES.products.javascriptEbook;
      } else if (product.category === 'video') {
        return IMAGES.products.gitCourse;
      } else {
        return IMAGES.products.devopsPackage;
      }
    }
  };

  if (isLoading) {
    return (
      <div className="pt-8 px-4 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-8 px-4 max-w-7xl mx-auto">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
        </div>
      </div>
    );
  }

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
            to={`/store/${product.id}`}
            className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <img
              src={getProductImage(product)}
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

      {filteredProducts.length === 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-lg">هیچ محصولی با فیلترهای انتخاب شده یافت نشد.</p>
        </div>
      )}
    </div>
  );
}