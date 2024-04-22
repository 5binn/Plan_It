


import { useState } from "react";
import api from "@/app/util/api";
import "../../styles.css"



export default function CommentForm({ scheduleId, fetchComments }: any) {

    const [comment, setComment] = useState({ content: '' });

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await api.post(`/api/v1/comments/${scheduleId}`, comment);
        if (response.status == 200) {
            setComment({content:''});
            fetchComments();
        } else {
            alert('등록에 실패했습니다.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComment({ ...comment, [name]: value });
        console.log({ ...comment, [name]: value })
    }

    return (
        <form className="text-sm" onSubmit={create}>
            <label className="text-base m-1 font-semibold">댓글</label>
            <textarea className="mt-1 p-2 border rounded w-full resize-none drop-shadow"
                placeholder="댓글을 입력해주세요."
                name="content" value={comment.content} onChange={handleChange} />
            <div className="flex justify-end">
                <button className=" border rounded mt-1 hover:bg-gray-200 h-full px-2 py-1 drop-shadow" type="submit">등록</button>
            </div>
        </form>
    )
}