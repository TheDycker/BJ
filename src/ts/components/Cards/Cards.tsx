import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import Card from "./Card/Card";
import {
  drawCards,
  setDoubleBet,
  resetGame,
} from "./../../shared/store/actions/GameActions/GameActions";
import {
  useGlobalState,
  useDispatch,
} from "./../../shared/hooks/StateProvider";
const Cards: FunctionComponent<{
  onIsStandChange: any;
  isStand: any;
  onEndRound: any;
}> = (props) => {
  const game = useGlobalState("game");
  const dispatch = useDispatch();
  const [isDrawing, setIsDrawing] = useState(false);

  let player_cards;
  let dealer_cards;
  let static_card;
  let content;

  const onDoubleDown = () => {
    setDoubleBet(dispatch);
    drawCards(1, game.deck_id, dispatch, "SET_PLAYER_CARDS", game.player_cards_value);
    props.onIsStandChange();
  };

  useEffect(() => {
    if (isDrawing) {
      drawCards(1, game.deck_id, dispatch, "SET_PLAYER_CARDS", game.player_cards_value);
      setTimeout(() => {
        setIsDrawing(false);
      }, 1000)
    }
  }, [isDrawing]);

  player_cards = game.player_cards.map((card: any, index) => {
    return <Card key={index} card={card} />;
  });
  if (props.isStand) {
    dealer_cards = game.dealer_cards.map((card: any, index) => {
      return <Card key={index} card={card} />;
    });
  } else {
    let cards;
    cards = game.dealer_cards.slice(1, 2).map((card: any, index) => {
      return <Card key={index} card={card} />;
    });
    static_card = (
      <div>
        <img
          src="https://i.ibb.co/0Zt2Y9S/card.png"
          className="img-fluid"
          alt=""
        />
      </div>
    );
    dealer_cards = (
      <Fragment>
        {static_card}
        {cards}
      </Fragment>
    );
  }
  content = (
    <Fragment>
      <p style={{ textAlign: "center", color: "white", margin: 0 }}>
        Dealer Cards
      </p>
      {props.isStand ? (
        <p
          className="m-1"
          style={{ textAlign: "center", color: "white", margin: 0 }}
        >
          Dealer cards value: {game.dealer_cards_value}
        </p>
      ) : null}
      <div className="d-flex justify-content-center">{dealer_cards}</div>
      <p style={{ textAlign: "center", color: "white", margin: 0 }}>
        Player Cards
      </p>
      <p
        className="m-1"
        style={{ textAlign: "center", color: "white", margin: 0 }}
      >
        Player cards value: {game.player_cards_value}
      </p>
      <div className="d-flex justify-content-center">{player_cards}</div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-light mr-2"
          disabled={
            props.isStand
              ? true
              : props.onEndRound
              ? true
              : isDrawing
              ? true
              : false
          }
          onClick={() => setIsDrawing(true)}
        >
          Hit
        </button>
        <button
          className="btn btn-light mr-2"
          disabled={props.isStand ? true : props.onEndRound ? true : false}
          onClick={() => props.onIsStandChange()}
        >
          Stand
        </button>
        <button
          className="btn btn-light mr-2"
          disabled={
            props.isStand
              ? true
              : props.onEndRound
              ? true
              : game.player_cards.length > 2
              ? true
              : game.bank >= game.bet
              ? false
              : true
          }
          onClick={() => onDoubleDown()}
        >
          Double Down
        </button>
        <button
          className="btn btn-light mr-2"
          disabled={props.isStand ? true : props.onEndRound ? true : false}
          onClick={() => resetGame(dispatch, game.deck_id)}
        >
          Reset
        </button>
      </div>
    </Fragment>
  );
  return <Fragment>{content}</Fragment>;
};
export default Cards;
