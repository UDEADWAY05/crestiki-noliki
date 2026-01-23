import { prisma } from "@/shared/lib/db";
import { Prisma } from "@prisma/client";
import { UserEntity } from "../model/types";

export function saveUser(user: UserEntity): Promise<UserEntity> {
    return prisma.user.upsert({
        where: {
            id: user.id
        },
        create: user,
        update: user
    })
}

export function getUser(where: Prisma.UserWhereInput) {
    return prisma.user.findFirst({ where })
}

export const userApi = {
    saveUser,
    getUser
}