import axios from "../../../../axios-orders";

export const shuffleCards = (deck_id: any) => {
  try {
    axios
      .get(`${deck_id}/shuffle/`)
      .then((res: any) => {})
      .catch((err: any) => {});
  } catch (err) {}
};

export const shuffleNewDeck = (dispatch: any) => {
  try {
    axios
      .get("new/shuffle/?deck_count=6")
      .then((res: any) => {
        const deck = res.data;
        dispatch({ type: "SET_DECK", payload: deck.deck_id });
      })
      .catch((err: any) => {});
  } catch (err) {}
};

export const setGame = (dispatch: any) => {
  try {
    dispatch({ type: "SET_GAME" });
  } catch (err) {}
};

export const clearRound = (dispatch: any) => {
  try {
    dispatch({ type: "CLEAR_ROUND" });
    dispatch({ type: "CLEAR_ROUND_LIST" });
  } catch (err) {}
};

export const setContinueGame = (dispatch: any, game: any) => {
  try {
    dispatch({ type: "SET_CONTINUE_GAME", payload: game });
  } catch (err) {}
};

export const setIsPlaying = (dispatch: any, isPlaying: boolean) => {
  try {
    dispatch({ type: "SET_IS_PLAYING", payload: isPlaying });
  } catch (err) {}
};

export const changeBetAndBankAmount = (
  dispatch: any,
  betAmount: number,
  bankAmount: number
) => {
  try {
    dispatch({ type: "SET_BET", payload: betAmount });
    dispatch({ type: "SET_BANK", payload: bankAmount });
    dispatch({ type: "CHANGE_ROUND" });
  } catch (err) {
    dispatch({ type: "SET_IS_PLAYING", payload: false });
  }
};

export const setDoubleBet = (dispatch: any) => {
  try {
    dispatch({ type: "SET_DOUBLE_BET" });
  } catch (err) {}
};

export const wonGame = (
  dispatch: any,
  betAmount: number,
  bankAmount: number
) => {
  let newBankAmount: number = bankAmount + (betAmount + betAmount * 1.5);
  try {
    clearGame(dispatch);
    dispatch({ type: "SET_BANK", payload: newBankAmount });
  } catch (err) {}
};

export const drawGame = (
  dispatch: any,
  betAmount: number,
  bankAmount: number
) => {
  let newBankAmount: number = bankAmount + betAmount;
  try {
    clearGame(dispatch);
    dispatch({ type: "SET_BANK", payload: newBankAmount });
  } catch (err) {}
};

export const clearGame = (dispatch: any) => {
  try {
    dispatch({ type: "SET_ROUND_LIST" });
    dispatch({ type: "SET_BET", payload: 0 });
    dispatch({ type: "CLEAR_PLAYER_CARDS_VALUE", payload: 0 });
    dispatch({ type: "CLEAR_DEALER_CARDS_VALUE", payload: 0 });
    dispatch({ type: "CLEAR_PLAYER_CARDS", payload: [] });
    dispatch({ type: "CLEAR_DEALER_CARDS", payload: [] });
  } catch (err) {}
};

export const drawCards = (
  number: number,
  deck_id: string,
  dispatch: any,
  type: string,
  cardsValue: number
) => {
  try {
    axios
      .get(`${deck_id}/draw/?count=${number}`)
      .then((res: any) => {
        const cards = res.data;
        dispatch({ type: type, payload: cards.cards });
        let cards_value: number = 0;
        cards.cards.map((card: any) => {
          if (card.value === "ACE") {
            if (cards_value === 11 || cardsValue > 11) {
              cards_value = cards_value + 1;
            } else {
              cards_value = cards_value + 11;
            }
          } else if (
            card.value === "KING" ||
            card.value === "QUEEN" ||
            card.value === "JACK"
          ) {
            cards_value = cards_value + 10;
          } else {
            cards_value = cards_value + parseInt(card.value);
          }
        });
        if (type === "SET_PLAYER_CARDS") {
          dispatch({ type: "CHANGE_PLAYER_CARDS_VALUE", payload: cards_value });
        } else {
          dispatch({ type: "CHANGE_DEALER_CARDS_VALUE", payload: cards_value });
        }
        dispatch({ type: "SET_IS_PLAYING", payload: true });
      })
      .catch((err: any) => {
        dispatch({ type: "SET_IS_PLAYING", payload: false });
      });
  } catch (err) {
    dispatch({ type: "SET_IS_PLAYING", payload: false });
  }
};

export const resetGame = (dispatch: any, deck_id: string) => {
  try {
    clearGame(dispatch);
    dispatch({ type: "SET_BANK", payload: 1000 });
    clearRound(dispatch);
    dispatch({ type: "SET_IS_PLAYING", payload: false });
    shuffleCards(deck_id);
    dispatch({ type: "CLEAR_ROUND_LIST" });
  } catch (err) {}
};

export const resetBank = (dispatch: any) => {
  try {
    dispatch({ type: "SET_BANK", payload: 1000 });
  } catch (err) {}
};
