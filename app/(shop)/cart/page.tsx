'use client';

import { useCartStore } from '@/lib/store/cartStore';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, subtotal, shipping, tax, discount, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shopping Cart' }]} />
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shopping Cart' }]} />
      
      <div className="flex items-center justify-between my-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        <p className="text-gray-500 font-medium">{items.length} items</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden sm:grid grid-cols-6 gap-4 pb-4 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
            <div className="col-span-3">Product Details</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Price</div>
            <div className="text-right">Total</div>
          </div>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={`${item.productId}-${item.variant?.value || 'default'}`} item={item} />
            ))}
          </div>
          <div className="pt-6 border-t border-gray-100">
            <Link href="/products" className="inline-flex items-center space-x-2 text-blue-500 font-semibold hover:text-blue-600 transition">
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-1">
          <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} discount={discount} total={total} />
        </div>
      </div>
    </div>
  );
}
