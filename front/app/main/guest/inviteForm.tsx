'use client'

import { useEffect, useState } from "react";
import api from "../../util/api";
import { Guest } from "@/app/util/type";
import Link from "next/link";



export default function InviteForm({ curriculum, username, curriculumId }: any) {

    const [keyword, setKeyword] = useState(String);
    const [findUser, setFindUser] = useState([]);

    const [approvedGuestList, setApprovedGuestList] = useState<Guest[]>([]);
    const [waitingGuestList, setWaitingGuestList] = useState<Guest[]>([]);
    const [guestList, setGuestList] = useState<Guest[]>([]);
    const [usernameList, setUsernameList] = useState<String[]>([]);

    const [approvedGuestIsNull, setApprovedGuestIsNull] = useState(false);
    const [waitingGuestIsNull, setWaitingGuestIsNull] = useState(false);


    const fetchWaitingGuests = () => {
        api.get(`/api/v1/guests/curriculum/${curriculumId}/wait`)
            .then((response) => {
                setWaitingGuestList(response.data.data.guestList);

                setWaitingGuestIsNull(false);
            })
            .catch(err => {
                setWaitingGuestIsNull(true);
            });

    }

    const fetchApprovedGuests = () => {
        api.get(`/api/v1/guests/curriculum/${curriculumId}/approve`)
            .then((response) => {
                setApprovedGuestList(response.data.data.guestList);
                setApprovedGuestIsNull(false);
            })
            .catch(err => {
                setApprovedGuestIsNull(true);
            });
    }

    useEffect(() => {
        fetchWaitingGuests();
        console.log(waitingGuestList);
        fetchApprovedGuests();
        fetchGuests();

    }, [curriculumId]);

    const fetchGuests = () => {
        api.get(`/api/v1/guests/curriculum/${curriculumId}`)
            .then((response) => {
                setGuestList(response.data.data.guestList);
                const list: string[] = [];
                guestList.forEach((guest: any) => {
                    list.push(guest.username);
                });
                setUsernameList(list);
            })
    }

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
        console.log(findUser);
    };

    const invite = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        const response = await api.post(`/api/v1/guests/${curriculumId}?userId=${id}`);
        if (response.status == 200) {
            fetchWaitingGuests();
            setFindUser([]);
        } else {
            alert('초대에 실패했습니다.');
        }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setKeyword(value);
    }

    return (
        <div className="mt-1 text-sm">
            <form onSubmit={search}>
                <input className="border rounded w-full" type="text" name="keyword" value={keyword} onChange={handleSearchChange} />
                <button type="submit" className="border rounded w-full mt-1 hover:bg-gray-200">검색</button>
            </form>
            <div className="mt-2 max-h-40 overflow-auto">
                {findUser.length != 0 ? findUser.map((user: any) => (
                    <div key={user.id}>
                        <form className="between border rounded text-sm mt-1 pl-1 pt-1 pb-1" onSubmit={(e) => invite(e, user.id)}>
                            <div className="itemco ml-1">
                                <div className="itemco">
                                    <span className="curiname truncate font-bold ">ID: {user.username}</span>
                                    <span className="truncate text-xs">닉네임: {user.nickname}</span>
                                </div>
                                <div className="text-xs">
                                    <span >{user.email}</span>
                                </div>
                            </div>
                            <div className="ml-2 mr-1 ">
                                <div className="btngroup text-xs">
                                    {guestList.find((guest: Guest) =>
                                        guest.username == user.username
                                    ) ? <></>
                                        : <button className="border rounded mt-1 mb-1 mr-1 p-1 hover:bg-gray-200" type="submit">초대</button>}
                                </div>
                            </div>
                        </form>
                    </div>
                )) : <></>}
            </div>
        </div>
    )
}