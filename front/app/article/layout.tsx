import Link from "next/link";


export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/article">ARTICLE </Link>/
      <Link href="/article/post"> POST</Link>{children}
    </div>
  );
}
