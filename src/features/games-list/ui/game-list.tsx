import { getIdleGames } from "@/entities/game/server";
import { GameListClient } from "./games-list-client";

export const GameList = async () => {
    const games = await getIdleGames()

    return (
        <GameListClient games={games} />
    );
}