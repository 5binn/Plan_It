'use client'

import Link from "next/link";
import api from "./util/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const response = api.get('/api/v1/users/me')
      .then((response) => {
        setIsLogin(true);
      })
      .catch(err => {
        setIsLogin(false);
      });
  }, [])

  const handleLogout = async () => {
    const response = await api.post("/api/v1/users/logout");
    if (response.status == 200) {
      alert('성공');
    } else {
      alert('실패');
    }
  }

  return (
    <html lang="ko">
      <body >
        {isLogin ? <nav>
          <Link href="/">Home |</Link>
          <Link href="/curriculum"> Curriculum |</Link>
          <Link href="/about"> MyPage |</Link>
          <Link href={"/user/login"}> 로그인 |</Link>
          <button onClick={handleLogout}> 로그아웃</button>
          (로그인되있으면 네비바뜸)
        </nav> : <></>}
        {children}
      </body>
    </html>
  );
}
