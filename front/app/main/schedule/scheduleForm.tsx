import api from "@/app/util/api";
import { useState } from "react";



export default function ScheduleForm({ fetchSchedules, id, handleClick }: any) {

    const [schedule, setSchedule] = useState({ content: '', date: ''});

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            const response = await api.post(`/api/v1/schedules/${id}`, schedule);
            if (response.status == 200) {
                setSchedule({ content: '', date: ''});
                handleClick();
                fetchSchedules();
            } else {
                alert('등록에 실패했습니다.');
            }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSchedule({ ...schedule, [name]: value });
        console.log({ ...schedule, [name]: value })
    }


    return (
        <div className="text-sm">
            <form onSubmit={create}>
                <label >내용</label>
                <input className="border w-full" type="text" name="content" value={schedule.content} onChange={handleChange} />
                <label >일자</label>
                <input className="border w-full" type="date" name="date" value={schedule.date} onChange={handleChange} />
                <button className="border w-full mt-1 hover:bg-gray-200" type="submit">등록</button>
            </form>
        </div>
    )
}