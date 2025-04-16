import { GameEntity } from "@/entities/game/model/types";
import { useEventsSource } from "@/shared/lib/sse/client";
import { GameId } from "@/shared/types/ids";
import { useTransition } from "react";
import { gameStepAction } from "../api/game-step";

export function useGameLogic(gameId: GameId) {
    const { error, isPending, data } = useEventsSource<GameEntity | undefined>(`/game/${gameId}/stream`, undefined)

    const [isPendingTransition, startTransition] = useTransition()

    const step = (index: number) => {
        startTransition(async () => {
            await gameStepAction({ gameId, index })
        })
    }
    return {
        data: data,
        error,
        step,
        isStepPending: isPendingTransition,
        isPending: isPending
    }
}




// const [optimisticGame, dispatchOptimistic] = useOptimistic(data, (game, index: number) => {
//     if (!game || game.status !== 'inProgress') {
//         return game;
//     }
//     const result = doStep({ game, player, index })

//     if (result.type === 'right') {
//         return result.value
//     }

//     return game
// })
