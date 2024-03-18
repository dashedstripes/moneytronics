import Nav from "@/components/Nav";
import { useCart } from "@/utils/CartContext";

export default function Cart() {
  const { cartItems, totalCartPrice } = useCart();

  return (
    <main className="container mx-auto px-8">
      <Nav/>
      <h2 className="font-bold text-3xl">Your Cart</h2>
      <div>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </div>
      <p>Total: {totalCartPrice}</p>
    </main>
  );
}