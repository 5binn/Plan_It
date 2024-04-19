'use client'

import api from "@/app/util/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Find() {

    const router = useRouter();

    const [siteUser, setSiteUser] = useState({
        username: '',
        password1: '',
        password2: '',
        email1: '',
        email2: ''
    });
    //초기 0, 중복 1, 없으면 2, 형식x 3
    const [checkID, setCheckID] = useState(0);
    const [checkEmail1, setCheckEmail1] = useState(0);
    const [checkEmail2, setCheckEmail2] = useState(0);
    const [sendId, setSendId] = useState(0);
    const [sendPW, setSendPW] = useState(0);

    const verifyId = () => {
        if (siteUser.username == '') {
            return alert("ID를 입력해주세요.")
        }
        const pattern = /^[a-zA-Z0-9]+$/;
        if (!pattern.test(siteUser.username)) {
            return setCheckID(3);
        }
        api.post(`/api/v1/users/username?id=${siteUser.username}`)
            .then(response => response.data ?
                setCheckID(1) : setCheckID(2)
            );
    }
    const verifyEmail1 = () => {
        if (siteUser.email1 == '') {
            return alert("이메일을 입력해주세요.")
        }
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(siteUser.email1)) {
            return setCheckEmail1(3);
        }
        api.post(`/api/v1/users/email?email=${siteUser.email1}`)
            .then(response => response.data ?
                setCheckEmail1(1) : setCheckEmail1(2)
            );
    }
    const verifyEmail2 = () => {
        if (siteUser.email2 == '') {
            return alert("이메일을 입력해주세요.")
        }
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(siteUser.email2)) {
            return setCheckEmail2(3);
        }
        api.post(`/api/v1/users/email?email=${siteUser.email2}`)
            .then(response => response.data ?
                setCheckEmail2(1) : setCheckEmail2(2)
            );
    }

    const findId = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSendId(1);
        const response = await api.post(`/api/v1/users/find/id?email=${siteUser.email1}`);
        console.log(response.status)
        if (response.status == 200) {
            alert("ID를 해당 메일로 발송하였습니다.")
            router.push("/")
        } else {
            alert("발송 실패");
        }
    }

    const findPW = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSendPW(1);
        const response = await api.post(`/api/v1/users/find/pw?email=${siteUser.email2}`);
        console.log(response.status)
        if (response.status == 200) {
            alert("임시 비밀번호를 해당 메일로 발송하였습니다.")
            router.push("/")
        } else {
            alert("발송 실패");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSiteUser({ ...siteUser, [name]: value });
        console.log({ ...siteUser, [name]: value })
    }

    return (
        <div className="usercon">
            <form onSubmit={findId} className="signup">
                <div className="usercon m-6">
                    <span className="text-3xl font-bold">ID찾기</span>
                </div>
                <div className="signup border rounded-md space-y-12 p-4">
                    <div className="border-gray-900/10">
                        <div className="ml-2">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="mt-2 block text-sm font-bold leading-6 text-gray-900">
                                    이메일
                                </label>
                                <div className="mt-1">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="email"
                                            name="email1"
                                            autoComplete="email1"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="이메일을 입력하세요."
                                            value={siteUser.email1}
                                            onChange={handleChange}
                                        />
                                        <button type="button" onClick={verifyEmail1} className="border-l border-gray-200 text-gray-400 px-2 py-1">확인</button>
                                    </div>
                                </div>
                                {checkEmail1 == 1 ? <span className="text-xs text-green-600">이메일이 확인되었습니다.</span>
                                    : checkEmail1 == 2 ? <span className="text-xs text-red-600">존재하지 않는 이메일입니다.</span> :
                                        checkEmail1 == 3 ? <span className="text-xs text-red-600">잘못된 이메일 형식입니다.</span> : <></>}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6">
                        <Link className="hover:bg-gray-100 border rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-900" href="/">Cancel</Link>
                        <button type="submit"
                            className={`text-sm font-semibold text-white rounded-md bg-blue-600 px-3 py-2  shadow-sm
                             hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 
                             focus-visible:outline-offset-2 focus-visible:outline-blue-600
                             ${checkEmail1 != 1 ? 'opacity-50 cursor-not-allowed disabled:' : 'bg-blue-600'}`}
                             disabled={checkEmail1 != 1}
                             >
                            {sendId == 1 ? <>
                            {/* <span className="border-t-4 border-l-4 border-gray-300 rounded-full w-5 h-5 animate-spin text-blue-500"></span> */}
                            Find...</> : <>Find ID</>}
                        </button>
                    </div>
                </div>
            </form>
            
            <form onSubmit={findPW} className="signup">
                <div className="usercon m-6">
                    <span className="text-3xl font-bold">PW찾기</span>
                </div>
                <div className="signup border rounded-md space-y-12 p-4">
                    <div className="border-gray-900/10">
                        <div className="ml-2">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-bold leading-6 text-gray-900">
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
                                    {checkID == 1 ? <span className="text-xs text-green-600">아이디가 확인되었습니다.</span>
                                        : checkID == 2 ? <span className="text-xs text-red-600">존재하지 않는 아이디입니다.</span> :
                                            checkID == 3 ? <span className="text-xs text-red-600">영어+숫자의 형태로 입력해주세요.</span> : <></>}
                                </div>
                                <label htmlFor="username" className="mt-2 block text-sm font-bold leading-6 text-gray-900">
                                    이메일
                                </label>
                                <div className="mt-1">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="email"
                                            name="email2"
                                            autoComplete="email2"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="이메일을 입력하세요."
                                            value={siteUser.email2}
                                            onChange={handleChange}
                                        />
                                        <button type="button" onClick={verifyEmail2} className="border-l border-gray-200 text-gray-400 px-2 py-1">확인</button>
                                    </div>
                                </div>
                                {checkEmail2 == 1 ? <span className="text-xs text-green-600">이메일이 확인되었습니다.</span>
                                    : checkEmail2 == 2 ? <span className="text-xs text-red-600">존재하지 않는 이메일입니다.</span> :
                                        checkEmail2 == 3 ? <span className="text-xs text-red-600">잘못된 이메일 형식입니다.</span> : <></>}

                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6">
                        <Link className="hover:bg-gray-100 border rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-900" href="/">Cancel</Link>
                        <button
                            type="submit"
                            className={`rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold
                             text-white shadow-sm hover:bg-blue-500 focus-visible:outline 
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
                             ${checkID != 1 || checkEmail2 != 1
                                    ? 'opacity-50 cursor-not-allowed disabled:' : 'bg-blue-600'}`}
                                    disabled={checkID != 1 || checkEmail2 != 1}
                        >
                            {sendPW == 1 ? "Find..." : "Find PW"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}