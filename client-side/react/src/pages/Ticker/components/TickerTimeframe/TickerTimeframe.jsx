import "./TickerTimeframe.css";
import { useQuery } from "react-query";
import Placeholder from "react-bootstrap/Placeholder";
import Spinner from "react-bootstrap/Spinner";

import fetchConstant from "../../../../services/fetchConstant";
import fetchAllHistorical from "../../../../services/fetchAllHistorical";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const TickerTimeframe = ({ currentTimeframe, setCurrentTimeframe }) => {
  const { symbol } = useParams();
  const { isLoading, isError, error, isSuccess, data } = useQuery(
    "constant",
    () => fetchConstant()
  );
  const { isFetching } = useQuery("allHistorical", () =>
    fetchAllHistorical(symbol, currentTimeframe)
  );

  const timeframe = useMemo(() => data.data.timeframe, [data]);

  return (
    <div>
      {isLoading ? (
        <Placeholder animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
      ) : isError ? (
        <p>{error}</p>
      ) : (
        isSuccess && (
          <>
            {timeframe.map((el) => (
              <span
                key={el.name}
                style={{
                  color: el.value === currentTimeframe ? "black" : "grey",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCurrentTimeframe(el.value);
                }}
              >
                {el.name}
              </span>
            ))}
            {isFetching && <Spinner animation="border" size="sm" />}
          </>
        )
      )}
    </div>
  );
};

export default TickerTimeframe;
