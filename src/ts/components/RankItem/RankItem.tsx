import React, { Fragment } from "react";

const RankItem = (props: any) => (
  <Fragment>
    <li className="list-group-item d-flex justify-content-between align-items-center">
      Rank {props.index+1}
      <span className="badge badge-primary badge-pill">{props.rank}$</span> 
    </li>
  </Fragment>
);

export default RankItem;
