'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { Maximize2, ShoppingCart } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 mx-auto mb-4 opacity-10" />
            <p className="text-lg">Product Image Display Case</p>
          </div>
        </div>
        
        {/* Placeholder for real images when they are available */}
        {/* <Image 
          src={images[activeImage]} 
          alt="Product image" 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        /> */}

        <button className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition opacity-0 group-hover:opacity-100">
          <Maximize2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                activeImage === index ? "border-blue-500 ring-2 ring-blue-500/20" : "border-transparent hover:border-gray-200"
              )}
            >
              <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
