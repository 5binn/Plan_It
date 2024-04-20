

'use client'

import api from "@/app/util/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScheduleForm from "../../schedule/scheduleForm";
import InviteForm from "../../guest/inviteForm";
import { Curriculum, Guest, Schedule } from "@/app/util/type";
import { useParams, useRouter } from "next/navigation";
import { CalenderHeader } from "../../calender/header";
import { CalenderDays } from "../../calender/days";
import { CalenderBody } from "../../calender/body";
import { addMonths, format, subMonths } from "date-fns";

export default function Id() {

    const params = useParams();
    const router = useRouter();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [curriculum, setCurriculum] = useState<Curriculum>();
    const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
    const [approvedGuestList, setApprovedGuestList] = useState<Guest[]>([]);
    const [waitingGuestList, setWaitingGuestList] = useState<Guest[]>([]);
    const [guestList, setGuestList] = useState<Guest[]>([]);
    const [scheduleIsNull, setScheduleIsNull] = useState(false);
    const [approvedGuestIsNull, setApprovedGuestIsNull] = useState(false);
    const [waitingGuestIsNull, setWaitingGuestIsNull] = useState(false);

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


    useEffect(() => {
        api.get(`/api/v1/curriculums/${params.id}`)
            .then((response) => setCurriculum(response.data.data.curriculum));
    }, [params.id]);



    const fetchSchedules = () => {
        api.get(`/api/v1/schedules/curriculum/${params.id}`)
            .then((response) => {
                setScheduleList(response.data.data.scheduleList);
                setScheduleIsNull(false);
            })
            .catch(err => {
                setScheduleIsNull(true);
            });
    }

    useEffect(() => {
        fetchSchedules();
    }, [params.id]);



    useEffect(() => {
        api.get(`/api/v1/guests/curriculum/${params.id}/approve`)
            .then((response) => {
                setApprovedGuestList(response.data.data.guestList);
                setApprovedGuestIsNull(false);
            })
            .catch(err => {
                setApprovedGuestIsNull(true);
            });
    }, [params.id]);


    const fetchWaitingGuests = () => {
        api.get(`/api/v1/guests/curriculum/${params.id}/wait`)
            .then((response) => {
                setWaitingGuestList(response.data.data.guestList);
                setWaitingGuestIsNull(false);
            })
            .catch(err => {
                setWaitingGuestIsNull(true);
            });
    }


    useEffect(() => {
        fetchWaitingGuests();
    }, [params.id]);

    const onDelete = async (id: number) => {
        const response = await api.delete(`/api/v1/schedules/${id}`)
        fetchSchedules();
    }

    const fetchGuests = () => {
        api.get(`/api/v1/guests/curriculum/${params.id}`)
            .then((response) => {
                setGuestList(response.data.data.guestList);
                console.log(guestList)
            })
            .catch(err => {
            });
    }

    useEffect(() => {
        fetchGuests();
    }, [])

    const preMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const formatDate = (date: any) => {
        return format(new Date(date), 'yy.MM.dd');
    }

    return (
        // <div className="text-lg">
        //     모임 상세
        //     <h1> 모임이름 : {curriculum?.name} / host : {curriculum?.host.nickname}</h1>
        //     <h3>시작일 :{curriculum?.startDate}</h3>
        //     <h3>종료일 :{curriculum?.endDate}</h3>
        //     <h2>일정</h2>
        //     <ScheduleForm fetchSchedules={fetchSchedules} id={params.id} />
        //     {!scheduleIsNull ? scheduleList.map((schedule: Schedule) =>
        //         <li key={schedule.id}>
        //             <Link href={"/curriculum/" + schedule.id}>{schedule.id}|</Link>
        //             <span >{schedule.content}|</span>
        //             <span >{schedule.date}</span>
        //             <Link href={"/curriculum/" + schedule.id + "/edit"}>수정</Link>
        //             <button onClick={() => onDelete(schedule.id)}>삭제</button>
        //         </li>
        //     ) : <>일정을 등록해 주세요.</>}
        //     <h2>GUEST</h2>
        //     {!approvedGuestIsNull ? approvedGuestList.map((guest: Guest) => {
        //         return guest.userName !== curriculum?.host.username ? (
        //             <li key={guest.id}>
        //                 <Link href={"/curriculum/" + guest.id}>{guest.id}|</Link>
        //                 <span>{guest.userName}|</span>
        //                 <span>{guest.invite}</span>
        //             </li>
        //         ) : (
        //             <></>
        //         );
        //     }) : <></>}
        //     <InviteForm fetchWaitingGuests={fetchWaitingGuests} curriculumId={params.id}
        //     guestList={guestList} />
        //     {curriculum?.host.username == username ?<div>
        //     <h2>승인대기</h2>
        //     {!waitingGuestIsNull ? waitingGuestList.map((guest: Guest) =>
        //         <li key={guest.id}>
        //             <Link href={"/curriculum/" + guest.id}>{guest.id}|</Link>
        //             <span >{guest.userName}|</span>
        //             <span >{guest.invite}</span>
        //         </li>
        //     ) : <></>}
        //     </div> : <></>}
        // </div>
        <>
            <div className="w-screen max-w-screen-xl between items-center m-3">
                <div className="flex items-center ml-2">
                    {/* <Link href={"/"} className="font-bold text-3xl">Home /</Link> */}
                    <div className="ml">
                        <div className="font-bold text-3xl"> {curriculum?.name}</div>
                        <div className="text-xl">{curriculum?.host.nickname}</div>
                    </div>
                </div>
                <div className="mr-2">
                    {!approvedGuestIsNull ? approvedGuestList.map((guest: Guest) => {
                        return guest.userName !== curriculum?.host.username ? (
                            <div key={guest.id}>|
                                <span>{guest.userName}|</span>
                            </div>
                        ) : (
                            <></>
                        );
                    }) : <></>}
                </div>
            </div>
            <div className="main">
                <div className="left layout mt-4 border rounded-lg">
                    <div className="w-full m-2">
                        <div className="mycurriculum">
                            <span className="text-lg font-bold">일정</span>
                            {/* {!isClickC ? <button className="text-lg font-bold mr-2 pb-2" onClick={handleClickC}>+</button>
                            : <button className="text-lg font-bold mr-2 pb-2" onClick={handleClickC}>x</button>} */}
                        </div>
                        <div className="w-full">
                            {/* {scheduleIsNull ? <CurriculumForm fetchCurriculums={fetchCurriculums} handleClick={handleClickC} className="w-full" /> : <></>} */}
                        </div>
                        {!scheduleIsNull ? scheduleList.map((schedule: Schedule) =>
                            <>
                                <div className="between border rounded text-sm mt-1 pl-1 pt-1 pb-1" key={schedule.id}>
                                    <Link className="itemco ml-1" href={"/main/curriculum/" + schedule.id}>
                                        <div className="itemco">
                                            <span className="curiname truncate font-bold ">{schedule.content}</span>
                                        </div>
                                        <div className="text-xs">
                                            <span >{formatDate(schedule.date)}~</span>
                                        </div>
                                    </Link>
                                    <div className="ml-2 mr-1 ">
                                        {username == schedule.curriculum.host.username ?
                                            <div className="btngroup text-xs">
                                                {/* {curriculum.id == isOpen ? <button className="border rounded  p-1 hover:bg-gray-200" onClick={() => openForm(curriculum.id)}>취소</button>
                                                : <button className="border rounded  p-1 hover:bg-gray-200" onClick={() => openForm(curriculum.id)}>수정</button>} */}
                                                <button className="border rounded mt-1 p-1 hover:bg-gray-200" >삭제</button>
                                            </div>
                                            : <div>
                                            </div>}
                                    </div>
                                </div>
                            </>
                        ) : <span className="text-lg">모임이 없습니다.</span>}

                        <div className="invite mt-2">
                            <div className="text-lg font-bold ml-0.5">초대</div>
                            <InviteForm fetchWaitingGuests={fetchWaitingGuests} curriculumId={params.id}
                                guestList={guestList} />
                            <div className="between invitebtn border rounded text-sm mt-1 pl-1" >
                                <span className="invcuri truncate font-bold item">sdas</span>
                                <div className="invitebtn text-xs">
                                    <button className="border rounded mt-1 mb-1 mr-1 p-1 hover:bg-gray-200" >수락</button>
                                    <button className="border rounded mt-1 mb-1 mr-1 p-1 hover:bg-gray-200">거절</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <CalenderHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} />
                    <CalenderDays />
                    <CalenderBody currentMonth={currentMonth} schedules={scheduleList} />
                </div>
            </div>
        </>
    )
}





