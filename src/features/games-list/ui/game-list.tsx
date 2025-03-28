import { getIdleGames } from "@/entities/game/server";
import { GameCard } from "@/entities/game/ui/game-card";
import { CreateButton } from "./create-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export const GameList = async () => {
    const games = await getIdleGames()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-end gap-4">
                <CreateButton />
            </div>
            <div className="grid grid-cols-2 gap-4">

                {
                    games.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            login={game.creator.login}
                            rating={game.creator.rating}
                            name={game.name}
                            actions={<Button>
                                <Link href={`/game/${game.id}`} >
                                    Присоединится
                                </Link>

                            </Button>}
                        />
                    ))
                }
            </div>
        </div>
    );
}