'use server'

import { createGame } from "@/entities/game/server"
import { getCurrentUser } from "@/entities/user/server"
import { left } from "@/shared/lib/either"
import { redirect } from "next/navigation"

export const CreateGameAction = async () => {
    const user = await getCurrentUser()

    if (!user) {
        return left('user-not-found')
    }

    const gameResult = await createGame(user, "новая игра")

    if (gameResult.type === 'right') {
        redirect(`/game/${gameResult.value.id}`)
    }

    return gameResult
}