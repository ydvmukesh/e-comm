import { products } from "@/lib/mock-data";
import { NewArrivalsClient } from "./new-arrivals-client";

export async function NewArrivalsList() {
  // Simulate data fetching delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const newArrivals = [...products]
    .sort((a, b) => Number(b.id) - Number(a.id))
    // .slice(0, 8); // Fetch a few more in case we need them for desktop carousel

  // Pass data down to a client component that will decide layout
  return <NewArrivalsClient newArrivals={newArrivals} />;
}