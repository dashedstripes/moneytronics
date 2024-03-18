import { Product, testProducts } from "./product";

function getTestProductBySlug(slug: string): Product | null {
  return testProducts.find((product) => product.slug === slug) || null;
}
export async function getProductBySlug(
  params: { 
    source: string,
    locale: string,
    slug: string,
  }): Promise<Product | null> {
  switch(params.source) {
    case "test":
      return getTestProductBySlug(params.slug);
    default:
      return null;
  }
}