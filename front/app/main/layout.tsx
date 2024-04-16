'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import LoginCheck from "../loginCheck";
import api from "../util/api";
import { Curriculum } from "../util/type";
import "../styles.css"
import { format } from "date-fns";


export default function MainLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const router = useRouter();
    const [username, setUsername] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/api/v1/users/me')
                .then(response => {
                    setUsername(response.data.data.userDto.username);
                }).catch(err => {
                    router.push("/");
                })
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
        <div className="m-4">
            <div className="top pb-3">
                <div className="font-bold text-3xl">
                    <Link href="/main"><i className="fa-regular fa-calendar-check"></i>PlanIt</Link>
                </div>
                <div>
                    <Link href="/main/curriculum"> Curriculum |</Link>
                    {username && <Link href="/main/about"> {username} | </Link>}
                    <button onClick={handleLogout}> 로그아웃</button>
                </div>
            </div>
            <div className="container">
                {children}
            </div>
        </div>
    );
}


