'use client'

import { useEffect, useState } from "react";
import api from "../../util/api";
import { Guest } from "@/app/util/type";



export default function InviteForm({ guestList, fetchWaitingGuests, curriculumId }: any) {

    const [keyword, setKeyword] = useState(String);
    const [findUser, setFindUser] = useState([]);
    const [usernameList, setUsernameList] = useState<string[]>([]);

    useEffect(() => {
        const list: string[] = [];
        guestList.forEach((guest: any) => {
            list.push(guest.username);
        });
        setUsernameList(list);
        console.log(usernameList);
    })

    const search = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword == '') {
            return alert('검색어를 입력하세요')
        }
        await api.get(`/api/v1/users?kw=${keyword}`)
            .then((response) => {
                setFindUser(response.data.data.userDtoList);
                setKeyword('');
            })
            .catch((err) => {
            })
    };

    const invite = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        const response = await api.post(`/api/v1/guests/${curriculumId}?userId=${id}`);
        if (response.status == 200) {
            fetchWaitingGuests();
        } else {
            alert('초대에 실패했습니다.');
        }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setKeyword(value);
    }

    return (
        <div>
            {/* {!isClick ? (<button onClick={handleClick}>등록</button>) : (<></>)} */}
            {/* {isClick ? ( */}
            <form onSubmit={search}>
                <input className="border w-full" type="text" name="keyword" value={keyword} onChange={handleSearchChange} />
                <button type="submit" className="border w-full">검색</button>
            </form>
            {findUser.length != 0 ? findUser.map((user: any) => (
                <div key={user.id}>
                    <form onSubmit={(e) => invite(e, user.id)}>
                        <span>ID:{user.username}/</span>
                        <span>닉네임:{user.nickname}</span>
                        {usernameList.includes(user.username) ?
                            <button className="border rounded-md" type="submit" >초대</button>
                            : <></>
                        }
                        <button className="border rounded-md" type="submit" >초대</button>
                    </form>
                </div>
            )) : <></>}
        </div>
    )
}