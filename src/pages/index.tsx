import Nav from "@/components/Nav";
import { useAuth } from "@/utils/AuthContext";
import { useEffect, useState } from "react";
import { getProducts } from "../../backend/get-products";
import Currency from "@/components/Currency";
import Link from "next/link";
import { useCart } from "@/utils/CartContext";
import { Product } from "../../backend/product";
import Info from "@/components/Info";

export default function Home({ products }: { products: Product[] }) {
  const { confirm, user } = useAuth();
  const { addToCart } = useCart();
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

      <Info content={
        <div>
          <p>This page uses server side rendering.</p>
          <p className="mb-2">The page is cached for 1 week via the Cache-Control Header</p>
          <code className="bg-gray-200">context.res.setHeader(&quot;Cache-Control&quot;, &quot;public, max-age=604800, stale-while-revalidate=604800&quot;);</code>
        </div>
      }/>

      {confirmationPending && <p className="text-blue-500 mt-4">Validating sign up...</p>}
      {loginConfirmation && <p className="text-green-500 mt-4">You have successfully logged in!</p>}

      <Nav />

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {products?.map((product) => (
          <div className="shadow-xl rounded-xl" key={product.id}>
            <div>
              <Link href={`/products/${product.slug}`}>
                <img src={`/.netlify/images?url=${product?.imgSrc}&q=30`} alt={product.name} className="rounded-t-xl" />
              </Link>
              <div className="flex justify-between p-8">
                <div>
                  <Link href={`/products/${product.slug}`}>
                    <h2 className="font-bold text-xl">{product.name}</h2>
                  </Link>
                  <p>
                    {product.memberDiscount && user ? (
                      <>
                        <span className="text-red-500 line-through"><Currency />{product.price}</span>{" "}
                        <Currency />
                        {product.price * 0.9}
                      </>
                    ) : (
                      <>
                        <Currency />
                        {product.price}
                      </>
                    )}
                  </p>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1
                    });
                  }}
                >Add to Cart</button>
              </div>
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

  context.res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");

  return {
    props: {
      products: products || [],
    },
  };
}