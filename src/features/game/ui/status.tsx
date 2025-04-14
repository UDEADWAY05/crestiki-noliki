import { getGameCurrentSymbol } from "@/entities/game";
import { getPlayerSymbol } from "@/entities/game/lib/game-logic";
import { GameEntity } from "@/entities/game/model/types";

type Props = {
    game: GameEntity
}
export const GameStatus = ({ game }: Props) => {
    switch (game.status) {
        case "idle":
            return <div className="text-lg">Ожидание игрока</div>;
        case "inProgress": {
            const currentSymbol = getGameCurrentSymbol(game)

            return <div className="text-lg">Ход: {currentSymbol}</div>;
        }

        case "gameOver": {
            const currentSymbol = getPlayerSymbol(game.winner, game)
            return <div className="text-xl font-bold">Победитель: {currentSymbol}</div>;
        }
        case "gameOverDraw":
            return <div className="text-lg">Ничья</div>;
    }
}