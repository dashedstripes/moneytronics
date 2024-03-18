import Nav from '@/components/Nav';
import { getProductBySlug } from '../../../backend/get-products-by-slug';
import { Product } from '../../../backend/product';
import Currency from '@/components/Currency';
import { useAuth } from '@/utils/AuthContext';

export default function Product({ product }: { product: Product }) {
  const { user } = useAuth();
  return (
    <main className="container mx-auto px-8">
      <Nav />
      <div className='grid grid-cols-2 gap-20'>
        {product.imgSrc && <img src={`/.netlify/images?url=${product?.imgSrc}&q=50`}  alt={product.name} />}
        <div>
          <h1 className='font-bold text-4xl mb-8'>{product.name}</h1>
          <h2 className='text-3xl'>{product.memberDiscount && user ? (
            <>
              <span className="text-red-500 line-through"><Currency />{product.price}</span>{" "}
              <Currency />
              {product.price * 0.9}
              <p className='text-lg'>Enjoy a 10% discount for being a member!</p>
            </>
          ) : (
            <>
              <Currency />
              {product.price}
            </>
          )}
          </h2>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const { locale } = context;

  const product = await getProductBySlug({
    source: "test",
    locale,
    slug,
  });

  return {
    props: {
      product,
    }
  }
}