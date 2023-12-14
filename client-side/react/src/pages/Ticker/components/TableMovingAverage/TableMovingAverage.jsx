import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Ema from "./Ema";
import Sma from "./Sma";

const TableMovingAverage = ({ children }) => {
  return <ListGroup>{children}</ListGroup>;
};

TableMovingAverage.Ema = Ema;
TableMovingAverage.Sma = Sma;

export default TableMovingAverage;
