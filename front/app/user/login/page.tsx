'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

    const router = useRouter();
    const [user, setUser] = useState({ username: '', password: '' });

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8070/api/v1/members/login", {
            method: "POST",
            credentials: "include", //핵심 변경점
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert('로그인 성공');
            router.push("/");
        } else {
            alert('로그인 실패');
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log({ ...user, [name]: value })
    }


    return (
        <>

            <h1>
                It's 로그인!
            </h1>
            <form onSubmit={onLogin}>
                <label >ID</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} />
                <label >PW</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} />
                <button type="submit">로그인</button>
            </form>

        </>
    );
}