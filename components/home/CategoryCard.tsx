import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-8 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition">
          {category.name}
        </h3>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{category.productCount} products</span>
          <span className="text-blue-500 font-medium group-hover:translate-x-1 transition-transform">
            Shop Now →
          </span>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
