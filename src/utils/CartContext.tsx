import React, { createContext, use, useContext, useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  totalCartItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
} 

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  totalCartItems: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    setTotalCartItems(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  } , [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, totalCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};