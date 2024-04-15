import api from "@/app/util/api";
import { useState } from "react";



export default function ScheduleForm({ fetchSchedules, id }: any) {

    const [schedule, setSchedule] = useState({ content: '', date: ''});
    const [isClick, setIsClick] = useState(false);

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // try {
            const response = await api.post(`/api/v1/schedules/${id}`, schedule);
            if (response.status == 200) {
                setSchedule({ content: '', date: ''});
                setIsClick(!isClick);
                fetchSchedules();
            } else {
                alert('등록에 실패했습니다.');
            }
        // } catch (error: any) {
        //     alert(error);
        // }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSchedule({ ...schedule, [name]: value });
        console.log({ ...schedule, [name]: value })
    }

    const handleClick = () => {
        setIsClick(!isClick);
    }

    return (
        <div>
            {/* {!isClick ? (<button onClick={handleClick}>등록</button>) : (<></>)} */}
            {/* {isClick ? ( */}
            <form onSubmit={create}>
                <label >내용</label>
                <input type="text" name="content" value={schedule.content} onChange={handleChange} />
                <label >일자</label>
                <input type="date" name="date" value={schedule.date} onChange={handleChange} />
                <button type="submit">등록</button>
            </form>
        </div>
    )
}