import { useMemo, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import useEMA from "../../../../hooks/useEMA";

const Ema = ({ histirical, period }) => {
  const emas = useEMA(histirical, period);
  const currentEma = emas[emas.length - 1];
  const currentPrice = histirical[histirical.length - 1].close;
  return (
    <>
      {emas.length > 0 && (
        <ListGroup.Item
          variant={currentPrice > currentEma ? "success" : "danger"}
        >
          <span>EMA</span>
          <span style={{ width: "50px", textAlign: "center" }}> {period} </span>
          {currentEma.toFixed(2)}
          {currentPrice > currentEma ? (
            <span style={{ color: "red" }}>買進</span>
          ) : (
            <span style={{ color: "green" }}>賣出</span>
          )}
        </ListGroup.Item>
      )}
    </>
  );
};

export default Ema;
