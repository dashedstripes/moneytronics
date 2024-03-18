import Currency from "@/components/Currency";
import Nav from "@/components/Nav";
import { useCart } from "@/utils/CartContext";

export default function Cart() {
  const { cartItems, totalCartItems, totalCartPrice, removeFromCart } = useCart();

  return (
    <main className="container mx-auto px-8">
      <Nav />
      <div className="mx-auto max-w-[75ch]">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl mb-8">Your Cart</h2>
          <p className="text-xl">{totalCartItems} items</p>
        </div>
        <div className="py-4 grid grid-cols-3 border-b">
          <span>Item</span>
          <span>Price</span>
          <span></span>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className="py-4 grid grid-cols-3">
            <div>{item.name}</div>
            <div><Currency />{item.price}</div>
            <p onClick={() => removeFromCart(item.id)} className="underline">Remove</p>
          </div>
        ))}
        <div className="py-4 grid grid-cols-3 border-t">
          <span></span>
          <h3 className="font-bold text-2xl"><Currency />{totalCartPrice}</h3>
          <span></span>
        </div>
      </div>
    </main>
  );
}