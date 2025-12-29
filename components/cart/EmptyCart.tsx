'use client';

import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 bg-blue-50 rounded-full animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag className="w-16 h-16 text-blue-500 opacity-20" />
        </div>
      </div>
      
      <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
      <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed">
        Looks like you haven't added anything to your cart yet. 
        Start exploring our amazing collection of premium accessories!
      </p>
      
      <Link 
        href="/products" 
        className="inline-flex items-center space-x-3 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 hover:shadow-gray-300 transform active:scale-[0.98]"
      >
        <span>Start Shopping</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
