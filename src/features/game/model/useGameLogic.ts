import { GameEntity, PlayerEntity } from "@/entities/game/model/types";
import { useEventsSource } from "@/shared/lib/sse/client";
import { GameId } from "@/shared/types/ids";
import { useOptimistic, useTransition } from "react";
import { gameStepAction } from "../api/game-step";
import { doStep } from "@/entities/game/lib/game-logic";

export function useGameLogic(gameId: GameId, player: PlayerEntity) {
    const { error, isPending, data } = useEventsSource<GameEntity | undefined>(`/game/${gameId}/stream`, undefined)

    const [isPendingTransition, startTransition] = useTransition()

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

    const step = (index: number) => {
        startTransition(async () => {
            // dispatchOptimistic(index)
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