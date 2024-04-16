'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import LoginCheck from "../loginCheck";
import api from "../util/api";
import { Curriculum } from "../util/type";
import "../styles.css"
import { format } from "date-fns";


export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const [curriculums, setCurriculums] = useState([]);
    const [isNull, setIsNull] = useState(Boolean);

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

    const fetchCurriculums = () => {
        api.get('/api/v1/curriculums/user')
            .then(response => {
                setCurriculums(response.data.data.curriculumList);
                setIsNull(false);
            }).catch(err => {
                setIsNull(true)
            })
    }

    const formatDate = (date: any) => {
        return format(new Date(date), 'yy.MM.dd');
    }


    useEffect(() => {
        fetchCurriculums();
    }, [])

    return (
        <div className="m-4">
            <div className="top">
                <div className="font-bold text-3xl">
                    <Link href="/main"><i className="fa-regular fa-calendar-check"></i>PlanIt</Link>
                </div>
                <div>
                    <Link href="/main/curriculum"> Curriculum |</Link>
                    <Link href="/main/about"> MyPage |</Link>
                    <button onClick={handleLogout}> 로그아웃</button>
                </div>
            </div>
            <div className="container">
                <div className="left layout mt-4 border rounded-lg">
                    <div>
                        <span className="text-lg">curriculum</span>
                        {!isNull ? curriculums.map((curriculum: Curriculum) =>
                            <div className="border rounded mycurriculum text-sm mt-1" key={curriculum.id}>
                                <Link href={"/main/curriculum/" + curriculum.id}>
                                    <div className="mycurriculum mt-1">
                                        <span>{curriculum.name}</span>
                                        <span className="text-sm">{curriculum.host.nickname}</span>
                                    </div>
                                    <div className="mt-1">
                                        <span >{formatDate(curriculum.startDate)}~</span>
                                        <span >{formatDate(curriculum.endDate)}</span>
                                    </div>
                                </Link>
                                <div className="mt-1 ml-2">
                                    <Link className="border rounded" href={"/main/curriculum/" + curriculum.id + "/edit"}>수정</Link>
                                </div>
                            </div>
                        ) : <>등록된 모임이 없습니다.</>}
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}


