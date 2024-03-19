import { getProductBySlug } from "@/backend/get-products-by-slug";
import ProductPage from "@/components/ProductPage";

export default async function Page(context: any) {
  const { slug } = context.params;

  const product = await getProductBySlug({
    source: "test",
    locale: "en-US",
    slug,
  });

  if(!product) {
    return {
      notFound: true,
    }
  }

  return <ProductPage product={product} />;
}