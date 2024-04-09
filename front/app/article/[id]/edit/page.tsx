'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { ArticleData, ApiResponse } from "../../types"

interface ArticleResponse extends ApiResponse<ArticleData> { };

export default function EditArticle() {

    const router = useRouter();
    const params = useParams();
    const [article, setArticle] = useState({ title: '', content: '' });

    useEffect(() => {
        fetchArticle();
    }, []);

    const fetchArticle = () => {
        fetch(`http://localhost:8070/api/v1/articles/ ${params.id}`)
            .then(response => response.json())
            .then((result: ArticleResponse) => {
                if (result.msg === "성공") { setArticle(result.data.article); }
                else console.error(result.msg)
            });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            router.push(`/article/${params.id}`);
        } else {
            alert('게시물 수정에 실패했습니다.');
        }
    }
    
    const handleChange =(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setArticle({...article, [name]:value});
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                제목<input type="text" name="title" value={article.title} onChange={handleChange}/>
                내용<textarea name="content" value={article.content} onChange={handleChange}/>
                <button type="submit">저장</button>
            </form>
        </>
    )
}