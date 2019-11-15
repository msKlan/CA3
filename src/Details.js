import React from "react";
import { useParams } from "react-router-dom";

import "./App.css";

const style = {
  borderRadius: 2,
  width: 400,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "darkGray",
  padding: 2
};

function Details({ itemFactory }) {
  const { itemId } = useParams();
  const item = null; //itemFactory.finditem(itemId);

  const showitem = item ? (
    <div style={style}>
      <p>ID: {item.id}</p>
      <p>Title: {item.title}</p>
      <p>Info: {item.info}</p>
    </div>
  ) : (
    <p>item not found</p>
  );
  return <div>{showitem}</div>;
}

export default Details;
