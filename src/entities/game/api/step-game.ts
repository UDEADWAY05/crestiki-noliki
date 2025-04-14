import { GameId } from "@/shared/types/ids";
import { PlayerEntity } from "../model/types";
import { gameRepository } from "./game";
import { left, right } from "@/shared/lib/either";
import { doStep } from "../lib/game-logic";

export async function stepGame(gameId: GameId, player: PlayerEntity, index: number) {
    const game = await gameRepository.getGame({ id: gameId })

    if (!game) {
        return left('game-not-found')
    }

    if (game.status !== 'inProgress') {
        return left('game-is-not-in-progress')
    }

    if (!game.players.some(p => p.id === player.id)) {
        return left('player-is-not-in-game')
    }

    const stepResult = doStep({ game, index, player })

    if (stepResult?.type === 'left') {
        return stepResult;
    }

    return right(await gameRepository.saveGame(stepResult.value))
}