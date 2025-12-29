'use client';

import { products } from '@/data/products';
import ImageGallery from '@/components/product/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.category, href: `/products?category=${product.category.toLowerCase()}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column: Image Gallery */}
        <ImageGallery images={product.images} />

        {/* Right Column: Product Info */}
        <ProductInfo product={product} />
      </div>

      {/* Product Details Tabs (Description, Specs, Reviews) */}
      <div className="mb-16">
        <ProductTabs product={product} />
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
        <RelatedProducts currentProduct={product} allProducts={products} />
      </section>
    </div>
  );
}
