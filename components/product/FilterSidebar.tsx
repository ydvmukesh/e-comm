'use client';

import type { Category } from '@/types';
import { cn } from '@/lib/utils/cn';

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  categories: Category[];
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  categories,
}: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg transition",
              selectedCategory === 'all' ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg transition",
                selectedCategory === category.slug ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Price Range</h3>
          <span className="text-sm font-medium text-blue-600">${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>

      {/* Brand - Static Placeholder for now */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Brands</h3>
        <div className="space-y-2">
          {['TechAudio', 'SoundMax', 'PowerTech', 'FitTrack'].map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
              <span className="text-gray-600 group-hover:text-gray-900 transition">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating - Static Placeholder for now */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
              <input type="radio" name="rating" className="w-4 h-4 border-gray-300 text-blue-500 focus:ring-blue-500" />
              <span className="text-gray-600 group-hover:text-gray-900 transition">
                {rating}+ Stars & up
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
