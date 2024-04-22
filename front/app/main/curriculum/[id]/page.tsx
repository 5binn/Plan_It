

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
import Roulette from "../../roulette/roulette";

export default function Id() {

    const params = useParams();
    const router = useRouter();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [curriculum, setCurriculum] = useState<Curriculum>();

    const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
    const [upSchedule, setUpSchedule] = useState({ content: '', date: '' });
    const [approvedGuestList, setApprovedGuestList] = useState<Guest[]>([]);
    const [waitingGuestList, setWaitingGuestList] = useState<Guest[]>([]);
    const [guestList, setGuestList] = useState<Guest[]>([]);

    const [scheduleIsNull, setScheduleIsNull] = useState(false);
    const [approvedGuestIsNull, setApprovedGuestIsNull] = useState(false);
    const [waitingGuestIsNull, setWaitingGuestIsNull] = useState(false);

    const [isClick, setIsClick] = useState(Boolean);
    const [isOpen, setIsOpen] = useState<Number | null>(null);
    const [username, setUsername] = useState<string | undefined>();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(!isModalOpen);
    }

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
        await api.delete(`/api/v1/schedules/${id}`)
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

    const handleClick = () => {
        if (isOpen != null) {
            setIsOpen(null);
        }
        setIsClick(!isClick);
    }
    const openForm = (id: Number) => {
        if (isClick) {
            setIsClick(!isClick);
        }
        if (isOpen == null) {
            setIsOpen(id);
            api.get(`/api/v1/schedules/${id}`)
                .then(response => setUpSchedule(response.data.data.schedule));
        } else {
            setIsOpen(null)
        }
    }

    const update = async (e: React.FormEvent<HTMLFormElement>, curriculumId: number) => {
        e.preventDefault();
        const response = await api.patch(`/api/v1/schedules/${curriculumId}`, upSchedule);
        if (response.status == 200) {
            setUpSchedule({ content: '', date: '' });
            setIsOpen(null);
            fetchSchedules();
        } else {
            alert('수정에 실패했습니다.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpSchedule({ ...upSchedule, [name]: value });
        console.log({ ...upSchedule, [name]: value })
    }


    return (
        <>
            <div className="w-screen max-w-screen-xl between items-center m-3 drop-shadow">
                <div className="flex items-center ml-2">
                    <Link href={"/main"} className="font-semibold text-2xl">Home /</Link>
                    <Link href={"/main/curriculum/" + curriculum?.id} className="ml-2">
                        <div className="font-semibold text-2xl"> {curriculum?.name}</div>
                    </Link>
                </div>
                <div className="mr-2">
                    {!approvedGuestIsNull ? approvedGuestList.map((guest: Guest) => {
                        return guest.username !== curriculum?.host.username ? (
                            <div key={guest.id}>
                                <span className="border rounded pl-1 pr-1 ml-1 drop-shadow">{guest.nickname}</span>
                            </div>
                        ) : (
                            <></>
                        );
                    }) : <span className="text-base">초대된 회원이 없습니다.</span>}
                </div>
            </div>
            <div className="main">
                <div className="left layout mt-4 border rounded-lg drop-shadow">
                    <div className="w-full m-2">
                        <div className="mycurriculum">
                            <span className="text-lg font-bold">일정</span>
                            {username == curriculum?.host.username && (
                                !isClick ? (
                                    <button className="text-lg font-bold mr-2 pb-2 drop-shadow" onClick={handleClick}>
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14 20L14 8M8 14l12 0"
                                            ></path>
                                        </svg>
                                    </button>)
                                    : (<button className="text-lg font-bold mr-2 pb-2 drop-shadow" onClick={handleClick}>
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 19L9 9M9 19l10-10"
                                            ></path>
                                        </svg>
                                    </button>)
                            )}
                        </div>
                        <div className="w-full">
                            {isClick ? <ScheduleForm fetchSchedules={fetchSchedules} id={params.id} handleClick={handleClick} className="w-full" /> : <></>}
                        </div>
                        <div className="max-h-60 overflow-auto">
                            {!scheduleIsNull ? scheduleList.map((schedule: Schedule) =>
                                <>
                                    <div className="between border rounded text-sm mt-1 pl-1 pt-1 pb-1" key={schedule.id}>
                                        <Link className="itemco ml-1" href={"/main/schedule/" + schedule.id}>
                                            <div className="itemco">
                                                <span className="curiname truncate font-bold ">{schedule.content}</span>
                                            </div>
                                            <div className="text-xs">
                                                <span >{formatDate(schedule.date)}</span>
                                            </div>
                                        </Link>
                                        <div className="ml-2 mr-1 ">
                                            {username == schedule.curriculum.host.username ?
                                                <div className="btngroup text-xs">
                                                    {schedule.id == isOpen ? <button className="border rounded  p-1 hover:bg-gray-200" onClick={() => openForm(schedule.id)}>취소</button>
                                                        : <button className="border rounded  p-1 hover:bg-gray-200" onClick={() => openForm(schedule.id)}>수정</button>}
                                                    <button className="border rounded mt-1 p-1 hover:bg-gray-200" onClick={() => onDelete(schedule.id)}>삭제</button>
                                                </div>
                                                : <div>
                                                </div>}
                                        </div>
                                    </div>
                                    {schedule.id == isOpen ?
                                        <div className="text-sm">
                                            <form onSubmit={(e) => update(e, schedule.id)}>
                                                <label >이름</label>
                                                <input className="border w-full" type="text" name="content" value={upSchedule.content} onChange={handleChange} />
                                                <label >일자</label>
                                                <input className="border w-full" type="date" name="date" value={upSchedule.date} onChange={handleChange} />
                                                <button className="border w-full mt-1  hover:bg-gray-200" type="submit">수정</button>
                                            </form>
                                        </div>
                                        : <></>}
                                </>
                            ) : <span className="text-base">등록된 일정이 없습니다.</span>}
                            {isModalOpen && <Roulette openModal={openModal} />}
                        </div>
                        {username == curriculum?.host.username ?
                            <div className="invite mt-2">
                                <div className="text-lg font-bold ml-0.5">초대</div>
                                <InviteForm fetchWaitingGuests={fetchWaitingGuests} curriculumId={params.id}
                                    guestList={guestList} />
                            </div>
                            : <></>}

                    </div>
                </div>
                <div className="">
                    <CalenderHeader currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} />
                    <CalenderDays />
                    <CalenderBody currentMonth={currentMonth} schedules={scheduleList} selectedDate={selectedDate} onDelete={onDelete} />
                </div>
            </div>
        </>
    )
}





