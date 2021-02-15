import combineReducers from "react-combine-reducers";
import { gameReducer, initialGame, Game } from "./GameReducer/GameReducer";
import { rankingReducer, initialRanking, Ranking } from "./RankingReducer/RankingReducer";
import { Action } from "../actions/Action";

type mainState = {
    game: Game;
    ranking: Ranking;
};

export type MainReducer = (
    state: mainState,
    action: Action
) => mainState;
export type State = typeof initialState;

export const [mainReducer, initialState] = combineReducers<MainReducer>(
    {
        game: [gameReducer, initialGame],
        ranking: [rankingReducer, initialRanking]
    }
);
