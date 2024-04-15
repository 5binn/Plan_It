
import { useState } from "react";
import api from "@/app/util/api";



export default function CurriculumForm({ fetchCurriculums }: any) {

    const [curriculum, setCurriculum] = useState({ name: '', startDate: '', endDate: '' });

    const [isClick, setIsClick] = useState(false);

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (curriculum.startDate > curriculum.endDate) {
            return alert('시작일은 종료일보다 늦을 수 없습니다.');
        }
        const response = await api.post("/api/v1/curriculums", curriculum);
        if (response.status == 200) {
            setCurriculum({ name: '', startDate: '', endDate: '' });
            setIsClick(!isClick);
            fetchCurriculums();
        } else {
            alert('등록에 실패했습니다.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurriculum({ ...curriculum, [name]: value });
        console.log({ ...curriculum, [name]: value })
    }

    const handleClick = () => {
        setIsClick(!isClick);
    }

    return (
        <div>
            {/* {!isClick ? (<button onClick={handleClick}>등록</button>) : (<></>)} */}
            {/* {isClick ? ( */}
            <form onSubmit={create}>
                <label >제목</label>
                <input type="text" name="name" value={curriculum.name} onChange={handleChange} />
                <label >시작일</label>
                <input type="date" name="startDate" value={curriculum.startDate} onChange={handleChange} />
                <label >종료일</label>
                <input type="date" name="endDate" value={curriculum.endDate} onChange={handleChange} />
                <button type="submit">등록</button>
            </form>
        </div>
    )
}