'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutInput } from '@/lib/validations/schemas';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  const { register, handleSubmit, trigger, formState: { errors }, watch } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'cod' }
  });

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['shippingAddress'];
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setStep(step + 1);
  };

  const onSubmit = async (data: CheckoutInput) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsOrdered(true);
    clearCart();
  };

  if (items.length === 0 && !isOrdered) {
    router.push('/cart');
    return null;
  }

  if (isOrdered) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8 animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900">Order Placed!</h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">Your order is being processed. Thank you!</p>
        <div className="pt-4 space-x-4">
          <button onClick={() => router.push('/orders')} className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition shadow-xl">My Orders</button>
          <button onClick={() => router.push('/')} className="bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition">Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <div className="mt-8 mb-12"><CheckoutSteps currentStep={step} /></div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          {step === 1 && <ShippingForm register={register} errors={errors} />}
          {step === 2 && <PaymentOptions register={register} watch={watch} />}
          {step === 3 && <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>}
          <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-12">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="text-gray-500 font-bold">Back</button>}
            <button type={step === 3 ? "submit" : "button"} onClick={step < 3 ? nextStep : undefined} className="bg-blue-500 text-white px-10 py-4 rounded-xl font-bold flex items-center space-x-2">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>{step === 3 ? 'Place Order' : 'Continue'}</span>}
            </button>
          </div>
        </div>
        <div className="lg:col-span-1"><OrderSummary /></div>
      </form>
    </div>
  );
}
