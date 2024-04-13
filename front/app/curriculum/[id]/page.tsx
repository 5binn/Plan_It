'use client'
import InviteForm from "@/app/guest/inviteForm";
import ScheduleForm from "@/app/schedule/scheduleForm";
import api from "@/app/util/api";
import { Curriculum, Guest, Schedule } from "@/app/util/type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Id() {

    const params = useParams();
    const [curriculum, setCurriculum] = useState<Curriculum>();
    const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
    const [approvedGuestList, setApprovedGuestList] = useState<Guest[]>([]);
    const [waitingGuestList, setWaitingGuestList] = useState<Guest[]>([]);
    const [scheduleIsNull, setScheduleIsNull] = useState(Boolean);
    const [approvedGuestIsNull, setApprovedGuestIsNull] = useState(Boolean);
    const [waitingGuestIsNull, setWaitingGuestIsNull] = useState(Boolean);


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


    return (
        <>
            모임 상세
            <h1>{curriculum?.id}번 / NAME : {curriculum?.name}</h1>
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
            {!approvedGuestIsNull ? approvedGuestList.map((guest: Guest) =>
                <li key={guest.id}>
                    <Link href={"/curriculum/" + guest.id}>{guest.id}|</Link>
                    <span >{guest.userName}|</span>
                    <span >{guest.invite}</span>
                </li>
            ) : <></>}
            <InviteForm fetchWaitingGuests={fetchWaitingGuests} id={params.id}/>
            <h2>승인대기</h2>
            {!waitingGuestIsNull ? waitingGuestList.map((guest: Guest) =>
                <li key={guest.id}>
                    <Link href={"/curriculum/" + guest.id}>{guest.id}|</Link>
                    <span >{guest.userName}|</span>
                    <span >{guest.invite}</span>
                </li>
            ) : <></>}
        </>
    )
}