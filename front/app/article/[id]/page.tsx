'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleData, ApiResponse } from "../types"
import Link from "next/link";

interface ArticleResponse extends ApiResponse<ArticleData> { };

export default function Id() {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState<ArticleData | null>(null);

    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8070/api/v1/articles/ ${params.id}`)
            .then(response => response.json())
            .then((result: ArticleResponse) => {
                if (result.msg === "성공") { setArticle(result.data.article); }
                else console.error(result.msg)
            });
    }, [params.id]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString(); // 현재 로케일에 맞는 형식으로 날짜를 반환
    };

    if (!article) {
        return <div>Loading...</div>; // 로딩 중 메시지 표시
    }

    const onDelete = async () => {
        const response = await fetch(`http://localhost:8070/api/v1/articles/ ${params.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (response.ok) {
            alert('게시물 삭제 완료');
            router.push("/article");
        } else {
            alert('게시물 삭제 실패했습니다.');
        }
    }

    const handleClick = () => {
        setIsClick(!isClick);
    }

    const save = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8070/api/v1/articles/${params.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(article)
        });

        if (response.ok) {
            alert('수정 완료');
            setIsClick(!isClick);
        } else {
            alert('게시물 수정에 실패했습니다.');
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
        console.log({ ...article, [name]: value })
    }


    return (
        <div>
            <h1>{article?.id}번 / TITLE : {article?.title}</h1>
            <h3>{formatDate(article.createdDate)}</h3>
            <div>
                {article?.content}
            </div>
            <button onClick={handleClick}>수정</button>
            <Link href={`/article/${article.id}/edit`}>-수정-</Link>
            <button onClick={onDelete}>삭제</button>
            {isClick ? (
                <form onSubmit={save}>
                    제목<input type="text" name="title" value={article.title} onChange={handleChange}/>
                    내용<textarea name="content" value={article.content} onChange={handleChange}/>
                    <button type="submit">저장</button>
                </form>
            ) : (<></>)}
        </div>
    );

}