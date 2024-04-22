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
        <div className="cont drop-shadow-sm">
            <div className="top pb-3 mt-3 drop-shadow-sm">
                <div className="font-bold text-3xl drop-shadow-sm">
                    <Link href="/main"><i className="fa-regular fa-calendar-check drop-shadow-sm"></i>PlanIt</Link>
                </div>
                <div className="drop-shadow-sm">
                    {username && <span className="pl-2 pr-2 font-bold">[ {username} ] 님 환영합니다.</span>}
                    <Link className="pl-2 pr-2 border-l-2 border-solid border-gray-500 font-bold"
                        href={"/main/" + username}>내 정보</Link>
                    <button className="pl-2 pr-2 border-l-2 border-solid border-gray-500 font-bold"
                        onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
            {children}
        </div>
    );
}


