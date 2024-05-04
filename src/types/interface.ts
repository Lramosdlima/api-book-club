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
