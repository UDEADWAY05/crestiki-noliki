import cuid from "cuid";
import { PlayerEntity } from "../model/types";
import { gameRepository } from "./game";
import { left, right } from "@/shared/lib/either";
import { gameEvents } from "../server";

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
        status: "idle",
        field: Array(9).fill(null),
    });

    await gameEvents.emit({
        type: "game-created",
    });

    return right(createdGame);
};

//1:43.46