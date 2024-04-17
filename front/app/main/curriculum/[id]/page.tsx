

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

    const [username, setUsername] = useState<string | undefined>();
    const [scheduleIsNull, setScheduleIsNull] = useState(false);

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

    const onDelete = async (id: number) => {
        const response = await api.delete(`/api/v1/schedules/${id}`)
        fetchSchedules();
    }

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
            <InviteForm curriculum={curriculum} username={username} curriculumId={params.id}/>
        </div>
    )
}





