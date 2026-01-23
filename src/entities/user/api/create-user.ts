import { Left, left, Right, right } from "@/shared/lib/either";
import { userApi } from "./user.api";
import { passwordService } from "../lib/password";
import cuid from "cuid";
import { UserEntity } from "../model/types";

export const DEFAULT_RATING = 1000

export const createUser = async ({ login, password }: { login: string; password: string; }): Promise<Right<UserEntity> | Left<string>> => {
    const userWithLogin = await userApi.getUser({ login });

    if (userWithLogin) {
        return left('user-login-exists')
    }

    const { hash, salt } = await passwordService.hashPassword(password)

    const user = await userApi.saveUser({
        id: cuid(),
        login,
        passwordHash: hash,
        rating: DEFAULT_RATING,
        salt
    })

    return right(user)
}
