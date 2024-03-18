import Currency from "@/components/Currency";
import Nav from "@/components/Nav";
import { useCart } from "@/utils/CartContext";

export default function Cart() {
  const { cartItems, totalCartPrice } = useCart();

  return (
    <main className="container mx-auto px-8">
      <Nav />
      <div className="mx-auto max-w-[75ch]">
        <h2 className="font-bold text-3xl mb-8">Your Cart</h2>
        <div className="">
          {cartItems.map((item) => (
            <div key={item.id} className="py-4 flex justify-between">
              <span>{item.name}</span><span><Currency />{item.price}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end py-8">
          <h3 className="font-bold text-2xl">Total: <Currency />{totalCartPrice}</h3>
        </div>
      </div>
    </main>
  );
}