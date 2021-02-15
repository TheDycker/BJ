import { Action } from "../../actions/Action";

export type Game = {
  deck_id: string;
  player_cards: any[];
  player_cards_value: number;
  dealer_cards: any[];
  dealer_cards_value: number;
  bank: number;
  bet: number;
  isStarted: boolean;
  isPlaying: boolean;
  round: number;
  round_list: any[];
};

export const initialGame: Game = {
  deck_id: "",
  player_cards: [],
  player_cards_value: 0,
  dealer_cards: [],
  dealer_cards_value: 0,
  bank: 1000,
  bet: 0,
  isStarted: false,
  isPlaying: false,
  round: 0,
  round_list: [],
};

export const gameReducer = (state: Game, action: Action) => {
  switch (action.type) {
    case "SET_GAME":
      return {
        ...state,
        isStarted: !state.isStarted,
      };
    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.payload,
      };
    case "SET_DECK":
      return {
        ...state,
        deck_id: action.payload,
      };
    case "SET_PLAYER_CARDS":
      let newPlayerCards: any[] = [...state.player_cards, ...action.payload];
      return {
        ...state,
        player_cards: newPlayerCards,
      };
    case "SET_DEALER_CARDS":
      let newDealerCards: any[] = [...state.dealer_cards, ...action.payload];
      return {
        ...state,
        dealer_cards: newDealerCards,
      };
    case "CLEAR_PLAYER_CARDS":
      return {
        ...state,
        player_cards: action.payload,
      };
    case "CLEAR_DEALER_CARDS":
      return {
        ...state,
        dealer_cards: action.payload,
      };
    case "CHANGE_PLAYER_CARDS_VALUE":
      let newPlayerCardsValue: number =
        state.player_cards_value + action.payload;
      return {
        ...state,
        player_cards_value: newPlayerCardsValue,
      };
    case "CHANGE_DEALER_CARDS_VALUE":
      let newDealerCardsValue: number =
        state.dealer_cards_value + action.payload;
      return {
        ...state,
        dealer_cards_value: newDealerCardsValue,
      };
    case "CLEAR_PLAYER_CARDS_VALUE":
      return {
        ...state,
        player_cards_value: action.payload,
      };
    case "CLEAR_DEALER_CARDS_VALUE":
      return {
        ...state,
        dealer_cards_value: action.payload,
      };
    case "SET_BET":
      return {
        ...state,
        bet: action.payload,
      };
    case "SET_BANK":
      return {
        ...state,
        bank: action.payload,
      };
    case "SET_DOUBLE_BET":
      let newBet: number = state.bet * 2;
      let newBank: number = state.bank - state.bet;
      return {
        ...state,
        bet: newBet,
        bank: newBank
      };
    case "SET_CONTINUE_GAME":
      return {
        ...state,
        deck_id: action.payload.deck_id,
        player_cards: action.payload.player_cards,
        player_cards_value: action.payload.player_cards_value,
        dealer_cards: action.payload.dealer_cards,
        dealer_cards_value: action.payload.dealer_cards_value,
        bank: action.payload.bank,
        bet: action.payload.bet,
        isStarted: action.payload.isStarted,
        isPlaying: action.payload.isPlaying,
        round: action.payload.round,
      };
    case "CHANGE_ROUND":
      return {
        ...state,
        round: state.round + 1,
      };
    case "CLEAR_ROUND":
      return {
        ...state,
        round: 0,
      };
    case "SET_ROUND_LIST":
      let newRoundList: any[] = [...state.round_list, action.payload];
      return {
        ...state,
        round_list: newRoundList,
      };
    default:
      return state;
  }
};
