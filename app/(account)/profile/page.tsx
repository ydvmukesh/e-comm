'use client';

import { useAuthStore } from '@/lib/store/authStore';
import ProfileInfo from '@/components/profile/ProfileInfo';
import AddressList from '@/components/profile/AddressList';
import AccountSettings from '@/components/profile/AccountSettings';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { User, MapPin, Settings, LogOut, Package } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') as 'profile' | 'addresses' | 'settings' || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'My Account' }]} />
      <div className="mt-8 mb-12 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-black">{user?.name.charAt(0)}</div>
          <div><h1 className="text-3xl font-black text-gray-900">{user?.name}</h1><p className="text-gray-500 font-medium">{user?.email}</p></div>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => router.push('/orders')} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2"><Package className="w-5 h-5" /><span>Orders</span></button>
          <button onClick={() => { logout(); router.push('/'); }} className="text-red-500 border-2 border-red-50 px-6 py-3 rounded-xl font-bold flex items-center space-x-2"><LogOut className="w-5 h-5" /><span>Logout</span></button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-2">
          {['profile', 'addresses', 'settings'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={cn("w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all text-left uppercase text-xs tracking-widest", activeTab === tab ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-gray-500 hover:bg-gray-50")}>
              <span>{tab}</span>
            </button>
          ))}
        </aside>
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[500px]">
          {activeTab === 'profile' && <ProfileInfo user={user} />}
          {activeTab === 'addresses' && <AddressList addresses={user?.addresses || []} />}
          {activeTab === 'settings' && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}
