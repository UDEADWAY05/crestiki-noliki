import { Left, left, Right, right } from "@/shared/lib/either";
import { userApi } from "./user.api";
import { passwordService } from "../lib/password";
import cuid from "cuid";
import { UserEntity } from "../model/types";
import { sessionService } from "@/shared/lib/session";

export async function verifyUserPassword({ login, password }: {
    login: string,
    password: string
}) {
    const user = await userApi.getUser({ login })

    if (!user) {
        return left('wron-login-or-password')
    }

    const isCompare = await passwordService.comparePassword({
        hash: user.passwordHash,
        salt: user.salt,
        password
    })

    if (!isCompare) {
        return left('wron-login-or-password' as const)
    }

    return right(user)
}

