'use client';

import { useState } from 'react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils/cn';
import { Star, CheckCircle } from 'lucide-react';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-100 overflow-x-auto">
        {(['description', 'specifications', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-5 text-sm font-bold uppercase tracking-wider transition-all relative flex-shrink-0",
              activeTab === tab 
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30" 
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'description' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-gray-900">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features?.map((feature, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-gray-600 leading-relaxed">
                {product.description}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra 
                ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-400">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b border-gray-50 pb-2">
                  <span className="w-1/3 text-gray-500 font-medium">{key}</span>
                  <span className="w-2/3 text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Review Summary */}
              <div className="bg-gray-50 p-6 rounded-xl w-full md:w-64 text-center">
                <span className="text-5xl font-extrabold text-gray-900">{product.rating}</span>
                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={cn("w-5 h-5", star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">Based on {product.reviewCount} reviews</p>
              </div>

              {/* Mock Reviews List */}
              <div className="flex-1 space-y-6 w-full">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          JD
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Satisfied Customer</h4>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">October 1{i}, 2025</span>
                    </div>
                    <p className="text-gray-600 text-sm italic">
                      "Absolutely fantastic product! Exceeded my expectations in every way. The quality is top-notch 
                      and it was worth every penny. Highly recommend to anyone looking for premium audio."
                    </p>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-blue-500 hover:border-blue-200 transition font-medium">
                  Write a Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
