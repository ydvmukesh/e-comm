'use client'
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils/cn';
import { useCartStore } from '@/lib/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.salePrice || product.price,
      image: product.images[0],
    });
  };

  const discount = product.salePrice
    ? calculateDiscount(product.price, product.salePrice)
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {/* Placeholder for product image */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-2 opacity-20" />
            <p className="text-sm">Product Image</p>
          </div>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            -{discount}%
          </div>
        )}

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Add to Cart Button */}
        {product.inStock && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category & Brand */}
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-500 transition">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="ml-2 text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.salePrice || product.price)}
          </span>
          {product.salePrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
