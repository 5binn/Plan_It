'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log(document.cookie);
    }, 1000);
  }, [])

  const logout = () => {
    fetch("http://localhost:8070/api/v1/members/logout");
  }

  return (
    <div className="h-screen bg-white">
      
      <h1 className=""> 홈 입니다. </h1>
    </div>
  );
}
