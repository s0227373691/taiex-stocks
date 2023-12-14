import ListGroup from "react-bootstrap/ListGroup";

import useSMA from "../../../../hooks/useSMA";

const Sma = ({ histirical, period }) => {
  const smas = useSMA(histirical, period);
  const currentSma = smas[smas.length - 1];
  const currentPrice = histirical[histirical.length - 1].close;
  return (
    <>
      {smas.length > 0 && (
        <ListGroup.Item
          variant={currentPrice > currentSma ? "success" : "danger"}
        >
          <span>SMA</span>
          <span style={{ width: "50px", textAlign: "center" }}> {period} </span>
          {currentSma.toFixed(2)}
          {currentPrice > currentSma ? (
            <span style={{ color: "red" }}>買進</span>
          ) : (
            <span style={{ color: "green" }}>賣出</span>
          )}
        </ListGroup.Item>
      )}
    </>
  );
};

export default Sma;
