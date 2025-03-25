import { UserId } from "@/shared/types/ids";

export interface UserEntity {
    id: UserId;
    login: string;
    rating: number;
    passwordHash: string;
    salt: string
}

export interface SessionEntity {
    id: string;
    login: string;
    expiredAt: string;
}

export interface Auth {
    login: string;
    password: string;
}