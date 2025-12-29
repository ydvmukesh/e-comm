'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileUpdateSchema, type ProfileUpdateInput } from '@/lib/validations/schemas';
import { useAuthStore } from '@/lib/store/authStore';
import { Loader2, Save, User as UserIcon, Mail, Phone } from 'lucide-react';
import type { User } from '@/types';

interface ProfileInfoProps {
  user: User | null;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    },
  });

  const onSubmit = async (data: ProfileUpdateInput) => {
    setIsLoading(true);
    // Mock API call
    await new Promise((r) => setTimeout(r, 1000));
    updateUser(data);
    setIsLoading(false);
    alert('Profile updated successfully!');
  };

  const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm font-bold text-gray-900 placeholder:font-medium";
  const labelClass = "text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2 ml-1";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        {/* Full Name */}
        <div className="relative">
          <label className={labelClass}>Full Name</label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              {...register('name')}
              placeholder="Your Full Name"
              className={inputClass}
            />
          </div>
          {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.name.message}</p>}
        </div>

        {/* Email Address */}
        <div className="relative">
          <label className={labelClass}>Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              {...register('email')}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="relative">
          <label className={labelClass}>Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              {...register('phone')}
              placeholder="+1 234 567 890"
              className={inputClass}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.phone.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-black transition shadow-xl shadow-gray-200 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
