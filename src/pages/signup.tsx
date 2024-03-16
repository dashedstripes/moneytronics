import Nav from "@/components/Nav";
import GoTrue from "gotrue-js";
import Link from "next/link";
import { useState } from "react";


export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);;

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    auth
    .signup(email, password)
    .then(() => {
      setConfirmationSent(true);
      (event.target as HTMLFormElement).reset();
    })
    .catch(() => setError("Unable to sign up, please try again later."));
  }
  
  return (
    <main className="container mx-auto px-8">
      <Nav />

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Sign up for Moneytronics</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input type="password" id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded-md"/>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign up</button>
        <p className="mt-4">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {confirmationSent && <p className="text-green-500 mt-4">Confirmation email sent, please check your email.</p>}
      </form>

    </main>
  );
}

