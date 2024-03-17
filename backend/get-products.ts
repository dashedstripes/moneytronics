import { getStore } from "@netlify/blobs"

interface Product {
  id: number,
  name: string,
  price: number,
}

function getTestProducts(): Product[] {
  return [
    {
      id: 1,
      name: "Test Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Test Product 2",
      price: 200,
    },
    {
      id: 3,
      name: "Test Product 3",
      price: 300,
    },
  ];
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