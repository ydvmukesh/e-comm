'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CheckoutInput } from '@/lib/validations/schemas';

interface ShippingFormProps {
  register: UseFormRegister<CheckoutInput>;
  errors: FieldErrors<CheckoutInput>;
}

export default function ShippingForm({ register, errors }: ShippingFormProps) {
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-semibold text-gray-900 placeholder:font-medium";
  const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1 ml-1";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Full Name</label>
          <input 
            {...register('shippingAddress.name')}
            placeholder="E.g. John Doe"
            className={inputClass}
          />
          {errors.shippingAddress?.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shippingAddress.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input 
            {...register('shippingAddress.phone')}
            placeholder="E.g. +1 234 567 890"
            className={inputClass}
          />
          {errors.shippingAddress?.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shippingAddress.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Address Line 1</label>
        <input 
          {...register('shippingAddress.addressLine1')}
          placeholder="Street address, P.O. box, company name"
          className={inputClass}
        />
        {errors.shippingAddress?.addressLine1 && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shippingAddress.addressLine1.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={labelClass}>City</label>
          <input 
            {...register('shippingAddress.city')}
            placeholder="New York"
            className={inputClass}
          />
          {errors.shippingAddress?.city && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shippingAddress.city.message}</p>}
        </div>
        <div>
          <label className={labelClass}>State / Province</label>
          <input 
            {...register('shippingAddress.state')}
            placeholder="NY"
            className={inputClass}
          />
          {errors.shippingAddress?.state && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shippingAddress.state.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Zip Code</label>
          <input 
            {...register('shippingAddress.zipCode')}
            placeholder="10001"
            className={inputClass}
          />
          {errors.shippingAddress?.zipCode && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shippingAddress.zipCode.message}</p>}
        </div>
      </div>

      <input type="hidden" {...register('shippingAddress.country')} value="USA" />
      <input type="hidden" {...register('shippingAddress.type')} value="home" />

      <label className="flex items-center space-x-3 cursor-pointer group pt-4">
        <input 
          type="checkbox" 
          {...register('saveAddress')} 
          className="w-5 h-5 rounded-lg border-gray-200 text-blue-500 focus:ring-blue-500 cursor-pointer" 
        />
        <span className="text-sm font-bold text-gray-600 transition group-hover:text-blue-600">Save address to profile for future orders</span>
      </label>
    </div>
  );
}
