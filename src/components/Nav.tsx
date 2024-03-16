import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-between p-8">
      <Link href="/">moneytronics</Link>

      <Link href="/login">login</Link>
    </nav>
  );
}