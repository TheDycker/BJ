import React, { Fragment, FunctionComponent } from "react";

const RoundHistoryItem: FunctionComponent<{ round: any }> = (props) => {
  let playerCards = props.round.player_cards.map((round: any) => {
      let string = round.value + " ";
    return string;
  });

  let dealerCards = props.round.dealer_cards.map((round: any) => {
    let string = round.value + " ";
    return string;
  });
  return (
    <Fragment>
      <tr>
        <th scope="row">{props.round.round}</th>
        <td>{props.round.bet}</td>
        <td>{props.round.bank}</td>
        <td>{playerCards}</td>
        <td>{dealerCards}</td>
      </tr>
    </Fragment>
  );
};
export default RoundHistoryItem;
