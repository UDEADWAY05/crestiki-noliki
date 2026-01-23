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
                className="border border-primary text-3xl font-bold w-16 h-16 flex justify-center items-center"
            >
                {
                    symbol
                        ? (symbol === 'X'
                            ? <p className="text-blue-400/80">{symbol}</p>
                            : <p className="text-red-400/80">{symbol}</p>
                        )
                        : ""
                }
            </button>
        }
        )}
    </div >
}