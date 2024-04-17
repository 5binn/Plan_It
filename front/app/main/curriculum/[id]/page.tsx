

'use client'

import api from "@/app/util/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScheduleForm from "../../schedule/scheduleForm";
import InviteForm from "../../guest/inviteForm";
import { Curriculum, Guest, Schedule } from "@/app/util/type";
import { useParams, useRouter } from "next/navigation";

export default function Id() {

    const params = useParams();
    const router = useRouter();

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
    }, [ ])



    return (
        <div className="text-lg">
            모임 상세
            <h1> 모임이름 : {curriculum?.name} / host : {curriculum?.host.nickname}</h1>
            <h3>시작일 :{curriculum?.startDate}</h3>
            <h3>종료일 :{curriculum?.endDate}</h3>
            <h2>일정</h2>
            <ScheduleForm fetchSchedules={fetchSchedules} id={params.id} />
            {!scheduleIsNull ? scheduleList.map((schedule: Schedule) =>
                <li key={schedule.id}>
                    <Link href={"/curriculum/" + schedule.id}>{schedule.id}|</Link>
                    <span >{schedule.content}|</span>
                    <span >{schedule.date}</span>
                    <Link href={"/curriculum/" + schedule.id + "/edit"}>수정</Link>
                    <button onClick={() => onDelete(schedule.id)}>삭제</button>
                </li>
            ) : <>일정을 등록해 주세요.</>}
            <h2>GUEST</h2>
            {!approvedGuestIsNull ? approvedGuestList.map((guest: Guest) => {
                return guest.userName !== curriculum?.host.username ? (
                    <li key={guest.id}>
                        <Link href={"/curriculum/" + guest.id}>{guest.id}|</Link>
                        <span>{guest.userName}|</span>
                        <span>{guest.invite}</span>
                    </li>
                ) : (
                    <></>
                );
            }) : <></>}
            <InviteForm fetchWaitingGuests={fetchWaitingGuests} curriculumId={params.id}
            approvedGuestList={approvedGuestList} waitingGuestList={waitingGuestList} />
            {curriculum?.host.username == username ?<div>
            <h2>승인대기</h2>
            {!waitingGuestIsNull ? waitingGuestList.map((guest: Guest) =>
                <li key={guest.id}>
                    <Link href={"/curriculum/" + guest.id}>{guest.id}|</Link>
                    <span >{guest.userName}|</span>
                    <span >{guest.invite}</span>
                </li>
            ) : <></>}
            </div> : <></>}
        </div>
    )
}





