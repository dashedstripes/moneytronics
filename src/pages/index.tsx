import Nav from "@/components/Nav";
import { useAuth } from "@/utils/AuthContext";
import { useEffect, useState } from "react";
import { getProducts } from "../../backend/get-products";
import Currency from "@/components/Currency";

export default function Home({ products }: { products: any[] }) {
  const { confirm } = useAuth();
  const [loginConfirmation, setLoginConfirmation] = useState<boolean>(false);
  const [confirmationPending, setConfirmationPending] = useState<boolean>(false);

  useEffect(() => {
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

    if (window.location.hash.includes("#confirmation_token")) {
      setConfirmationPending(true);
      const token = window.location.hash.split("=")[1];
      validateConfirmationToken(token);
    }
  }, [confirm]);

  return (
    <main className="container mx-auto px-8">
      {confirmationPending && <p className="text-blue-500 mt-4">Validating sign up...</p>}
      {loginConfirmation && <p className="text-green-500 mt-4">You have successfully logged in!</p>}
      
      <Nav />

      <div className="grid grid-cols-3 gap-8">
        {products?.map((product) => (
          <div key={product.id} className="border p-8">
            <h2 className="font-bold text-xl">{product.name}</h2>
            <div className="flex justify-end">
              <p><Currency/>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const products = await getProducts({ 
    source: "test",
    locale: context.locale,
  });

  return {
    props: {
      products: products || [],
    },
  };
}