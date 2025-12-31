// app/products/page.tsx
import ProductsProductsListPagePage from "@/components/products-page/page";

export default async function ProductsPage() {
  // simulate server fetch
  await new Promise((r) => setTimeout(r, 1500))

  return <ProductsProductsListPagePage />
}
