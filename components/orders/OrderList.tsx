'use client';

import { useState } from 'react';
import OrderCard from './OrderCard';
import { Search, Filter, PackageOpen } from 'lucide-react';

export default function OrderList() {
  // Mock data for orders
  const mockOrders = [
    {
      id: 'ord_1',
      orderNumber: 'ES-123456',
      createdAt: new Date('2025-12-25'),
      total: 249.99,
      status: 'delivered',
      items: [
        { name: 'AirPods Pro Premium', quantity: 1, image: '' }
      ]
    },
    {
      id: 'ord_2',
      orderNumber: 'ES-123457',
      createdAt: new Date('2025-12-27'),
      total: 349.99,
      status: 'processing',
      items: [
        { name: 'SoundMax Headphones', quantity: 1, image: '' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            placeholder="Search by Order ID or Product Name..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm font-bold placeholder:font-medium"
          />
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition text-sm">
            <Filter className="w-4 h-4" />
            <span>Last 3 Months</span>
          </button>
        </div>
      </div>

      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackageOpen className="w-10 h-10 text-blue-500 opacity-30" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500 font-medium max-w-xs mx-auto mb-8">
            You haven't placed any orders yet. Once you do, they'll appear here.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition">
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
}
