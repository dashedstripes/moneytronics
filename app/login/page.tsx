import Nav from "@/components/Nav";
import LoginPage from "../components/LoginPage";
import { cookies } from "next/headers";

export default async function Page() {
  const locale = cookies().get("locale") || "en-US";
  return (
    <div>
      <Nav locale={locale as string}/>
      <LoginPage/>
    </div>
  );
}