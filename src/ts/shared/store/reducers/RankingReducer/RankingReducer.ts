import { Action } from "../../actions/Action";

export type Ranking = {
  bestResults: number[];
};

export const initialRanking: Ranking = {
  bestResults: [],
};

export const rankingReducer = (state: Ranking, action: Action) => {
  switch (action.type) {
    case "ADD_RESULT":
      let newResults = [...state.bestResults, action.payload];
      return {
        ...state,
        bestResults: newResults,
      };
      case "SET_RANKING":
        let newRanking = [...state.bestResults, ...action.payload];
        return {
          ...state,
          bestResults: newRanking,
        };
    default:
      return state;
  }
};
