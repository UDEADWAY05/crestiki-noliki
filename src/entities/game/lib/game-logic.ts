import { GameInProgressEntity, GameOverDrawEntity, GameOverEntity, GameSymbol } from "../model/types";

export const getGameCurrentStep = (game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity) => {
    const symbolds = game.field.filter(s => s !== null).length

    return symbolds % 2 === 0 ? GameSymbol.X : GameSymbol.O;
}

export const getNextSybmol = (gameSymbol: GameSymbol) => {
    if (gameSymbol === GameSymbol.X) {
        return GameSymbol.O;
    }

    return GameSymbol.X;
}