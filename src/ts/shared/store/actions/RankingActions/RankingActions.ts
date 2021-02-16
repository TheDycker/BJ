import axios from "../../../../axios-orders";

export const addResult = (dispatch: any, result: number) => {
  try {
    if (result !== 0) {
      dispatch({ type: "ADD_RESULT", payload: result });
    }
    localStorage.removeItem("lastGame");
    dispatch({ type: "SET_BANK", payload: 1000 });
  } catch (err) {
  }
};

export const setRanking = (dispatch: any, ranking: any) => {
  try {
    dispatch({ type: "SET_RANKING", payload: ranking });
  } catch (err) {
  }
};
