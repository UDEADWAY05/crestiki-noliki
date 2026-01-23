import { GameId } from "@/shared/types/ids";
import { gameRepository } from "./game";

export const getGameById = async (gameId: GameId) => {
    return gameRepository.getGame({ id: gameId })
};