import api from "@/app/util/api";
import { addDays, format } from "date-fns";
import { useState } from "react";



export default function ScheduleForm({ fetchSchedules, id, handleClick }: any) {

    const [schedule, setSchedule] = useState({ content: '', date: '' });
    const [isRepeat, setIsRepeat] = useState(Boolean);
    const [repeatDate, setRepeatDate] = useState({ startDate: '', endDate: '' });

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isRepeat) {
            await createRepeated();
        } else {
            const response = await api.post(`/api/v1/schedules/${id}`, schedule);
            if (response.status == 200) {
                setSchedule({ content: '', date: '' });
                handleClick();
                fetchSchedules();
            } else {
                alert('등록에 실패했습니다.');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSchedule({ ...schedule, [name]: value });
        console.log({ ...schedule, [name]: value })
    }

    const handleCheck = () => {
        setIsRepeat(!isRepeat);
    }

    const handleRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRepeatDate({ ...repeatDate, [name]: value })
        if (repeatDate.startDate > repeatDate.endDate) {
            setRepeatDate({ startDate: '', endDate: '' });
            return alert('시작일은 종료일보다 늦을 수 없습니다.');
        }
        console.log({ ...repeatDate, [name]: value });
    }

    const formatDate = (date: any) => {
        return format(new Date(date), 'yyyy-MM-dd');
    }

    const createRepeated = async () => {
        const start = new Date(repeatDate.startDate);
        const end = new Date(repeatDate.endDate);
        for (let i = start; i <= end; i.setDate(i.getDate() + 1)) {
            const response = await api.post(`/api/v1/schedules/${id}`, { ...schedule, date: formatDate(i) });
            if (response.status !== 200) {
                alert('등록에 실패했습니다.');
            }
        }
        setSchedule({ content: '', date: '' });
        handleClick();
        fetchSchedules();
    }

    return (
        <div className="text-sm">
            <form onSubmit={create}>
                <label >내용</label>
                <input className="border w-full" type="text" name="content" value={schedule.content} onChange={handleChange} />
                <div className="between mt-1">
                    <label >일자</label>
                    <div className="daytitle">
                        <label >※반복</label>
                        <input className="m-1" type="checkbox" onChange={handleCheck} checked={isRepeat} />
                    </div>
                </div>
                {isRepeat ? <>
                    <label >시작</label>
                    <input className="border w-full" type="date" name="startDate" value={repeatDate.startDate} onChange={handleRepeat} />
                    <label >종료</label>
                    <input className="border w-full" type="date" name="endDate" value={repeatDate.endDate} onChange={handleRepeat} />
                </>
                    : <input className="border w-full" type="date" name="date" value={schedule.date} onChange={handleChange} />}

                <button className="border w-full mt-1 hover:bg-gray-200" type="submit">등록</button>
            </form>
        </div>
    )
}