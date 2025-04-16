import { GameId } from "@/shared/types/ids";
import { PlayerEntity } from "../model/types";
import { gameRepository } from "./game";
import { left, right } from "@/shared/lib/either";
import { gameEvents } from "../server";

export async function startGame(gameId: GameId, player: PlayerEntity) {
    const game = await gameRepository.getGame({ id: gameId })

    if (!game) {
        return left('game-not-found' as const)
    }

    if (game.status !== 'idle') {
        return left('game-status-not-idle' as const)
    }

    if (game.creator.id === player.id) {
        return left('creator-can-not-start-game' as const)
    }

    const newGame = await gameRepository.startGame(gameId, player)


    await gameEvents.emit({
        type: 'game-changed',
        data: newGame
    })

    return right(newGame)
}