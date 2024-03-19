import { getProducts } from '@/backend/get-products';
import Home from '@/components/HomePage';
import { cookies } from 'next/headers'

export default async function Page() {
  const products = await getProducts({
    source: "test",
    locale: "en-US",
  });

  const splitBucket = cookies().get("test_bucket") || "a";
  
  return <Home products={products} splitBucket={splitBucket as string} />;
}