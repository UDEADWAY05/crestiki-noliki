'use client'

import { GameEntity, PlayerEntity } from "@/entities/game/model/types";
import { useGameLogic } from "../model/useGameLogic";
import { GameLayout } from "./layout";
import { GamePlayers } from "./players";
import { GameField } from "./field";
import { GameStatus } from "./status";

export const GameClient = ({ defaultGame, player }: { defaultGame: GameEntity, player: PlayerEntity }) => {

    const { data = defaultGame, step } = useGameLogic(defaultGame.id, player)

    return (
        <GameLayout
            status={<GameStatus game={data} />}
            players={<GamePlayers game={data} />}
            field={<GameField game={data} onCellClick={step} />}
        />
    );
}