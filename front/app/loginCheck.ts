import { useRouter } from "next/router";
import api from "./util/api";


export default async function LoginCheck() {
    let loginState;
    try {
        const response = await api.get('/api/v1/users/me');
        loginState = true;
    } catch {
        const response = await api.post("/api/v1/users/logout");
        loginState = false;
        
    }
    return loginState;
}



