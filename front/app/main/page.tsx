'use client'

import { addMonths, format, subMonths } from "date-fns";
import { useEffect, useState } from "react"
import { CalenderHeader } from "./calender/header";
import { CalenderDays } from "./calender/days";
import { CalenderBody } from "./calender/body";
import "../styles.css"
import api from "../util/api";
import { Curriculum } from "../util/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CurriculumForm from "./curriculum/curriculumForm";


export default function Main() {

    const router = useRouter();

    const [Curriculums, setCurriculums] = useState([]);
    const [isNull, setIsNull] = useState(Boolean);
    const [isClick, setIsClick] = useState(Boolean);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [seletcedDate, setSelectedDate] = useState(new Date());


    const fetchCurriculums = () => {
        api.get('/api/v1/curriculums/guest')
            .then(response => {
                setCurriculums(response.data.data.curriculumList);
                setIsNull(false);
            }).catch(err => {
                setIsNull(true)
            })
    }

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

    const formatDate = (date: any) => {
        return format(new Date(date), 'yy.MM.dd');
    }


    useEffect(() => {
        fetchCurriculums();
        console.log(username);
    }, [])


    const onDelete = async (id: number) => {
        await api.delete(`/api/v1/curriculums/${id}`)
        fetchCurriculums();
    }

    const handleClick = () => {
        setIsClick(!isClick);
    }

    const preMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    return (
        <div className="container">
            <div className="left layout mt-4 border rounded-lg">
                <div className="block m-1">
                    <div className="mycurriculum mt-2">
                        <span className="text-lg font-bold ml-0.5">내 모임</span>
                        <button className="text-lg font-bold mr-1 pb-1" onClick={handleClick}>+</button>
                    </div>
                    <div className="w-full">
                        {isClick ? <CurriculumForm fetchCurriculums={fetchCurriculums} handleClick={handleClick} className="w-full"></CurriculumForm> : <></>}
                    </div>
                    {!isNull ? Curriculums.map((curriculum: Curriculum) =>
                        <>
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
                                <div className="m-1">
                                    {username == curriculum.host.username ?
                                        <div>
                                            <Link className="border rounded" href={"/main/curriculum/" + curriculum.id + "/edit"}>수정</Link>
                                            <button className="border rounded" onClick={() => onDelete(curriculum.id)}>삭제</button>
                                        </div>
                                        : <div>
                                        </div>}
                                </div>
                            </div>

                        </>
                    ) : <>등록된 모임이 없습니다.</>}
                </div>
            </div>
            <div className="w-full ml-4">
                <CalenderHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} />
                <CalenderDays />
                <CalenderBody currentMonth={currentMonth} selectedDate={seletcedDate} />
            </div>
        </div>
    )
}

