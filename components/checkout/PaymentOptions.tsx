'use client';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CheckoutInput } from '@/lib/validations/schemas';
import { CreditCard, Wallet, Truck, Info } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PaymentOptionsProps {
  register: UseFormRegister<CheckoutInput>;
  watch: UseFormWatch<CheckoutInput>;
}

export default function PaymentOptions({ register, watch }: PaymentOptionsProps) {
  const selectedPayment = watch('paymentMethod');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* COD Option */}
        <label className={cn(
          "relative flex flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all",
          selectedPayment === 'cod' ? "border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20" : "border-gray-100 hover:border-gray-200"
        )}>
          <input 
            type="radio" 
            value="cod" 
            {...register('paymentMethod')} 
            className="absolute top-4 right-4 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <div className="flex flex-col h-full">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 transition-transform hover:scale-110">
              <Truck className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1">Cash on Delivery</h3>
            <p className="text-xs text-gray-500 font-medium">Pay securely in cash when your order reaches your doorstep.</p>
          </div>
        </label>

        {/* Prepaid Option */}
        <label className={cn(
          "relative flex flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all",
          selectedPayment === 'prepaid' ? "border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20" : "border-gray-100 hover:border-gray-200"
        )}>
          <input 
            type="radio" 
            value="prepaid" 
            {...register('paymentMethod')} 
            className="absolute top-4 right-4 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <div className="flex flex-col h-full">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 transition-transform hover:scale-110">
              <CreditCard className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1">Prepaid / Online</h3>
            <p className="text-xs text-gray-500 font-medium italic">Integrated gateway coming soon. Secure encrypted payments.</p>
          </div>
        </label>
      </div>

      {selectedPayment === 'cod' && (
        <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-xl border border-yellow-100 animate-in fade-in slide-in-from-top-2 duration-400">
          <Info className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
          <p className="text-xs font-bold text-yellow-700 leading-relaxed">
            Note: For Cash on Delivery, please ensure someone is available at the address with the exact amount. 
            Delivery partner will verify the order before collection.
          </p>
        </div>
      )}
    </div>
  );
}
