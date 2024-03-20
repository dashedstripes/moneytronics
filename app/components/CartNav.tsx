"use client"

import { useCart } from '@/utils/CartContext';
import Link from 'next/link';
import React from 'react';

export default function CartNav() {
  const { totalCartItems } = useCart();
  
  return (
    <Link href="/cart">
      <div>
        cart ({totalCartItems})
      </div>
    </Link>
  );
};