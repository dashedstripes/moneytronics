import { getStore } from "@netlify/blobs"

interface Product {
  id: number,
  name: string,
  price: number,
  imgSrc?: string,
}

function getTestProducts(): Product[] {
  return [
    {
      id: 1,
      name: "Hoodie",
      price: 100,
      imgSrc: "/images/hoodie.jpg"
    },
    {
      id: 2,
      name: "Water Bottle",
      price: 200,
      imgSrc: "/images/water-bottle.jpg"
    },
    {
      id: 3,
      name: "USB Drive",
      price: 300,
      imgSrc: "/images/usb-drive.jpg"
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