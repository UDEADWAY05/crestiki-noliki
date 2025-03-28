import { getGameById } from "@/entities/game/server";
import { sseStream } from "@/shared/lib/sse/server";
import { GameId } from "@/shared/types/ids";
import { NextRequest } from "next/server";
import { gameEvents } from "./game-events";

export async function getGameStream(req: NextRequest, { params }: { params: Promise<{ id: GameId }> }) {
    const { id } = await params;

    const game = await getGameById(id)

    if (!game) {
        return new Response("Game not found", {
            status: 404,
        })
    }

    const { addCloseListener, response, write } = sseStream(req);

    write(game);

    const unwatch = await gameEvents.addListener(game.id, (event) => {
        write(event.data)
    })

    addCloseListener(() => {
        unwatch()
    })


    return response;
}

//6.34.46