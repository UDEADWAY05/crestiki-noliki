import { getGameById, surrenderGame } from "@/entities/game/server";
import { sseStream } from "@/shared/lib/sse/server";
import { GameId } from "@/shared/types/ids";
import { NextRequest } from "next/server";
import { gameEvents } from "@/features/game/api/game-events";
import { getCurrentUser } from "@/entities/user/server";

export async function getGameStream(req: NextRequest) {

    const user = await getCurrentUser()

    if (!user) {
        return new Response("Game not found", {
            status: 404,
        })
    }

    const { addCloseListener, response, write } = sseStream(req);

    write(game);

    const unwatch = await gameEvents.addGamesListener((event) => {
        write(event.data)
    })

    addCloseListener(async () => {
        unwatch()

        const result = await surrenderGame(game.id, user)

        if (result.type === 'right') {
            gameEvents.emit(result.value)
        }
    })


    return response;
}

//6.34.46