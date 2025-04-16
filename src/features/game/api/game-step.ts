'use server'

import { stepGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { left } from "@/shared/lib/either";
import { GameId } from "@/shared/types/ids";

export const gameStepAction = async ({ index, gameId }: { index: number, gameId: GameId }) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return left('not-found')
    }

    return await stepGame(gameId, currentUser, index)
}