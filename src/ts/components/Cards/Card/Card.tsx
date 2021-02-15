import React, { Fragment } from "react";

const card = (props: any) => (
  <div>
    <img src={props.card.images.png} className="img-fluid" alt="" />
  </div>
);

export default card;
