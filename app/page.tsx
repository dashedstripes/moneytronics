import { getProducts } from '@/backend/get-products';
import { cookies } from 'next/headers'
import Nav from './components/Nav';
import Info from './components/Info';
import Link from 'next/link';
import ProductPrice from './components/ProductPrice';
import AddToCartButton from './components/AddToCartButton';

export default async function Page() {
  const products = await getProducts({
    source: "test",
    locale: "en-US",
  });

  const splitBucket = cookies().get("test_bucket") || "a";
  const locale = cookies().get("locale") || "en-US";

  return (
    <div>
      <Nav locale={locale as string} />
      <main className="container mx-auto px-8">

        <Info>
          <div>
            <p className="mb-4">You are in Test Bucket {splitBucket as string}</p>
            <hr /><br />
            <p>This page uses server side rendering.</p>
            <p className="mb-2">The page is cached for 1 week via the Cache-Control Header</p>
            <code className="bg-gray-200">context.res.setHeader(&quot;Cache-Control&quot;, &quot;public, max-age=604800, stale-while-revalidate=604800&quot;);</code>
          </div>
        </Info>


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
                    <ProductPrice small={true} price={product.price} hasMemberDiscount={product.memberDiscount} />
                  </div>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}