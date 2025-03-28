import { GameEntity } from "@/entities/game/model/types";
import { EventsChanel } from "@/shared/lib/events";
import { GameId } from "@/shared/types/ids";
import { list } from "postcss";

type GameEvent = {
    type: 'game-changed';
    data: GameEntity;
}

type Listener = (game: GameEvent) => void

class GameEventService {
    eventsChanel = new EventsChanel("game")

    async addListener(gameId: GameId, listener: Listener) {
        return this.eventsChanel.consumeMoves(gameId, (data) => {
            listener(data as GameEvent)
        })
    };

    emit(game: GameEntity) {
        return this.eventsChanel.publishMove(game.id, {
            type: "game-changed",
            data: game
        } satisfies GameEvent)
    }
}

export const gameEvents = new GameEventService()