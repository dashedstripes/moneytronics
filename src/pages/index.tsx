import Nav from "@/components/Nav";
import { useAuth } from "@/utils/AuthContext";
import { useEffect, useState } from "react";
import { getProducts } from "../../backend/get-products";
import Currency from "@/components/Currency";
import Link from "next/link";

export default function Home({ products }: { products: any[] }) {
  const { confirm, user } = useAuth();
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

      <div className="grid md:grid-cols-3 gap-8">
        {products?.map((product) => (
          <Link href={`/products/${product.slug}`} key={product.id} className="shadow-xl rounded-xl">
            <img src={`/.netlify/images?url=${product?.imgSrc}&q=30`} alt={product.name} className="rounded-t-xl"/>
            <div className="flex justify-between p-8">
              <h2 className="font-bold text-xl">{product.name}</h2>

              <p>
                {product.memberDiscount && user ? (
                  <>
                    <span className="text-red-500 line-through"><Currency/>{product.price}</span>{" "}
                    <Currency/>
                    {product.price * 0.9}
                  </>
                ) : (
                  <>
                  <Currency/>
                  {product.price}
                  </>
                )}
              </p>
            </div>
          </Link>
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

  context.res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");

  return {
    props: {
      products: products || [],
    },
  };
}