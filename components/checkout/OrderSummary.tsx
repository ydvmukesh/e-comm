'use client';

import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils/cn';
import { ShoppingCart, ShieldCheck } from 'lucide-react';

export default function OrderSummary() {
  const { items, subtotal, shipping, tax, discount, total } = useCartStore();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sticky top-24">
      <h2 className="text-xl font-black text-gray-900 mb-8 border-b border-gray-50 pb-4 flex items-center">
        <ShoppingCart className="w-6 h-6 mr-3 text-blue-500" />
        Order Summary
      </h2>

      {/* Items Preview */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide mb-8">
        {items.map((item) => (
          <div key={`${item.productId}-${item.variant?.value}`} className="flex items-center justify-between group">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-1 border border-gray-100 relative">
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {item.quantity}
                </span>
                <ShoppingCart className="w-6 h-6 text-gray-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900 group-hover:text-blue-500 transition line-clamp-1">{item.name}</span>
                <span className="text-[10px] text-gray-500 font-medium uppercase">{item.variant?.value || 'Standard'}</span>
              </div>
            </div>
            <span className="text-xs font-black text-gray-900">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 mt-6 border-t border-gray-50">
        <div className="flex justify-between text-sm text-gray-500 font-bold uppercase tracking-wider">
          <span>Subtotal</span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm text-red-500 font-bold uppercase tracking-wider">
            <span>Discount Applied</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-500 font-bold uppercase tracking-wider">
          <span>Shipping</span>
          <span className="text-gray-900">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-500 font-bold uppercase tracking-wider">
          <span>Tax</span>
          <span className="text-gray-900">{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between text-xl font-black text-gray-900 pt-6 border-t-2 border-dashed border-gray-100">
          <span>Total</span>
          <span className="text-blue-600">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center space-x-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 py-3 rounded-xl border border-gray-100">
        <ShieldCheck className="w-3 h-3 text-emerald-500" />
        <span>SSL Encrypted Transaction</span>
      </div>
    </div>
  );
}
