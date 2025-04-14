import { Game, GamePlayer, GameStatus, Prisma, User } from "@prisma/client";
import { GameEntity, GameIdleEntity, GameInProgressEntity, GameOverDrawEntity, GameOverEntity, PlayerEntity } from "../model/types";
import { prisma } from "@/shared/lib/db";
import { z } from 'zod'
import { GameId } from "@/shared/types/ids";

const gameInclude = {
    winner: {
        include: {
            user: true
        }
    },
    players: {
        include: {
            user: true
        }
    },
}

const fieldSchema = z.array(z.union([z.string(), z.null()]))

async function gamesList(where?: Prisma.GameWhereInput) {
    const games = await prisma.game.findMany({
        where,
        include: gameInclude
    })

    return games.map(dbGameToGameEntity)
}

async function startGame(gameId: GameId, player: PlayerEntity) {
    const updateGame = await prisma.game.update({
        where: {
            id: gameId
        },
        data: {
            players: {
                create: {
                    index: 1,
                    userId: player.id
                },
            },
            status: "inProgress",
        },
        include: gameInclude
    })

    return dbGameToGameEntity(updateGame)
}

async function saveGame(game: GameInProgressEntity | GameOverDrawEntity | GameOverEntity) {
    const winnerId = game.status === 'gameOver' ? await prisma.gamePlayer.findFirstOrThrow({
        where: { userId: game.winner.id },
    }).then((p) => p.id) : undefined

    const updateGame = await prisma.game.update({
        where: {
            id: game.id
        },
        data: {
            status: game.status,
            field: game.field,
            winnerId: winnerId
        },
        include: gameInclude
    })

    return dbGameToGameEntity(updateGame)
}


async function getGame(where?: Prisma.GameWhereInput) {
    const game = await prisma.game.findFirst({
        where,
        include: gameInclude
    })

    if (game) {
        return dbGameToGameEntity(game)
    }

    return undefined
}


async function createGame(game: GameIdleEntity): Promise<GameEntity> {
    const createdGame = await prisma.game.create({
        data: {
            name: game.name,
            status: game.status,
            id: game.id,
            field: Array(9).fill(null),
            players: {
                create: {
                    index: 0,
                    userId: game.creator.id
                },
            }
        },
        include: gameInclude
    })

    return dbGameToGameEntity(createdGame)
}

function dbGameToGameEntity(
    game: Game & {
        players: Array<GamePlayer & { user: User }>;
        winner?: GamePlayer & { user: User } | null;
    }
): GameEntity {
    const players = game.players.sort((a, b) => a.index - b.index).map(dbPlayerToPlayer)
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
                field: fieldSchema.parse(game.field)
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
                winner: dbPlayerToPlayer(game.winner),
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

export const dbPlayerToPlayer = (db: GamePlayer & { user: User }): PlayerEntity => {
    return {
        id: db.user.id,
        login: db.user.login,
        rating: db.user.rating
    }
}

export const gameRepository = {
    gamesList,
    createGame,
    getGame,
    startGame,
    saveGame
}