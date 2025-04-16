import { GameId } from "@/shared/types/ids";
import { PlayerEntity } from "../model/types";
import { gameRepository } from "./game";
import { left, right } from "@/shared/lib/either";
import { gameEvents } from "../server";

export async function surrenderGame(gameId: GameId, player: PlayerEntity) {
    const game = await gameRepository.getGame({ id: gameId })


    if (!game) {
        return left('game-not-found' as const)
    }

    if (game.status !== 'inProgress') {
        return left('game-is-not-in-progress' as const)
    }

    if (!game.players.some(p => p.id === player.id)) {
        return left('player-is-not-in-game' as const)
    }


    const newGame = await gameRepository.saveGame({
        ...game,
        status: "gameOver",
        winner: game.players.find(p => p.id !== player.id)!
    })


    await gameEvents.emit({
        type: 'game-changed',
        data: newGame,
    })

    return right(newGame)
}