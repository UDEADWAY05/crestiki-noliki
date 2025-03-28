import { GameId } from "@/shared/types/ids";
import { useGameLogic } from "../model/useGameLogic";
import { GameLayout } from "./layout";
import { GameClient } from "./game-client";
import { getCurrentUser } from "@/entities/user/server";
import { getGameById, startGame } from "@/entities/game/server";
import { gameEvents } from "../api/game-events";

type Props = {
    gameId: GameId;
}
export const Game = async ({ gameId }: Props) => {
    const user = await getCurrentUser()
    let game = await getGameById(gameId)

    if (!game) {
        throw new Error('game-not-found')
    }

    if (user) {
        const startGameResult = await startGame(gameId, user)

        if (startGameResult?.type === 'right') {
            game = startGameResult.value;
            gameEvents.emit(startGameResult.value);
        }
    }

    return (
        <GameClient defaultGame={game} />
    );
}