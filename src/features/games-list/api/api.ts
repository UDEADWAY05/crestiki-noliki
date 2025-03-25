'use server'

import { createGame } from "@/entities/game/server"
import { getCurrentUser } from "@/entities/user/server"
import { left } from "@/shared/lib/either"
import { redirect } from "next/navigation"

type Props = {

}
export const CreateGameAction = async ({ }: Props) => {
    const user = await getCurrentUser()

    if (!user) {
        return left('user-not-found')
    }

    const gameResult = await createGame(user, "игра fafafafafa")

    if (gameResult.type === 'right') {
        redirect(`/game/${gameResult.value.id}`)
    }

    return gameResult
}