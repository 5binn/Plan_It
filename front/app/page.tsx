'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logoutted from "./logoutted";

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
      
      <Logoutted></Logoutted>
      <h1 className=""> 홈 입니다. </h1>
      <h1 className=""> 로그인 </h1>
      <h1 className=""> 회원가입 </h1>
      <h1 className=""> ID/PW찾기 </h1>
      <h1 className=""> 로그인되면 달력으로 화면 전환 </h1>

    </div>
  );
}
