'use client';

import { useAuthStore } from '@/lib/store/authStore';
import OrderList from '@/components/orders/OrderList';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'My Account', href: '/profile' }, { label: 'Order History' }]} />
      
      <div className="mt-8 mb-12">
        <h1 className="text-3xl font-black text-gray-900">Order History</h1>
        <p className="text-gray-500 font-medium">View and track your previous orders</p>
      </div>

      <OrderList />
    </div>
  );
}
