import Link from 'next/link'
import './styles.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from './util/api';


export default function Login({ }) {
    const router = useRouter();
    const [user, setUser] = useState({ username: '', password: '' });

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await api.post("/api/v1/users/login", user);
        if (response.status == 200) {
            alert('로그인 성공');
            router.push("/main");
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
        <div className='right'>
            <form onSubmit={onLogin} className='loginBox'>
                <div className='loginElement'>
                    <label className="loginLabel" > ID</label>
                    <input className='loginInput' type="text" name="username" value={user.username} onChange={handleChange} />
                </div>
                <div className='loginElement'>
                    <label className='loginLabel'>PW</label>
                    <input className='loginInput' type="password" name="password" value={user.password} onChange={handleChange} />
                </div>
                <button className='loginBtn' type="submit">로그인</button>
            </form>
            <div className='loginBottom'>
                <Link className='loginLink' href={"/"}>회원가입</Link >
                <Link className='loginLink' href={"/"}>ID/PW 찾기</Link >
            </div>
        </div>
    )
}