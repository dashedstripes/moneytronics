"use client"

import { Product } from "@/backend/product";
import { useCart } from "@/utils/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
      }}
    >Add to Cart</button>
  )
}