import { GameIdleEntity } from "../model/types";
import { gameRepository } from "./game";

export const getIdleGames = async (): Promise<GameIdleEntity[]> => {
    const games = await gameRepository.gamesList({
        status: 'idle'
    })

    return games as GameIdleEntity[]
};

//1:21:22