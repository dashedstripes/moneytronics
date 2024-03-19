import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import CartNav from "./CartNav";
import { useCart } from "@/utils/CartContext";

export default function Nav() {
  const { totalCartItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between py-12 items-center flex-wrap">
      <div className="flex gap-8 mb-8 md:mb-0">
        <Link href="/">
          <img src="/images/logo.svg" alt="logo" className="w-40" />
        </Link>

        <Link href="/">
          shop
        </Link>

        <Link href="/blog">
          blog
        </Link>
      </div>

      <div className="flex gap-4 items-end">
        <CartNav itemCount={totalCartItems} />
        {user ? (
          <>
            <Link href="/profile">profile</Link>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <Link href="/login">login</Link>
        )}

        <div className="ml-4">
          <LanguageSelector/>
        </div>
      </div>
    </nav>
  );
}