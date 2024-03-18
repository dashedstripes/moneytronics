import { getStore } from "@netlify/blobs"

interface Product {
  id: number,
  name: string,
  price: number,
  imgSrc?: string,
  memberDiscount: boolean,
}

function getTestProducts(): Product[] {
  return [
    {
      id: 1,
      name: "Hoodie",
      price: 100,
      imgSrc: "/images/hoodie.jpg",
      memberDiscount: false,
    },
    {
      id: 2,
      name: "Water Bottle",
      price: 200,
      imgSrc: "/images/water-bottle.jpg",
      memberDiscount: true,
    },
    {
      id: 3,
      name: "USB Drive",
      price: 300,
      imgSrc: "/images/usb-drive.jpg",
      memberDiscount: false,
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