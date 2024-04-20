
export interface Curriculum {
    id: number;
    name: string;
    host: Host;
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
    curriculumName: string;
    username: string;
    nickname: string;
    invite: string;
}

export interface Schedule {
    id: number;
    content: string;
    date: string;
    curriculum: Curriculum;
}

export interface Comment {
    id: number;
    content: string;
    author: Host;
}



