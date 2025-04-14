import { GameIdleEntity } from "@/entities/game/model/types"
import { useEventsSource } from "@/shared/lib/sse/client"

type Props = {
    games: GameIdleEntity[]
}
export const useGamesListLogic = ({ games }: Props) => {
    useEventsSource()

    return {
        gamesStream
     }
}