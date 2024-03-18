import Currency from "@/components/Currency";
import Nav from "@/components/Nav";
import { useCart } from "@/utils/CartContext";

export default function Cart() {
  const { cartItems, totalCartItems, totalCartPrice, removeFromCart } = useCart();

  return (
    <main className="container mx-auto px-8">
      <Nav />
      <div className="mx-auto max-w-[75ch] pt-8">
        <div className="flex justify-between items-center border-b">
          <h2 className="font-bold text-3xl mb-8">Your Cart</h2>
          <p className="text-xl">{totalCartItems} items</p>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className="py-4 grid grid-cols-2 items-center">
            <div>
              <span className="font-bold">{item.name}</span>
              <button onClick={() => removeFromCart(item.id)} className="block underline">Remove</button>
            </div>
            <div className="flex justify-end gap-4">
              <span><Currency />{item.price}</span>
            </div>
          </div>
        ))}
        <div className="py-4 grid grid-cols-2 border-t">
          <span></span>
          <h3 className="font-bold text-2xl text-right"><Currency />{totalCartPrice}</h3>
        </div>
      </div>
    </main>
  );
}