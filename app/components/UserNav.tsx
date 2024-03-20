"use client"

import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";
import { useEffect } from "react";

export default function UserNav() {
  const { user, logout, confirm } = useAuth();


  useEffect(() => {
    const validateConfirmationToken = async (token: string) => {
      try {
        await confirm(token);
      } catch (error) {
        console.log(error);
      }
    };

    if (window.location.hash.includes("#confirmation_token")) {
      const token = window.location.hash.split("=")[1];
      validateConfirmationToken(token);
    }
  }, [confirm]);

  if(user) {
    return (
      <>
        <Link href="/profile">profile</Link>
        <button onClick={() => logout()}>logout</button>
      </>
    )
  } else {
    return (
      <Link href="/login">login</Link>
    )
  }
}