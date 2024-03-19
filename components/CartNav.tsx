"use client"

import Link from 'next/link';
import React from 'react';

interface CartNavProps {
  itemCount: number;
}

const CartNav: React.FC<CartNavProps> = ({ itemCount }) => {
  return (
    <Link href="/cart">
      <div>
        cart ({itemCount})
      </div>
    </Link>
  );
};

export default CartNav;