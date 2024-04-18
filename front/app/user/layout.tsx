'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import LoginCheck from "../loginCheck";
import api from "../util/api";
import { Curriculum } from "../util/type";
import "../styles.css"
import { format } from "date-fns";


export default function UserLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const router = useRouter();
    const [username, setUsername] = useState<string | undefined>();

    return (
        <div className="container">
            <div className="top pb-3 mt-3">
                <div className="font-bold text-3xl">
                    <Link href="/"><i className="fa-regular fa-calendar-check"></i>PlanIt</Link>
                </div>
                <div>
                   <Link href="/user/signup"> 회원가입 |</Link>
                   <Link href="/user/find"> ID/PW찾기 </Link>
                </div>
            </div>
            <div className="usercon">
                {children}
            </div>
        </div>
    );
}


