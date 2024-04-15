'use client'

import Link from "next/link";
import api from "./util/api";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Cookies, useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";
import LoginCheck from "./loginCheck";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="ko">
      <body >
        {children}
      </body>
    </html>
  );
}


