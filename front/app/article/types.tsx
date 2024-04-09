export interface ArticleData {
    id: number;
    title: string;
    content: string;
    createdDate: string;
    modifieDDate: string;
}

export interface ApiResponse<T> {
    resultCode: string;
    msg: string;
    data: T;
}