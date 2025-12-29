import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

export default function RelatedProducts({ currentProduct, allProducts }: RelatedProductsProps) {
  // Simple logic: get products in the same category, excluding the current one
  const related = allProducts
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  // If not enough in same category, get some others
  if (related.length < 4) {
    const others = allProducts
      .filter((p) => p.category !== currentProduct.category && p.id !== currentProduct.id)
      .slice(0, 4 - related.length);
    related.push(...others);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {related.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
