'use client'

import api from "@/app/util/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Signup() {

    const router = useRouter();
    const [siteUser, setSiteUser] = useState({
        username: '',
        password1: '',
        password2: '',
        nickname: '',
        email: ''
    });
    //초기 0, 중복 1, 없으면 2, 형식x 3
    const [checkID, setCheckID] = useState(0);
    const [checkNickname, setCheckNickname] = useState(0);
    const [checkEmail, setCheckEmail] = useState(0);

    const signup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await api.post("/api/v1/users", siteUser);
        if (response.status == 200) {
            setSiteUser({
                username: '',
                password1: '',
                password2: '',
                nickname: '',
                email: ''
            });
            alert(`${siteUser.username}님 가입을 환영합니다.`);
            router.push("/");
        } else {
            alert('가입에 실패했습니다.');
        }
    };

    const verifyId = () => {
        if (siteUser.username == '') {
            return alert("ID를 입력해주세요.")
        }
        const pattern =  /^[a-zA-Z0-9]+$/;
        if (!pattern.test(siteUser.username)) {
            return setCheckID(3);
        }
        api.post(`/api/v1/users/username?id=${siteUser.username}`)
            .then(response => response.data ?
                setCheckID(1) : setCheckID(2)
            );
    }
    const verifyNickname = () => {
        if (siteUser.nickname == '') {
            return alert("닉네임을 입력해주세요.")
        }
        const pattern = /^[a-zA-Z0-9가-힣]*$/;
        if (!pattern.test(siteUser.nickname)) {
            return setCheckNickname(3);
        }
        api.post(`/api/v1/users/nickname?nickname=${siteUser.nickname}`)
            .then(response => response.data ?
                setCheckNickname(1) : setCheckNickname(2)
            );
    }
    const verifyEmail = () => {
        if (siteUser.email == '') {
            return alert("이메일을 입력해주세요.")
        }
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(siteUser.email)) {
            return setCheckEmail(3);
        }
        api.post(`/api/v1/users/email?email=${siteUser.email}`)
            .then(response => response.data ?
                setCheckEmail(1) : setCheckEmail(2)
            );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSiteUser({ ...siteUser, [name]: value });
        console.log({ ...siteUser, [name]: value })
    }

    return (
        <div className="usercon">
            <form onSubmit={signup} className="signup">
                <div className="usercon m-6">
                    <span className="text-3xl font-bold">회원가입</span>
                </div>
                <div className="signup border rounded-md space-y-12 p-4">
                    <div className="border-gray-900/10 pb-6">
                        <div className="ml-2">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    ID
                                </label>
                                <div className="mt-1">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="username"
                                            autoComplete="username"
                                            className=" w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="아이디를 입력하세요."
                                            value={siteUser.username}
                                            onChange={handleChange}
                                        />
                                        <button type="button" onClick={verifyId} className="border-l border-gray-200 text-gray-400 px-2 py-1">확인</button>
                                    </div>
                                    {checkID == 1 ? <span className="text-xs text-red-600">중복된 아이디입니다.</span>
                                        : checkID == 2 ? <span className="text-xs text-green-600">사용 가능한 아이디입니다.</span> :
                                        checkID == 3 ? <span className="text-xs text-red-600">영어+숫자의 형태로 입력해주세요.</span> : <></>}
                                </div>
                                <label htmlFor="username" className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                                    비밀번호
                                </label>
                                <div className="mt-1">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="password"
                                            name="password1"
                                            autoComplete="password"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="비밀번호를 입력하세요."
                                            value={siteUser.password1}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <label htmlFor="username" className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                                    비밀번호 확인
                                </label>
                                <div className="mt-1">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="password"
                                            name="password2"
                                            autoComplete="password"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="비밀번호 확인을 입력하세요."
                                            value={siteUser.password2}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {siteUser.password1 != siteUser.password2 ?
                                    <span className="text-xs text-red-600">⚠ 비밀번호가 일치하지 않습니다.</span> : <></>}

                                <label htmlFor="username" className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                                    닉네임
                                </label>
                                <div className="mt-1">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="nickname"
                                            autoComplete="nickname"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="닉네임을 입력하세요."
                                            value={siteUser.nickname}
                                            onChange={handleChange}
                                        />
                                        <button type="button" onClick={verifyNickname} className="border-l border-gray-200 text-gray-400 px-2 py-1">확인</button>
                                    </div>
                                </div>
                                {checkNickname == 1 ? <span className="text-xs text-red-600">중복된 닉네임입니다.</span>
                                    : checkNickname == 2 ? <span className="text-xs text-green-600">사용 가능한 닉네임입니다.</span> :
                                     checkNickname == 3 ?<span className="text-xs text-red-600">잘못된 닉네임 형식입니다.</span> : <></>}
                                <label htmlFor="username" className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                                    이메일
                                </label>
                                <div className="mt-1">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="이메일을 입력하세요."
                                            value={siteUser.email}
                                            onChange={handleChange}
                                        />
                                        <button type="button" onClick={verifyEmail} className="border-l border-gray-200 text-gray-400 px-2 py-1">확인</button>
                                    </div>
                                </div>
                                {checkEmail == 1 ? <span className="text-xs text-red-600">중복된 이메일입니다.</span>
                                    : checkEmail == 2 ? <span className="text-xs text-green-600">사용 가능한 이메일입니다.</span> :
                                    checkEmail == 3 ?<span className="text-xs text-red-600">잘못된 이메일 형식입니다.</span> : <></>}
                            </div>


                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-end gap-x-6">
                        <Link className="hover:bg-gray-100 border rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-900" href="/">Cancel</Link>
                        <button
                            type="submit"
                            className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
                             text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                             ${siteUser.password1 != siteUser.password2 || siteUser.password1 == '' || siteUser.password2 == '' ||
                                    checkID != 2 || checkNickname != 2 || checkEmail != 2
                                    ? 'opacity-50 cursor-not-allowed' : 'bg-indigo-600'}`}
                        >
                            SingUp
                        </button>
                    </div>
                </div>


            </form>
        </div>
    )
}