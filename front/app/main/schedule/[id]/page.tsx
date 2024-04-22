'use client'

import api from "@/app/util/api";
import { Comment, Curriculum, Guest, Schedule } from "@/app/util/type";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommentForm from "../../comment/commentForm";
import { format } from "date-fns";
import Roulette from "../../roulette/roulette";


export default function Id() {
    const params = useParams();
    const router = useRouter();


    const [schedule, setSchedule] = useState<Schedule>();
    const [curriculum, setCurriculum] = useState<Curriculum | undefined>();
    const [approvedGuestList, setApprovedGuestList] = useState<Guest[]>([]);
    const [approvedGuestIsNull, setApprovedGuestIsNull] = useState(false);

    const [username, setUsername] = useState<string | undefined>();

    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [commentListIsNull, setCommentListIsNull] = useState(false);
    const [isOpenComment, setIsOpenComment] = useState<Number | null>(null);
    const [isOpenSchedule, setIsOpenSchedule] = useState<Number | null>(null);
    const [upComment, setUpComment] = useState({ content: '' });
    const [upSchedule, setUpSchedule] = useState({ content: '' });

    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(!isOpenModal);
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
        fetchContents();
        fetchComments();
    }, [params.id]);

    const fetchContents = () => {
        api.get(`/api/v1/schedules/${params.id}`)
            .then((response) => {
                setSchedule(response.data.data.schedule);
                setCurriculum(response.data.data.schedule.curriculum)
                api.get(`/api/v1/guests/curriculum/${response.data.data.schedule.curriculum.id}/approve`)
                    .then((response) => {
                        setApprovedGuestList(response.data.data.guestList);
                        setApprovedGuestIsNull(false);
                    })
                    .catch(err => {
                        setApprovedGuestIsNull(true);
                    });
            })
    };

    const fetchComments = () => {
        api.get(`/api/v1/comments/schedule/${params.id}`)
            .then((response) => {
                setCommentList(response.data.data.commentList);
                setCommentListIsNull(false);
            })
            .catch(err => {
                setCommentListIsNull(true);
            });
    }

    const formatDate = (date: any) => {
        return format(new Date(date), 'yy.MM.dd HH:mm');
    }

    const onDeleteComment = async (commentId: number) => {
        await api.delete(`/api/v1/comments/${commentId}`)
        fetchComments();
    }

    const onDeleteSchedule = async (scheduleId: any) => {
        await api.delete(`/api/v1/schedules/${scheduleId}`)
            .then(() => router.push(`/main/curriculum/${curriculum?.id}`))
            .catch(() => alert("삭제 실패"))

    }

    const openCommentForm = (id: Number) => {
        if (isOpenComment == null) {
            setIsOpenComment(id);
            api.get(`/api/v1/comments/${id}`)
                .then(response => setUpComment(response.data.data.comment));
        } else {
            setIsOpenComment(null)
        }
    }

    const openScheduleForm = (id: any) => {
        if (isOpenSchedule == null) {
            setIsOpenSchedule(id);
            api.get(`/api/v1/schedules/${id}`)
                .then(response => setUpSchedule(response.data.data.schedule));
        } else {
            setIsOpenSchedule(null)
        }
    }

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpComment({ ...upComment, [name]: value });
        console.log({ ...upComment, [name]: value })
    }

    const handleScheduleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpSchedule({ ...upSchedule, [name]: value });
        console.log({ ...upSchedule, [name]: value })
    }

    const updateComment = async (e: React.FormEvent<HTMLFormElement>, commentId: number) => {
        e.preventDefault();
        const response = await api.patch(`/api/v1/comments/${commentId}`, upComment);
        if (response.status == 200) {
            setUpComment({ content: '' });
            setIsOpenComment(null);
            fetchComments();
        } else {
            alert('수정에 실패했습니다.');
        }
    };

    const updateSchedule = async (e: React.FormEvent<HTMLFormElement>, scheduleId: any) => {
        e.preventDefault();
        const response = await api.patch(`/api/v1/schedules/${scheduleId}`, upSchedule);
        if (response.status == 200) {
            setUpSchedule({ content: '' });
            setIsOpenSchedule(null);
            fetchContents();
        } else {
            alert('수정에 실패했습니다.');
        }
    };

    return (
        <>
            <div className="w-screen max-w-screen-xl between items-center m-3 drop-shadow">
                <div className="flex items-center ml-2">
                    <Link href={"/main"} className="font-semibold text-2xl">Home /</Link>
                    <Link href={"/main/curriculum/" + curriculum?.id} className="ml-2">
                        <div className="font-semibold text-2xl"> {curriculum?.name}</div>
                    </Link>
                    <Link href={"/main/schedule/" + schedule?.id} className="max-w-60 truncate ml-2 font-semibold text-2xl">/ {schedule?.content}</Link>
                </div>
                <div className="mr-2">
                    {!approvedGuestIsNull ? approvedGuestList.map((guest: Guest) => {
                        return guest.username !== curriculum?.host.username ? (
                            <div key={guest.id}>
                                <span className="border rounded pl-1 pr-1 ml-1">{guest.nickname}</span>
                            </div>
                        ) : (
                            <></>
                        );
                    }) : <span className="text-base">초대된 회원이 없습니다.</span>}
                </div>
            </div>
            <div className="w-screen max-w-screen-xl flex flex-col items-center mt-3">
                <div className="flex justify-between border w-2/3 p-3 rounded-lg drop-shadow">
                    <div>
                        <div className="text-2xl font-semibold whitespace-pre-line">{schedule?.content}</div>
                        <div>{schedule?.date}</div>
                    </div>
                    <div className="ml-2 mr-1 ">
                        {username == curriculum?.host.username ?
                            <div className="btngroup text-xs">
                                {schedule?.id == isOpenSchedule ? <button className="border rounded  p-1 hover:bg-gray-200" onClick={() => openScheduleForm(schedule?.id)}>취소</button>
                                    : <button className="border rounded  p-1 hover:bg-gray-200" onClick={() => openScheduleForm(schedule?.id)}>수정</button>}
                                <button className="border rounded mt-1 p-1 hover:bg-gray-200" onClick={() => onDeleteSchedule(schedule?.id)}>삭제</button>
                            </div>
                            : <div>
                            </div>}
                    </div>
                </div>
                {schedule?.id == isOpenSchedule ?
                            <div className="text-sm w-screen max-w-screen-xl flex flex-col items-center">
                                <form className="text-sm w-2/3" onSubmit={(e) => updateSchedule(e, schedule?.id)}>
                                    <textarea className="mt-1 p-3 border rounded w-full resize-none drop-shadow"
                                        name="content" value={upSchedule?.content} onChange={handleScheduleChange} />
                                    <div className="flex justify-end">
                                        <button className="border rounded mb-2 p-1 hover:bg-gray-200 drop-shadow" type="submit">수정</button>
                                    </div>
                                </form>
                            </div>
                            : <></>}
                <div className="w-2/3 p-3">
                    <CommentForm scheduleId={schedule?.id} fetchComments={fetchComments}></CommentForm>
                </div>
                <div className="w-2/3 p-3">
                    {!commentListIsNull ? commentList.map((comment: Comment) => (
                        <>
                            <div className="between mt-1 border p-3 rounded-lg drop-shadow" key={comment.id}>
                                <div className="itemco ml-1">
                                    <div className="itemco">
                                        <span className="font-bold whitespace-pre-line">{comment.content}</span>
                                        <span className="text-xs">{comment.author.nickname}</span>
                                    </div>
                                    <div className="text-xs">
                                        <span >{formatDate(comment.modifiedDate)}</span>
                                    </div>
                                </div>
                                <div className="ml-2 mr-1 ">
                                    {username == comment.author.username ?
                                        <div className="btngroup text-xs">
                                            {comment.id == isOpenComment ? <button className="border rounded  p-1 hover:bg-gray-200" onClick={() => openCommentForm(comment.id)}>취소</button>
                                                : <button className="border rounded  p-1 hover:bg-gray-200" onClick={() => openCommentForm(comment.id)}>수정</button>}
                                            <button className="border rounded mt-1 p-1 hover:bg-gray-200" onClick={() => onDeleteComment(comment.id)}>삭제</button>
                                        </div>
                                        : <div>
                                        </div>}
                                </div>
                            </div>
                            {comment.id == isOpenComment ?
                                <div className="text-sm">
                                    <form className="text-sm" onSubmit={(e) => updateComment(e, comment.id)}>
                                        <textarea className="mt-1 p-3 border rounded w-full resize-none drop-shadow"
                                            name="content" value={upComment?.content} onChange={handleCommentChange} />
                                        <div className="flex justify-end">
                                            <button className="border rounded mb-2 p-1 hover:bg-gray-200 drop-shadow" type="submit">수정</button>
                                        </div>
                                    </form>
                                </div>
                                : <></>}
                        </>
                    )) :
                        <div className="mt-1 border p-3 rounded-lg drop-shadow flex justify-center">
                            <span className="font-semibold">등록된 댓글이 없습니다.</span>
                        </div>}
                </div>
                <button className="border" onClick={openModal}>룰렛</button>
                {isOpenModal ? <Roulette openModal={openModal}></Roulette>: <></>}
            </div>
            
        </>
    )
}