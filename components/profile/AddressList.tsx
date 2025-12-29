'use client';

import { useState } from 'react';
import type { Address } from '@/types';
import { MapPin, Plus, Trash2, Edit3, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AddressListProps {
  addresses: Address[];
}

export default function AddressList({ addresses }: AddressListProps) {
  const [addressList, setAddressList] = useState<Address[]>(addresses);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-gray-900">Address Book</h2>
        <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-500/20 text-sm">
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      {addressList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addressList.map((address) => (
            <div 
              key={address.id} 
              className={cn(
                "relative p-6 rounded-2xl border-2 transition-all group",
                address.isDefault ? "border-blue-500 bg-blue-50/30" : "border-gray-50 hover:border-gray-200 bg-white"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                    address.isDefault ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
                  )}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px]">{address.type} address</h3>
                    <p className="font-bold text-gray-900 text-sm">{address.name}</p>
                  </div>
                </div>
                {address.isDefault && (
                  <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Default
                  </span>
                )}
              </div>

              <div className="space-y-1 text-sm text-gray-500 mb-6 font-medium">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                <p className="pt-2 text-gray-900">Phone: {address.phone}</p>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-100/50">
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 transition border border-gray-100">
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-bold text-red-400 hover:bg-red-50 hover:text-red-500 transition border border-red-50">
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
          <MapPin className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold">No addresses found in your book.</p>
          <button className="text-blue-500 text-sm font-bold mt-2 hover:underline">Add your first address</button>
        </div>
      )}
    </div>
  );
}
