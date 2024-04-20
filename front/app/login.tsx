import Link from 'next/link'
import './styles.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from './util/api';
import axios, { AxiosError } from 'axios';


export default function Login({ }) {
    const router = useRouter();
    const [user, setUser] = useState({ username: '', password: '' });

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/v1/users/login", user);
            if (response.status == 200) {
                alert('로그인 성공');
                router.push("/main");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const axiosErr = err as AxiosError<{message: string}>;
                if (axiosErr.response) {
                    alert(axiosErr.response.data.message);
                    console.error("서버에서 오류 응답을 받음:", axiosErr.response.data.message);
                } else if (axiosErr.request) {
                    console.error("요청이 전송되지 않음:", axiosErr.request);
                } else {
                    console.error("오류 발생:", axiosErr.message);
                }
            } else {
                console.error("알 수 없는 오류:", err);
            }
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log({ ...user, [name]: value });
    }
    return (
        <div className='right rounded-lg'>
            <form onSubmit={onLogin} className='loginBox'>
                <div className='loginElement'>
                    <label className="text-4xl font-bold text-gray-200" > ID</label>
                    <input className='loginInput rounded' type="text" name="username" value={user.username} onChange={handleChange} />
                </div>
                <div className='loginElement'>
                    <label className='text-4xl font-bold text-gray-200'>PW</label>
                    <input className='loginInput rounded' type="password" name="password" value={user.password} onChange={handleChange} />
                </div>
                <button className="mt-2 w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-200"
                    type="submit">로그인</button>
            </form>
            <div className='loginBottom mt-3'>
                <Link className=" rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    href={"/user/signup"}>회원가입</Link >
                <Link className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    href={"/user/find"}>ID/PW 찾기</Link >
            </div>
        </div>
    )
}