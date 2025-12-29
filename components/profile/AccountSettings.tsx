'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordChangeSchema, type PasswordChangeInput } from '@/lib/validations/schemas';
import { Loader2, KeyRound, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordChangeInput>({
    resolver: zodResolver(passwordChangeSchema),
  });

  const onSubmit = async (data: PasswordChangeInput) => {
    setIsLoading(true);
    // Mock API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-bold text-gray-900 placeholder:font-medium";
  const labelClass = "text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2 ml-1";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
          Security Settings
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          <div className="relative">
            <label className={labelClass}>Current Password</label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                {...register('currentPassword')}
                type="password"
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
            {errors.currentPassword && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.currentPassword.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="relative">
              <label className={labelClass}>New Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  {...register('newPassword')}
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              {errors.newPassword && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.newPassword.message}</p>}
            </div>

            <div className="relative">
              <label className={labelClass}>Confirm New Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-black transition shadow-xl shadow-gray-200 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Password Updated!</span>
              </>
            ) : (
              <>
                <KeyRound className="w-5 h-5" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Advanced Settings Placeholder */}
      <div className="pt-12 border-t border-gray-100">
        <h3 className="text-lg font-black text-red-500 mb-6 flex items-center uppercase tracking-widest">
          <AlertTriangle className="w-5 h-5 mr-3" />
          Danger Zone
        </h3>
        <div className="p-8 bg-red-50 rounded-3xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-black text-gray-900">Delete Account</h4>
            <p className="text-sm text-gray-600 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <button className="bg-white text-red-500 border-2 border-red-100 px-8 py-3 rounded-xl font-bold hover:bg-red-50 transition whitespace-nowrap">
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
