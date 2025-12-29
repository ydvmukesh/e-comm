'use client';

import { useState } from 'react';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Heart, Minus, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils/cn';
import { useCartStore } from '@/lib/store/cartStore';
import { cn } from '@/lib/utils/cn';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.value || '');
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.salePrice || product.price,
      image: product.images[0],
      quantity: quantity,
      variant: selectedVariant ? { type: product.variants![0].type, value: selectedVariant } : undefined
    });
  };

  const discount = product.salePrice
    ? calculateDiscount(product.price, product.salePrice)
    : 0;

  return (
    <div className="space-y-6">
      {/* Badge & Brand */}
      <div className="flex items-center justify-between">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-xs">
          {product.brand}
        </span>
        <button className="text-gray-400 hover:text-red-500 transition">
          <Heart className="w-6 h-6" />
        </button>
      </div>

      {/* Name & Rating */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-5 h-5",
                  star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                )}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-blue-500 hover:underline cursor-pointer">
            {product.reviewCount} customer reviews
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end space-x-4 py-4 border-y border-gray-100">
        <span className="text-4xl font-bold text-gray-900">
          {formatPrice(product.salePrice || product.price)}
        </span>
        {product.salePrice && (
          <div className="flex flex-col">
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
            <span className="text-red-500 font-bold text-sm">
              Save {formatPrice(product.price - product.salePrice)} ({discount}%)
            </span>
          </div>
        )}
      </div>

      {/* Description Short */}
      <p className="text-gray-600 leading-relaxed italic border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
        {product.description}
      </p>

      {/* Variants (if any) */}
      {product.variants && (
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900">Select {product.variants[0].type}</h3>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.value)}
                disabled={!variant.inStock}
                className={cn(
                  "px-6 py-2 rounded-lg border-2 transition-all font-medium",
                  selectedVariant === variant.value 
                    ? "border-blue-500 bg-blue-50 text-blue-600" 
                    : "border-gray-200 text-gray-600 hover:border-gray-300",
                  !variant.inStock && "opacity-50 cursor-not-allowed grayscale"
                )}
              >
                {variant.value}
                {!variant.inStock && " (Out of Stock)"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <div className="flex items-center border-2 border-gray-200 rounded-xl px-2 w-fit">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 text-gray-500 hover:text-blue-500 transition"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="w-12 text-center font-bold text-xl">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 text-gray-500 hover:text-blue-500 transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-6 h-6" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>

      {/* Trust Badges Mini */}
      <div className="grid grid-cols-3 gap-2 pt-6">
        <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
          <Truck className="w-4 h-4 text-blue-500" />
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Safe Payment</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
          <RotateCcw className="w-4 h-4 text-purple-500" />
          <span>7-Day Return</span>
        </div>
      </div>
    </div>
  );
}
