import React, {
  FunctionComponent,
  Fragment,
  Suspense,
  useContext,
  lazy,
  useEffect,
  useState,
} from "react";
import { useGlobalState, useDispatch } from "./shared/hooks/StateProvider";
import {
  setGame,
  setContinueGame,
} from "./shared/store/actions/GameActions/GameActions";
import { setRanking } from "./shared/store/actions/RankingActions/RankingActions";
import Game from "./pages/Game/Game";
import Modal from "./components/Modal/Modal";
import RankItem from "./components/RankItem/RankItem";
import axios from "./axios-orders";

interface IGame {
  bank: number;
  bet: number;
  dealer_cards: [];
  dealer_cards_value: number;
  deck_id: string;
  isPlaying: boolean;
  isStarted: boolean;
  player_cards: [];
  player_cards_value: number;
  round: number;
  round_list: [];
}

const App: FunctionComponent<{}> = (props) => {
  const game = useGlobalState("game");
  const ranking = useGlobalState("ranking");
  const dispatch = useDispatch();
  const [openRanking, setOpenRanking] = useState(false);
  const [lastGame, setLastGame] = useState<IGame>({
    bank: 0,
    bet: 0,
    dealer_cards: [],
    dealer_cards_value: 0,
    deck_id: "",
    isPlaying: false,
    isStarted: false,
    player_cards: [],
    player_cards_value: 0,
    round: 0,
    round_list: []
  });
  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    localStorage.setItem("lastGame", JSON.stringify(game));
    localStorage.setItem("ranking", JSON.stringify(ranking.bestResults));

    return (ev.returnValue = "ASDASDAD");
  });
  useEffect(() => {
    let lastGame: any = localStorage.getItem("lastGame");
    setLastGame(JSON.parse(lastGame));
  }, []);

  useEffect(() => {
    let newRanking: any = localStorage.getItem("ranking");
    setRanking(dispatch, JSON.parse(newRanking));
  }, []);
  let rankList: any = ranking.bestResults.sort((a, b) => {
    return b - a;
  });
  let rankContent: any;
  if (rankList.length === 0) {
    rankContent = <p style={{ textAlign: "center", margin: 0 }}>No results</p>;
  } else {
    rankContent = rankList
      .filter((item: any, index: any) => rankList.indexOf(item) === index)
      .slice(0, 10)
      .map((rank: any, index: any) => {
        return <RankItem key={index} rank={rank} index={index} />;
      });
  }
  let modalRanking: any = (
    <Modal
      onOpenRanking={openRanking}
      changeOpenRanking={() => setOpenRanking(!openRanking)}
    >
      <Fragment>
        <div className="d-flex justify-content-center">
          <h1 style={{ textAlign: "center" }}>Top Historic Results</h1>
        </div>
        <ul className="list-group">{rankContent}</ul>
      </Fragment>
    </Modal>
  );

  return (
    <Fragment>
      {game.isStarted ? (
        <Game
          onSetLastGame={() =>
            setLastGame({
              ...lastGame,
              bank: 0,
              bet: 0,
              dealer_cards: [],
              dealer_cards_value: 0,
              deck_id: "",
              isPlaying: false,
              isStarted: false,
              player_cards: [],
              player_cards_value: 0,
              round: 0,
              round_list: []
            })
          }
          changeOpenRanking={() => setOpenRanking(!openRanking)}
        ></Game>
      ) : (
        <div className="mainPage container-fluid d-flex justify-content-center align-items-center">
          {modalRanking}
          <button
            className="btn btn-light mt-6 mr-2"
            onClick={() => setGame(dispatch)}
          >
            New Game
          </button>
          <button
            className="btn btn-light mt-6 mr-2 ml-2"
            onClick={() => setOpenRanking(!openRanking)}
          >
            Ranking
          </button>
          {lastGame.round !== 0 ? (
            <button
              className="btn btn-light mt-6 ml-2"
              onClick={() => setContinueGame(dispatch, lastGame)}
            >
              Continue
            </button>
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

export default App;
