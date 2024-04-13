
export interface Curriculum {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}
export interface Host {
    id: number;
    username: string;
    nickname: string;
    email: string;
}

export interface Guest {
    id: number;
    userName: string;
    invite: string;
}

export interface Schedule {
    id: number;
    content: string;
    date: string;
}

export interface Comment {
    id: number;
    content: string;
    author: Host;
}



