'use client'

import { addMonths, format, subMonths } from "date-fns";
import { useEffect, useState } from "react"
import { CalenderHeader } from "./calender/header";
import { CalenderDays } from "./calender/days";
import { CalenderBody } from "./calender/body";
import "../styles.css"
import api from "../util/api";
import { Curriculum, Guest } from "../util/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CurriculumForm from "./curriculum/curriculumForm";


export default function Main() {


    const router = useRouter();

    const [curriculums, setCurriculums] = useState([]);
    const [isNullC, setIsNullC] = useState(Boolean);

    const [invites, setInvites] = useState([]);
    const [isNullI, setIsNullI] = useState(Boolean);

    const [isClick, setIsClick] = useState(Boolean);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());


    const fetchCurriculums = () => {
        api.get('/api/v1/curriculums/guest')
            .then(response => {
                setCurriculums(response.data.data.curriculumList);
                setIsNullC(false);
            }).catch(err => {
                setIsNullC(true)
            })
    }

    const fetchInvites = () => {
        api.get('/api/v1/guests/user')
            .then(response => {
                setInvites(response.data.data.guestList);
                setIsNullI(false);
            }).catch(err => {
                setIsNullI(true);
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
        fetchInvites();
        console.log(username);
    }, [])


    const onDelete = async (id: number) => {
        await api.delete(`/api/v1/curriculums/${id}`)
        fetchCurriculums();
    }

    const onApprove = async (id: Number) => {
        await api.patch(`/api/v1/guests/${id}`)
        fetchCurriculums();
        fetchInvites();
    }

    const onReject = async (id: Number) => {
        await api.delete(`/api/v1/guests/${id}`)
        fetchInvites();
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

    const onDateClick = (day: any) => {
        if (day !== selectedDate) {
            setSelectedDate(day);
        }
    };
    return (
        <div className="main">
            <div className="left layout mt-4 border rounded-lg">
                <div className="block m-2">
                    <div className="mycurriculum">
                        <span className="text-lg font-bold">내 모임</span>
                        {!isClick ? <button className="text-lg font-bold mr-2 pb-2" onClick={handleClick}>+</button>
                            : <button className="text-lg font-bold mr-2 pb-2" onClick={handleClick}>x</button>}
                    </div>
                    <div className="w-full">
                        {isClick ? <CurriculumForm fetchCurriculums={fetchCurriculums} handleClick={handleClick} className="w-full"></CurriculumForm> : <></>}
                    </div>
                    {!isNullC ? curriculums.map((curriculum: Curriculum) =>
                        <div className="between border rounded text-sm mt-1 pl-1 pt-1 pb-1" key={curriculum.id}>
                            <Link className="itemco ml-1" href={"/main/curriculum/" + curriculum.id}>
                                <div className="itemco">
                                    <span className="curiname truncate font-bold ">{curriculum.name}</span>
                                    <span className="truncate text-xs">{curriculum.host.nickname}</span>
                                </div>
                                <div className="text-xs">
                                    <span >{formatDate(curriculum.startDate)}~</span>
                                    <span >{formatDate(curriculum.endDate)}</span>
                                </div>
                            </Link>
                            <div className="ml-2 mr-1 ">
                                {username == curriculum.host.username ?
                                    <div className="btngroup text-xs">
                                        <Link className="border rounded  p-1 hover:bg-gray-200" href={"/main/curriculum/" + curriculum.id + "/edit"}>수정</Link>
                                        <button className="border rounded mt-1 p-1 hover:bg-gray-200" onClick={() => onDelete(curriculum.id)}>삭제</button>
                                    </div>
                                    : <div>
                                    </div>}
                            </div>
                        </div>
                    ) : <span className="text-lg">모임이 없습니다.</span>}
                    <div className="invite mt-2">
                        {!isNullI ? <div className="text-lg font-bold ml-0.5">초대메세지</div> : <></>}
                        {!isNullI ? invites.map((invite: Guest) =>
                            <div className="between invitebtn border rounded text-sm mt-1 pl-1" key={invite.id}>
                                <span className="invcuri truncate font-bold item">{invite.curriculumName}</span>
                                <div className="invitebtn text-xs">
                                    <button className="border rounded mt-1 mb-1 mr-1 p-1 hover:bg-gray-200" onClick={() => onApprove(invite.id)}>수락</button>
                                    <button className="border rounded mt-1 mb-1 mr-1 p-1 hover:bg-gray-200" onClick={() => onReject(invite.id)}>거절</button>
                                </div>
                            </div>
                        ) : <></>}
                    </div>
                </div>
            </div>
            <div className="w-full ml-4 mt-5">
                <CalenderHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} />
                <CalenderDays />
                <CalenderBody onDateClick={(day: any) => onDateClick} currentMonth={currentMonth} selectedDate={selectedDate} curriculums={curriculums} />
            </div>
        </div>
    )
}

