'use client';

import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

export default function SortDropdown({ selectedSort, setSelectedSort }: SortDropdownProps) {
  const options = [
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
  ];

  return (
    <div className="relative group">
      <select
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
