'use client'

import { useEffect, useState } from "react";
import './styles.css'
import LoginCheck from "./loginCheck";
import Login from "./login";
import Logo from "./logo";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const loggedIn = await LoginCheck();
      if (loggedIn) {
        router.push("/main");
      } 
    };

    fetchData();
  }, [])


  return (
    <div className="flex h-screen">
      <Logo></Logo>
      <Login></Login>
    </div >
  );
}
