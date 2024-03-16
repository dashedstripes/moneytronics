
import Nav from "@/components/Nav";
import { useAuth } from "@/utils/AuthContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { confirm } = useAuth();
  const [loginConfirmation, setLoginConfirmation] = useState<boolean>(false);
  const [confirmationPending, setConfirmationPending] = useState<boolean>(false);

  useEffect(() => {
    if (window.location.hash.includes("#confirmation_token")) {
      setConfirmationPending(true);
      const token = window.location.hash.split("=")[1];
      validateConfirmationToken(token);
    }
  }, []);

  const validateConfirmationToken = async (token: string) => {
    try {
      await confirm(token);
      setLoginConfirmation(true);
      setConfirmationPending(false);
    } catch (error) {
      console.log(error);
      setConfirmationPending(false);
    }
  };

  return (
    <main className="container mx-auto px-8">
      {confirmationPending && <p className="text-blue-500 mt-4">Validating sign up...</p>}
      {loginConfirmation && <p className="text-green-500 mt-4">You have successfully logged in!</p>}
      <Nav />
      <h1>Home</h1>
    </main>
  );
}
