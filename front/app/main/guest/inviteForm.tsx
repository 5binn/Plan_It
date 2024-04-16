import { useState } from "react";
import api from "../../util/api";



export default function InviteForm({ fetchWaitingGuests, id }: any) {

    const [guestId, setGuestId] = useState({userId: 0});
    const [isClick, setIsClick] = useState(false);

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // try {
            const response = await api.post(`/api/v1/guests/${id}`, guestId);
            if (response.status == 200) {
                setGuestId({userId: 0});
                setIsClick(!isClick);
                fetchWaitingGuests();
            } else {
                alert('등록에 실패했습니다.');
            }
        // } catch (error: any) {
        //     alert(error);
        // }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGuestId({ ...guestId, [name]: value });
        console.log({ ...guestId, [name]: value })
    }

    const handleClick = () => {
        setIsClick(!isClick);
    }

    return (
        <div>
            {/* {!isClick ? (<button onClick={handleClick}>등록</button>) : (<></>)} */}
            {/* {isClick ? ( */}
            <form onSubmit={create}>
                <label >ID</label>
                <input className="border w-full" type="number" name="userId" value={guestId.userId} onChange={handleChange} />
                <button className="border w-full" type="submit">초대</button>
            </form>
        </div>
    )
}