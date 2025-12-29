'use client';

import { Package, Truck, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils/cn';
import { cn } from '@/lib/utils/cn';

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  const statusStyles = {
    delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    processing: "bg-blue-50 text-blue-600 border-blue-100",
    cancelled: "bg-red-50 text-red-600 border-red-100",
    pending: "bg-yellow-50 text-yellow-600 border-yellow-100"
  };

  const statusIcons = {
    delivered: CheckCircle2,
    processing: Truck,
    cancelled: Package,
    pending: Package
  };

  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Package;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition group overflow-hidden">
      {/* Card Header */}
      <div className="p-6 md:p-8 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
            <ShoppingBag className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</p>
            <p className="font-black text-gray-900">#{order.orderNumber}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Amount</p>
            <p className="font-black text-blue-600">{formatPrice(order.total)}</p>
          </div>
          
          <div className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all",
            statusStyles[order.status as keyof typeof statusStyles]
          )}>
            <StatusIcon className="w-4 h-4" />
            <span>{order.status}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8">
        <div className="flex items-center space-x-4">
           {/* Item Preview (Mini) */}
           <div className="flex -space-x-3 overflow-hidden">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="w-12 h-12 bg-gray-100 rounded-xl border-2 border-white flex items-center justify-center text-gray-300">
                   <ShoppingBag className="w-6 h-6 opacity-30" />
                </div>
              ))}
           </div>
           
           <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">
                {order.items[0].name} {order.items.length > 1 ? `and ${order.items.length - 1} other items` : ''}
              </p>
              <p className="text-xs font-medium text-gray-500">Ordered on {order.createdAt.toLocaleDateString()}</p>
           </div>

           <button className="hidden sm:flex items-center space-x-2 text-blue-500 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition text-sm">
             <span>View Details</span>
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>
        
        {/* Mobile View Details Button */}
        <button className="w-full mt-6 py-3 border-2 border-gray-50 rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 md:hidden flex items-center justify-center space-x-2">
           <span>Order Details</span>
           <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
