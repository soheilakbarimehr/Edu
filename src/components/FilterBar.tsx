import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterOption } from '../types';

interface FilterBarProps {
  options: FilterOption[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  className?: string;
  align?: 'start' | 'end';
  label: string;
}

export function FilterBar({ options, selectedFilters, onFilterChange, className = '', align = 'start', label }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (value: string) => {
    const newFilters = selectedFilters.includes(value)
      ? selectedFilters.filter(f => f !== value)
      : [...selectedFilters, value];
    onFilterChange(newFilters);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Mobile Dropdown */}
      <div className="md:hidden w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
        >
          <span>{label} {selectedFilters.length > 0 && `(${selectedFilters.length})`}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  toggleFilter(option.value);
                }}
                className={`w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedFilters.includes(option.value)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Filter Buttons */}
      <div className={`hidden md:flex ${align === 'end' ? 'justify-end' : 'justify-start'} gap-2`}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedFilters.includes(option.value)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}