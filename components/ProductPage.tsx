"use client"

import Nav from './Nav';
import Currency from '@/components/Currency';
import { useAuth } from '@/utils/AuthContext';
import { Product } from '@/backend/product';

export default function ProductPage({ product }: { product: Product }) {
  const { user } = useAuth();
  return (
    <main className="container mx-auto px-8">
      <Nav />
      <div className='grid md:grid-cols-2 gap-20'>
        {product?.imgSrc && <img src={`/.netlify/images?url=${product?.imgSrc}&q=50`}  alt={product.name} className='rounded-xl shadow-xl'/>}
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