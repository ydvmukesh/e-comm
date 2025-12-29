'use client';

import { formatPrice } from '@/lib/utils/cn';
import { SecurityBadge } from '@/components/ui/Badges'; // We'll create this or use icons
import { ShieldCheck, ArrowRight, Ticket } from 'lucide-react';
import CouponInput from './CouponInput';
import Link from 'next/link';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export default function CartSummary({ subtotal, shipping, tax, discount, total }: CartSummaryProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sticky top-24 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-50 pb-4">Order Summary</h2>

      <div className="space-y-4">
        {/* Coupon Section */}
        <CouponInput />

        <div className="space-y-3 pt-4">
          <div className="flex justify-between text-gray-600 font-medium">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-red-500 font-medium bg-red-50 p-2 rounded-lg">
              <span className="flex items-center"><Ticket className="w-4 h-4 mr-2" /> Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600 font-medium">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
          </div>

          <div className="flex justify-between text-gray-600 font-medium">
            <span>Estimated Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-100 pt-6 mt-6">
          <div className="flex justify-between text-2xl font-black text-gray-900">
            <span>Total</span>
            <span className="text-blue-600">{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">VAT included where applicable</p>
        </div>
      </div>

      <Link 
        href="/checkout"
        className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center group hover:bg-blue-600 transition shadow-lg shadow-blue-500/20 active:scale-[0.98]"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>

      <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs pt-4">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span className="font-semibold uppercase tracking-widest text-[10px]">Secure Checkout Protected</span>
      </div>
    </div>
  );
}
