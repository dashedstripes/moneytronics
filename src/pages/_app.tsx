import "@/styles/globals.css";
import { AuthProvider } from "@/utils/AuthContext";
import { CartProvider } from "@/utils/CartContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
