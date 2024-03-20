"use client"

import { useAuth } from "@/utils/AuthContext";
import Currency from "./Currency";

export default function ProductPrice({
  price,
  hasMemberDiscount,
  small = false,
}: {
  price: number,
  hasMemberDiscount: boolean,
  small?: boolean
}) {
  const { user, authLoading } = useAuth();


  if (authLoading) {
    return null;
  }

  if (hasMemberDiscount && user) {
    return (
      <div>
        <span className="text-red-500 line-through"><Currency />{price}</span>{" "}
        <Currency />
        {price * 0.9}
        {!small && (
          <p className='text-lg'>Enjoy a 10% discount for being a member!</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <Currency />
      {price}
    </div>
  );
}