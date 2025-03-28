'use client'

import { GameId } from "@/shared/types/ids";
import { GameEntity } from "@/entities/game/model/types";
import { useEventsSource } from "@/shared/lib/sse/client";
import { useGameLogic } from "../model/useGameLogic";
import { GameLayout } from "./layout";
import { GamePlayers } from "./players";
import { GameField } from "./field";
import { GameStatus } from "./status";

type Props = {
    gameId: GameId;
}
export const GameClient = ({ defaultGame }: { defaultGame: GameEntity }) => {

    const { data = defaultGame } = useGameLogic(defaultGame.id)

    return (
        <GameLayout
            status={<GameStatus game={data} />}
            players={<GamePlayers game={data} />}
            field={<GameField game={data} />}
        />
    );
}