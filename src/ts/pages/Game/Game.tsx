import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useGlobalState,
  useDispatch,
} from "./../../shared/hooks/StateProvider";
import {
  shuffleNewDeck,
  drawCards,
  changeBetAndBankAmount,
  clearGame,
  wonGame,
  setIsPlaying,
  setGame,
  clearRound,
  shuffleCards,
  drawGame,
  resetBank,
} from "./../../shared/store/actions/GameActions/GameActions";

import Modal from "../../components/Modal/Modal";
import { addResult } from "./../../shared/store/actions/RankingActions/RankingActions";
import Cards from "../../components/Cards/Cards";
import useMessageHandler from "../../shared/hooks/useMessageHandler";
import RoundHistoryItem from "../../components/RoundHistoryItem/RoundHistoryItem";

const Game: FunctionComponent<{
  changeOpenRanking: any;
  onSetLastGame: any;
}> = (props) => {
  const game = useGlobalState("game");
  const dispatch = useDispatch();
  const { message, showMessage } = useMessageHandler(null);
  const [openRoundHistory, setOpenRoundHistory] = useState(false);
  const [bankAmount, setBankAmount] = useState(game.bank);
  const [betAmount, setBetAmount] = useState(game.bet);
  const [isStand, setIsStand] = useState(false);
  const [isEndRound, setIsEndRound] = useState(false);

  const changeBetAndBankValue = (value: number) => {
    if (bankAmount >= value) {
      setBankAmount(bankAmount - value);
      setBetAmount(betAmount + value);
    }
  };
  const onWin = () => {
    setTimeout(() => {
      setIsEndRound(true);
      showMessage(`You won ${betAmount + betAmount * 1.5}$`);
      setIsStand(false);
    }, 2000);
    setTimeout(() => {
      setIsEndRound(false);
      wonGame(dispatch, betAmount, bankAmount);
      setIsPlaying(dispatch, false);
    }, 4000);
  };

  const onLost = () => {
    setTimeout(() => {
      setIsEndRound(true);
      showMessage(`You lost ${betAmount}$`);
      setIsStand(false);
    }, 2000);
    setTimeout(() => {
      setIsEndRound(false);
      clearGame(dispatch);
      setIsPlaying(dispatch, false);
    }, 4000);
  };

  const onDraw = () => {
    setTimeout(() => {
      setIsEndRound(true);
      showMessage(`You draw`);
      setIsStand(false);
    }, 2000);
    setTimeout(() => {
      setIsEndRound(false);
      drawGame(dispatch, betAmount, bankAmount);
      setIsPlaying(dispatch, false);
    }, 4000);
  };

  const clearBet = () => {
    setBankAmount(bankAmount + betAmount);
    setBetAmount(0);
  };

  useEffect(() => {
    if (game.deck_id === "") {
      shuffleNewDeck(dispatch);
    }
  }, []);

  useEffect(() => {
    if (game.player_cards_value === 21) {
      setIsStand(true);
      if (game.player_cards_value !== game.dealer_cards_value) {
        onWin();
      } else {
        onDraw();
      }
    } else if (game.player_cards_value > 21) {
      setIsStand(true);
      onLost();
    }
  }, [game.player_cards_value]);

  useEffect(() => {
    if (isStand && game.dealer_cards_value > 21) {
      onWin();
    }
    if (
      isStand &&
      game.player_cards_value < 21 &&
      game.dealer_cards_value <= 21
    ) {
      if (
        game.dealer_cards_value < 17 &&
        game.dealer_cards_value < game.player_cards_value
      ) {
        drawCards(
          1,
          game.deck_id,
          dispatch,
          "SET_DEALER_CARDS",
          game.dealer_cards_value
        );
      } else if (game.dealer_cards_value < game.player_cards_value) {
        onWin();
      } else if (game.player_cards_value === game.dealer_cards_value) {
        onDraw();
      } else {
        onLost();
      }
    }
  }, [game.dealer_cards_value, isStand]);

  useEffect(() => {
    if (!game.isPlaying && game.round === 5) {
      shuffleCards(game.deck_id);
      addResult(dispatch, game.bank);
      setGame(dispatch);
      clearRound(dispatch);
      props.onSetLastGame();
      props.changeOpenRanking();
    }
  }, [game.isPlaying]);

  useEffect(() => {
    setBankAmount(game.bank);
    setBetAmount(game.bet);
  }, [game.bet, game.bank]);

  useEffect(() => {
    if (game.bank < 25 && !game.isPlaying && !isStand) {
      setTimeout(() => {
        setIsEndRound(true);
        showMessage(`You Lost`);
      }, 1000);
      setTimeout(() => {
        setIsEndRound(false);
        localStorage.removeItem("lastGame");
        shuffleCards(game.deck_id);
        setGame(dispatch);
        clearRound(dispatch);
        props.onSetLastGame();
        resetBank(dispatch);
      }, 3000);
    }
  }, [game.isPlaying]);

  useEffect(() => {
    if (game.isPlaying && game.player_cards.length === 0) {
      drawCards(
        2,
        game.deck_id,
        dispatch,
        "SET_PLAYER_CARDS",
        game.player_cards_value
      );
      drawCards(
        2,
        game.deck_id,
        dispatch,
        "SET_DEALER_CARDS",
        game.dealer_cards_value
      );
      changeBetAndBankAmount(dispatch, betAmount, bankAmount);
    }
  }, [game.isPlaying]);

  let content;
  if (!game.isPlaying) {
    content = (
      <Fragment>
        <div className="d-flex justify-content-center">
          {bankAmount < 500 ? (
            <button
              className="btn btn-light mr-1"
              disabled={bankAmount < 25 ? true : false}
              onClick={() => changeBetAndBankValue(25)}
            >
              25$
            </button>
          ) : null}

          <button
            className="btn btn-light mr-1"
            disabled={bankAmount < 50 ? true : false}
            onClick={() => changeBetAndBankValue(50)}
          >
            50$
          </button>
          <button
            className="btn btn-light mr-1"
            disabled={bankAmount < 100 ? true : false}
            onClick={() => changeBetAndBankValue(100)}
          >
            100$
          </button>
          {bankAmount >= 500 ? (
            <button
              className="btn btn-light mr-1"
              disabled={bankAmount < 500 ? true : false}
              onClick={() => changeBetAndBankValue(500)}
            >
              500$
            </button>
          ) : null}
          <button
            className="btn btn-light mr-1"
            disabled={bankAmount === 0 ? true : false}
            onClick={() => changeBetAndBankValue(bankAmount)}
          >
            Bet All
          </button>
          <button className="btn btn-light mr-1" onClick={() => clearBet()}>
            Clear Bet
          </button>
          <button
            className="btn btn-light mr-1"
            disabled={betAmount <= 0 ? true : game.isPlaying ? true : false}
            onClick={() => setIsPlaying(dispatch, true)}
          >
            PLAY
          </button>
        </div>
      </Fragment>
    );
  }
  if (game.isPlaying) {
    if (game.dealer_cards.length && game.player_cards) {
      content = (
        <Cards
          onIsStandChange={() => setIsStand(!isStand)}
          isStand={isStand}
          onEndRound={isEndRound}
        />
      );
    }
  }

  let roundHistoryContent: any;
  let roundHistoryLength: any;
  if (game.round_list.length === 0) {
    roundHistoryContent = (
      <p style={{ textAlign: "center", margin: 0 }}>No results</p>
    );
  } else {
    roundHistoryContent = game.round_list.map((round: any, index: any) => {
      return <RoundHistoryItem key={index} round={round} />;
    });
  }
  roundHistoryLength = game.round_list.map((round: any, index: any) => {
    return <th scope="col">{index + 1}</th>;
  });

  let modalRoundHistory: any = (
    <Modal
      onOpenRanking={openRoundHistory}
      changeOpenRanking={() => setOpenRoundHistory(!openRoundHistory)}
    >
      <Fragment>
        <div className="d-flex justify-content-center">
          <h1 style={{ textAlign: "center" }}>Round History</h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Bet</th>
              <th scope="col">Bank</th>
              <th scope="col">P_Cards</th>
              <th scope="col">D_Cards</th>
            </tr>
          </thead>
          <tbody>{roundHistoryContent}</tbody>
        </table>
      </Fragment>
    </Modal>
  );

  return (
    <div className="game d-flex justify-content-center align-items-center">
      <div className="container">
        {modalRoundHistory}
        {game.round_list.length !== 0 && !game.isPlaying ? (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-light mr-1"
              onClick={() => setOpenRoundHistory(!openRoundHistory)}
            >
              Round History
            </button>
          </div>
        ) : null}
        <div className="d-flex justify-content-center">
          <p className="m-1" style={{ color: "white" }}>
            BANK: {bankAmount}$
          </p>
          <p className="m-1" style={{ color: "white" }}>
            BET: {game.bet === 0 ? betAmount : game.bet}$
          </p>
          {game.isPlaying ? (
            <p className="m-1" style={{ color: "white" }}>
              Round: {game.round}
            </p>
          ) : null}
        </div>
        {content}
        {isEndRound ? (
          <Modal onOpenRanking={true} changeOpenRanking={() => {}}>
            <p style={{ textAlign: "center" }}>{message}</p>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};
export default Game;
