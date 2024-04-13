import Link from "next/link";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body >
        <nav>
          <Link href="/">Home |</Link>
          <Link href="/curriculum"> Curriculum |</Link>
          <Link href="/about"> MyPage |</Link>
          <Link href={"/user/login"}> 로그인 |</Link>
          <Link href={"/user/logout"}> 로그아웃</Link>
          (로그인되있으면 네비바뜸)
        </nav>
        {children}
      </body>
    </html>
  );
}
