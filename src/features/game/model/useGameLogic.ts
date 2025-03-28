import { GameEntity } from "@/entities/game/model/types";
import { useEventsSource } from "@/shared/lib/sse/client";
import { GameId } from "@/shared/types/ids";

export function useGameLogic(gameId: GameId) {
    const { data, error, isPending } = useEventsSource<GameEntity | undefined>(`/game/${gameId}/stream`, undefined)

    return {
        data,
        error,
        isPending
    }
}