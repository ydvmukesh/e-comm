import { products } from "@/lib/mock-data";
import { FeaturedProductsClient } from "./featured-products-client";

export async function FeaturedProductsList() {
  // Simulate data fetching delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const featuredProducts = products
    .filter((p) => p.featured)
    // .slice(0, 8); // Fetch up to 8 in case carousel needs more

  return <FeaturedProductsClient featuredProducts={featuredProducts} />;
}