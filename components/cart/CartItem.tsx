'use client';

import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils/cn';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group">
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 items-center">
        {/* Product Info */}
        <div className="sm:col-span-3 flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden group-hover:bg-blue-50/50 transition">
             <ShoppingCart className="w-8 h-8 text-gray-200" />
             {/* Actual Image Placeholder */}
             {/* <Image src={item.image} alt={item.name} fill className="object-cover" /> */}
          </div>
          <div className="space-y-1">
            <Link href={`/products/${item.slug}`} className="font-bold text-gray-900 hover:text-blue-500 transition line-clamp-1">
              {item.name}
            </Link>
            {item.variant && (
              <p className="text-xs font-medium text-gray-500 uppercase tracking-tighter">
                {item.variant.type}: <span className="text-gray-900">{item.variant.value}</span>
              </p>
            )}
            <button 
              onClick={() => removeItem(item.productId, item.variant?.value)}
              className="text-xs text-red-500 font-bold hover:text-red-600 flex items-center space-x-1 sm:hidden pt-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex justify-center">
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1 scale-90 sm:scale-100">
            <button 
              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant?.value)}
              className="p-1 hover:text-blue-500 transition text-gray-400"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant?.value)}
              className="p-1 hover:text-blue-500 transition text-gray-400"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Individual Price */}
        <div className="hidden sm:flex flex-col items-center">
          <span className="font-medium text-gray-400 text-xs mb-1">Price</span>
          <span className="text-sm font-semibold text-gray-900">{formatPrice(item.price)}</span>
        </div>

        {/* Subtotal & Actions */}
        <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end w-full">
          <div className="flex flex-col sm:items-end">
            <span className="font-medium text-gray-400 text-xs mb-1 sm:hidden">Subtotal</span>
            <span className="text-lg font-bold text-blue-600">{formatPrice(item.price * item.quantity)}</span>
          </div>
          <button 
            onClick={() => removeItem(item.productId, item.variant?.value)}
            className="hidden sm:flex items-center space-x-1 text-xs text-red-400 hover:text-red-600 font-bold transition mt-2 p-1 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
