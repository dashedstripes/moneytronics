"use client"

import Nav from "@/components/Nav";
import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const { login, authLoading, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const { email, password } = event.currentTarget.elements as any;

    try {
      await login(email.value, password.value);
      setSuccess(true);
    } catch {
      setError("Login failed.");
    }
  };

  return (
    <main className="container mx-auto px-8">
      <Nav />

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login to Moneytronics</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input type="password" id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded-md"/>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">{authLoading ? "Logging in..." : "Login"}</button>
        <p className="mt-4">
          Don&apos;t have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">You are now logged in.</p>}
      </form>
    </main>
  );
}

