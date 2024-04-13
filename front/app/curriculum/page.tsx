'use client'

import { useEffect, useState } from "react"
import api from "../util/api";
import Link from "next/link";
import CurriculumForm from "./curriculumForm";
import { Curriculum } from "../util/type";



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
            <CurriculumForm fetchCurriculums={fetchCurriculums} />
            {!isNull ? curriculumList.map((curriculum: Curriculum) =>
                <li key={curriculum.id}>
                    <Link href={"/curriculum/" + curriculum.id}>{curriculum.name}|</Link>
                    <span >{curriculum.startDate}~</span>
                    <span >{curriculum.endDate}</span>
                    <Link href={"/curriculum/" + curriculum.id + "/edit"}>수정</Link>
                    <button onClick={() => onDelete(curriculum.id)}>삭제</button>
                </li>
            ) : <>등록된 모임이 없습니다.</>}
        </>
    )
}