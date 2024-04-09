'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticleData, ApiResponse } from "./types"
import ArticleForm from "./articleForm";

interface ArticleListResponse extends ApiResponse<ArticleData[]> { };

export default function Article() {

    const [articleList, setArticleList] = useState<ArticleData[]>([]);

    useEffect(() => {
        fetchArticle();
    }, []);

    const fetchArticle = () => {
        fetch("http://localhost:8070/api/v1/articles")
            .then(data => data.json())
            .then((result: ArticleListResponse) => setArticleList(result.data.articleList));
    }

    const onDelete = async (id: number) => {
        const response = await fetch(`http://localhost:8070/api/v1/articles/ ${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (response.ok) {
            alert('게시물 삭제 완료');
            fetchArticle();
        } else {
            alert('게시물 삭제 실패했습니다.');
        }
    }


    if (!articleList) {
        return <div>Loading...</div>; // 로딩 중 메시지 표시
    }



    return (
        <div>
            <ArticleForm fetchArticle={fetchArticle} />
            {articleList.map(article =>
                <li key={article.id}>
                    <Link href={"/article/" + article.id}>{article.title}</Link> /
                    <Link href={"/article/" + article.id}> {article.content}</Link>
                    <button onClick={() => onDelete(article.id)}> 삭제</button>
                </li>)}
        </div>
    )
}


