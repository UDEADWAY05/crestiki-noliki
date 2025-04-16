'use client'

import { GameCard } from "@/entities/game/ui/game-card";
import { CreateButton } from "./create-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { GameIdleEntity } from "@/entities/game/model/types";
import { useEventsSource } from "@/shared/lib/sse/client";


interface Props {
    games: GameIdleEntity[]
}

export const GameListClient = ({ games }: Props) => {
    const { data = games } = useEventsSource<GameIdleEntity[]>('/games/stream')

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-end gap-4">
                <CreateButton />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {
                    data.map((game) => (
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