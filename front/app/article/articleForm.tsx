

import { useEffect, useState } from "react";

export default function ArticleForm({ fetchArticle }: any) {

    const [article, setArticle] = useState({ title: '', content: '' });

    const [isClick, setIsClick] = useState(false);

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8070/api/v1/articles", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(article)
        });

        if (response.ok) {
            setArticle({ title: '', content: '' });
            setIsClick(!isClick);
            fetchArticle();
        } else {
            alert('게시물 등록에 실패했습니다.');
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
        console.log({ ...article, [name]: value })
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
                <input type="text" name="title" value={article.title} onChange={handleChange} />
                <label >내용</label>
                <textarea name="content" value={article.content} onChange={handleChange} />
                <button type="submit">등록</button>
            </form>
        </div>
    )
}

