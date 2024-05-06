import { BookEntity } from '../entities/book';

export interface IUserToken {
    user_id: number;
}

export interface ILoginResponse {
    user: {
        id: number,
        name: string,
        email: string,
        profilePicture: string
    },
    accessToken: string
}

export enum RoleEnum {
    ADMIN = 1,
    USER = 2
}

export type CollectionResponse = {
    id: number;
    title: string;
    description: string;
    owner_id: number;
    owner: string;
    books: BookEntity[];
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}[]
