import cuid from "cuid";
import { GameIdleEntity, PlayerEntity } from "../model/types";
import { gameRepository } from "./game";
import { left, right } from "@/shared/lib/either";

export const createGame = async (player: PlayerEntity, name: string) => {
    const playerGames = await gameRepository.gamesList({
        players: { some: { id: player.id } },
        status: 'idle'
    })

    const isGameInIdleStatus = playerGames.some(game => game.status === 'idle' && game.creator.id === player.id)

    if (isGameInIdleStatus) {
        return left('can-create-only-one-game')
    }

    const createdGame = await gameRepository.createGame({
        id: cuid(),
        name: name,
        creator: player,
        field: Array(9).fill(null),
        status: 'idle'
    })

    return right(createdGame as GameIdleEntity)
};

//1:43.46