import { GameId, UserId } from "@/shared/types/ids";

export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity

export type GameIdleEntity = {
    id: GameId;
    name: string;
    creator: PlayerEntity;
    field: Field
    status: "idle";
}
export type GameInProgressEntity = {
    id: GameId;
    players: PlayerEntity[];
    name: string;
    field: Field
    status: "inProgress";
}

export type GameOverEntity = {
    id: GameId;
    players: PlayerEntity[];
    name: string;
    field: Field
    status: "gameOver";
    winner: PlayerEntity
}

export type GameOverDrawEntity = {
    id: GameId;
    players: PlayerEntity[];
    name: string;
    field: Field
    status: "gameOverDraw";
}


export type PlayerEntity = {
    id: UserId;
    login: string;
    rating: number
}

export type Field = Cell[]

export type Cell = string | null

export type GameSymbol = string

export const GameSymbol = {
    X: "X",
    O: "O"
}