import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between py-8">
      <Link href="/">moneytronics</Link>

      {user ? (
        <div className="flex gap-4">
          <Link href="/profile">profile</Link>
          <button onClick={() => logout()}>logout</button>
        </div>
      ) : (
        <Link href="/login">login</Link>
      )}
    </nav>
  );
}