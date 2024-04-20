'use client'

import { useEffect, useState } from "react"
import Link from "next/link";
import CurriculumForm from "./curriculumForm";
import api from "@/app/util/api";
import type { Curriculum } from "@/app/util/type";



export default function Curriculum() {

    const [curriculumList, setCurriculumList] = useState([]);
    const [isNull, setIsNull] = useState(Boolean);

    useEffect(() => {
        fetchCurriculums();
    }, [])

    const fetchCurriculums = () => {
        api.get('/api/v1/curriculums')
            .then(response => {
                setCurriculumList(response.data.data.curriculumList);
                setIsNull(false);
            }).catch(err => {
                setIsNull(true)
            })
    }

    const onDelete = async (id: number) => {
        await api.delete(`/api/v1/curriculums/${id}`)
        fetchCurriculums();
    }

    return (
        <>
            모임관리
            {!isNull ? curriculumList.map((curriculum: Curriculum) =>
                <li key={curriculum.id}>
                    <Link href={"/main/curriculum/" + curriculum.id}>{curriculum.name}|</Link>
                    <span>{curriculum.host.nickname}</span>
                    <span >{curriculum.startDate}~</span>
                    <span >{curriculum.endDate}</span>
                    <Link href={"/main/curriculum/" + curriculum.id + "/edit"}>수정</Link>
                    <button onClick={() => onDelete(curriculum.id)}>삭제</button>
                </li>
            ) : <>등록된 모임이 없습니다.</>}
        </>
    )
}