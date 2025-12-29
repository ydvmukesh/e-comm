'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { Ticket, X, Loader2 } from 'lucide-react';

export default function CouponInput() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { applyCoupon, removeCoupon, couponCode } = useCartStore();

  const handleApply = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    // Mimic API latency
    await new Promise(r => setTimeout(r, 800));
    applyCoupon(code);
    setIsLoading(false);
    setCode('');
  };

  if (couponCode) {
    return (
      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-3 rounded-xl transition animate-in fade-in zoom-in-95">
        <div className="flex items-center text-emerald-700">
          <Ticket className="w-5 h-5 mr-3" />
          <span className="font-bold tracking-widest text-sm uppercase">{couponCode}</span>
          <span className="ml-2 text-xs font-semibold opacity-75">applied</span>
        </div>
        <button 
          onClick={removeCoupon}
          className="p-1 hover:bg-emerald-100 rounded-full text-emerald-500 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Apply Promo Code</label>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="E.g. SAVE10"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-bold placeholder:font-medium uppercase tracking-widest"
          />
          <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button
          onClick={handleApply}
          disabled={isLoading || !code}
          className="bg-gray-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-black transition disabled:opacity-50 flex items-center justify-center min-w-[80px]"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
        </button>
      </div>
    </div>
  );
}
