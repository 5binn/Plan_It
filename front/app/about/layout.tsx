import Link from "next/link";

export default function AboutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Link href="/about">ABOUT </Link>/
            <Link href="/about/me"> ME</Link>{children}
        </div>
    );
}
