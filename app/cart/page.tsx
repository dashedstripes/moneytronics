import CartPage from "@/components/CartPage";
import Nav from "@/components/Nav";
import { cookies } from "next/headers";

export default async function Page() {
  const locale = cookies().get("locale") || "en-US";

  return (
    <div>
      <Nav locale={locale as string}/>
      <CartPage/>
    </div>
  );
}