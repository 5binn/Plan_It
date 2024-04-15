'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import LoginCheck from "../loginCheck";
import api from "../util/api";


export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const loggedIn = await LoginCheck();
            if (!loggedIn) {
                router.push("/");
            }
        };
        fetchData();
    }, [])

    const handleLogout = async () => {
        const response = await api.post("/api/v1/users/logout");
        if (response.status == 200) {
            alert('성공');
            router.push("/");
        } else {
            alert('실패');
        }
    }

    return (
        <div >
            <nav>
                <Link href="/main">Home |</Link>
                <Link href="/main/curriculum"> Curriculum |</Link>
                <Link href="/main/about"> MyPage |</Link>
                <button onClick={handleLogout}> 로그아웃</button>
            </nav>
            {children}
        </div>
    );
}


