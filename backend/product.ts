export interface Product {
  id: number,
  name: string,
  slug: string,
  price: number,
  imgSrc?: string,
  memberDiscount: boolean,
}

export const testProducts = [
  {
    id: 1,
    name: "Hoodie",
    slug: "hoodie",
    price: 100,
    imgSrc: "/images/hoodie.jpg",
    memberDiscount: false,
  },
  {
    id: 2,
    name: "Water Bottle",
    slug: "water-bottle",
    price: 200,
    imgSrc: "/images/water-bottle.jpg",
    memberDiscount: true,
  },
  {
    id: 3,
    name: "USB Drive",
    slug: "usb-drive",
    price: 300,
    imgSrc: "/images/usb-drive.jpg",
    memberDiscount: false,
  },
]