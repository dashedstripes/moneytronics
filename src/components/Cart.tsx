import { useCart } from "@/utils/CartContext";

export default function Cart() {
  const { cartItems } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <p>Total: {total}</p>
    </div>
  );
}