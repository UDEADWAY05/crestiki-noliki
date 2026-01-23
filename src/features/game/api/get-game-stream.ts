import { getGameById, surrenderGame } from "@/entities/game/server";
import { sseStream } from "@/shared/lib/sse/server";
import { GameId } from "@/shared/types/ids";
import { NextRequest } from "next/server";
import { gameEvents } from "../../../entities/game/api/game-events";
import { getCurrentUser } from "@/entities/user/server";

export async function getGameStream(req: NextRequest, { params }: { params: Promise<{ id: GameId }> }) {
    const { id } = await params;
    const user = await getCurrentUser()
    const game = await getGameById(id)

    if (!game || !user) {
        return new Response("Game not found", {
            status: 404,
        })
    }

    const { addCloseListener, response, write } = sseStream(req);

    write(game);

    const unwatch = await gameEvents.addGameChangedListener(game.id, (event) => {
        write(event.data)
    })

    addCloseListener(async () => {
        await surrenderGame(game.id, user)

        unwatch()
    })

    return response;
}

//6.34.46