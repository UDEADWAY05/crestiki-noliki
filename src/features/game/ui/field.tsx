'use client'

import { GameEntity } from "@/entities/game/model/types";

type Props = {
    game: GameEntity;
    onCellClick?: (index: number) => void;
}
export const GameField = ({ game, onCellClick }: Props) => {

    return <div className="grid grid-cols-3">
        {game.field.map((symbol, index) => {
            return <button
                onClick={() => onCellClick?.(index)}
                key={index}
                className="border border-primary w-20 h-20 flex justify-center items-center"
            >
                {symbol ?? ""}
            </button>
        }
        )}
    </div>
}