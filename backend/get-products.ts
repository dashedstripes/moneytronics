import { getStore } from "@netlify/blobs"
import { Product, testProducts } from "./product";

function getTestProducts(): Product[] {
  return testProducts;
}

async function getProductsFromBlob(): Promise<Product[]> {
  const store = getStore("products");
  const products = await store.list();
  return products.blobs as unknown as Product[] || [];
}

export async function getProducts(
  params: { 
    source: string,
    locale: string,
  }): Promise<Product[]> {
  switch(params.source) {
    case "test":
      return getTestProducts();
    case "blob":
      return await getProductsFromBlob();
    default:
      return [];
  }
}