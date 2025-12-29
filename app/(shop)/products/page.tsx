'use client';

import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/product/ProductCard';
import FilterSidebar from '@/components/product/FilterSidebar';
import SortDropdown from '@/components/product/SortDropdown';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSort, setSelectedSort] = useState('newest');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.price - b.price;
      if (selectedSort === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, priceRange, selectedSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <aside className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} priceRange={priceRange} setPriceRange={setPriceRange} categories={categories} />
        </aside>
        <div className="flex-1">
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center">
            <p className="text-gray-600">Showing <span className="font-bold">{filteredProducts.length}</span> products</p>
            <SortDropdown selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          </div>
          <div className={cn("grid gap-6", viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
            {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
