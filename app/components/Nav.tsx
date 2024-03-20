import Link from "next/link";
import CartNav from "./CartNav";
import LanguageSelector from "./LanguageSelector";
import UserNav from "./UserNav";

export default function Nav({ locale }: { locale: string }) {
  return (
    <nav className="flex justify-between py-12 items-center flex-wrap px-8">
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
        <CartNav />
        <UserNav/>

        <div className="ml-4">
          <LanguageSelector locale={locale}/>
        </div>
      </div>
    </nav>
  );
}