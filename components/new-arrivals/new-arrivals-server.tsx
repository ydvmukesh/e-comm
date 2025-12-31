import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
export async function NewArrivalsList() {
  // Simulate data fetching delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const newArrivals = [...products]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 4);

  return (
    <div className="flex -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide md:overflow-visible md:grid grid-cols-1 gap-3 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {newArrivals.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="min-w-[240px] md:min-w-auto"
        />
      ))}
    </div>
  );
}

