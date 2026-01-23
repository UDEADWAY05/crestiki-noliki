import { getIdleGames } from "@/entities/game/server";
import { sseStream } from "@/shared/lib/sse/server";

import { NextRequest } from "next/server";
import { gameEvents } from "@/entities/game/api/game-events";
import { getCurrentUser } from "@/entities/user/server";

export async function getGamesStreamRoute(req: NextRequest) {
    const user = await getCurrentUser();

    if (!user) {
        return new Response("Game not found", {
            status: 404,
        });
    }

    const { addCloseListener, response, write, close } = sseStream(req);

    // Сразу отправляем список игр
    write(await getIdleGames());

    // Подписка на событие создания игры
    const cancelGameCreated = await gameEvents.addGameCreatedListener(async () => {
        write(await getIdleGames());
    });

    // Очищаем при отключении клиента
    addCloseListener(() => {
        cancelGameCreated(); // отписка от RabbitMQ
        close(); // закрыть поток
    });

    return response;
}


//6.34.46