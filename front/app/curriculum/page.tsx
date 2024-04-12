'use client'

import { useEffect, useState } from "react"
import api from "../util/api";
import Link from "next/link";
import CurriculumForm from "./curriculumForm";


export default interface Curriculum {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}

export default function Curriculum() {

    const [curriculumList, setCurriculumList] = useState([]);
    const [isNull, setIsNull] = useState(Boolean);

    useEffect(() => {
        fetchCurriculums();
    }, [])

    const fetchCurriculums = () => {
        const response = api.get('/api/v1/curriculums')
            .then(response => {
                setCurriculumList(response.data.data.curriculumList);
                setIsNull(false);
            }).catch(err => {
                setIsNull(true)
            })
    }

    const onDelete = async (id: number) => {
        const response = await api.delete(`/api/v1/curriculums/${id}`)
        fetchCurriculums();
    }

    return (
        <>
            일정관리
            <CurriculumForm fetchCurriculums={fetchCurriculums} />
            {!isNull ? curriculumList.map((curriculum: Curriculum) =>
                <li key={curriculum.id}>
                    <span>{curriculum.name}|</span>
                    <span>{curriculum.startDate}|</span>
                    <span>{curriculum.endDate}</span>
                    <Link href={"/curriculums/" + curriculum.id}>수정</Link>
                    <button onClick={() => onDelete(curriculum.id)}>삭제</button>
                </li>
            ) : <>일정을 등록해 주세요.</>}
        </>
    )
}