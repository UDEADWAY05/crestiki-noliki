import { Game, GameStatus, Prisma, User } from "@prisma/client";
import { GameEntity, GameIdleEntity, GameInProgressEntity, GameOverDrawEntity, GameOverEntity } from "../model/types";
import { prisma } from "@/shared/lib/db";
import { z } from 'zod'
import { removePassword } from "@/shared/lib/password";

const fieldSchema = z.array(z.union([z.string(), z.null()]))

async function gamesList(where?: Prisma.GameWhereInput) {
    const games = await prisma.game.findMany({
        where,
        include: {
            winner: true,
            players: true,
        }
    })

    return games.map(dbGameToGameEntity)
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
    const createdGame = await prisma.game.create({
        data: {
            name: game.name,
            status: game.status,
            id: game.id,
            field: Array(9).fill(null),
            players: {
                connect: { id: game.creator.id },
            }
        },
        include: {
            players: true,
            winner: true,
        }
    })

    return dbGameToGameEntity(createdGame)
}

function dbGameToGameEntity(
    game: Game & {
        players: User[];
        winner?: User | null;
    }
): GameEntity {
    const players = game.players.map(removePassword)
    switch (game.status) {
        case "idle": {
            const [creator] = players
            if (!creator) {
                throw new Error('creator shoud be in game over')
            }
            return {
                id: game.id,
                creator: creator,
                name: game.name,
                status: game.status,
            } satisfies GameIdleEntity;
        }
        case "inProgress": {
            return {
                id: game.id,
                players: players,
                status: game.status,
                name: game.name,
                field: fieldSchema.parse(game.field)
            } satisfies GameInProgressEntity;
        }
        case "gameOver": {
            if (!game.winner) {
                throw new Error('winner shoud be in game over')
            }
            return {
                id: game.id,
                players: players,
                status: game.status,
                name: game.name,
                field: fieldSchema.parse(game.field),
                winner: removePassword(game.winner),
            } satisfies GameOverEntity;
        }
        case "gameOverDraw": {
            return {
                id: game.id,
                players: players,
                status: game.status,
                name: game.name,
                field: fieldSchema.parse(game.field)
            } satisfies GameOverDrawEntity;
        }
    }
}

export const gameRepository = {
    gamesList,
    createGame
}