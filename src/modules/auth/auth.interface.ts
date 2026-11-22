
export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: "contributor" | "maintainer";
    created_at?: Date;
}

export interface ISignupPayload {
    name: string;
    email: string;
    password: string;
    role?: "contributor" | "maintainer";
}

export interface ILoginPayload {
    email: string;
    password: string;
}
