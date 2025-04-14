'use server'

import { stepGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { left } from "@/shared/lib/either";
import { GameId } from "@/shared/types/ids";
import { gameEvents } from "./game-events";

export const gameStepAction = async ({ index, gameId }: { index: number, gameId: GameId }) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return left('not-found')
    }

    const result = await stepGame(gameId, currentUser, index)

    if (result.type === 'right') {
        gameEvents.emit(result.value);

        return result;
    }

    return result;
}