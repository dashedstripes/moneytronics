import { getProductBySlug } from "@/backend/get-products-by-slug";
import Nav from "@/components/Nav";
import ProductPrice from "@/components/ProductPrice";
import { cookies } from "next/headers";

export default async function Page(context: any) {
  const { slug } = context.params;

  const product = await getProductBySlug({
    source: "test",
    locale: "en-US",
    slug,
  });

  if (!product) {
    return {
      notFound: true,
    }
  }
  const locale = cookies().get("locale") || "en-US";

  return (
    <div>
      <Nav locale={locale as string} />
      <main className="container mx-auto px-8">
        <div className='grid md:grid-cols-2 gap-20'>
          {product?.imgSrc && <img src={`/.netlify/images?url=${product?.imgSrc}&q=50`} alt={product.name} className='rounded-xl shadow-xl' />}
          <div>
            <h1 className='font-bold text-4xl mb-8'>{product.name}</h1>
            <h2 className='text-3xl'>
              <ProductPrice price={product.price} hasMemberDiscount={product.memberDiscount} />
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}