
import Nav from "@/components/Nav";
import GoTrue from "gotrue-js";
import { useEffect, useState } from "react";

export default function Home() {
  const [loginConfirmation, setLoginConfirmation] = useState<boolean>(false);

  useEffect(() => {
    if (window.location.hash.includes("#confirmation_token")) {
      const token = window.location.hash.split("=")[1];
      validateConfirmationToken(token);
    }
  }, []);

  const validateConfirmationToken = (token: string) => {
    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    auth
      .confirm(token, true)
      .then((response) => {
        console.log('Confirmation email sent', JSON.stringify({ response }));
        setLoginConfirmation(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="container mx-auto px-8">
      {loginConfirmation && <p className="text-green-500 mt-4">You have successfully logged in!</p>}
      <Nav />
      <h1>Home</h1>
    </main>
  );
}
