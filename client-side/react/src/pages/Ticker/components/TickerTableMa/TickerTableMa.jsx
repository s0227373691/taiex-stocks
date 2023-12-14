import "./TickerTableMa.css";
import Placeholder from "react-bootstrap/Placeholder";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "react-query";

import fetchAllHistorical from "../../../../services/fetchAllHistorical";

import { useMemo } from "react";
import { useParams } from "react-router-dom";

import TableMovingAverage from "../TableMovingAverage/TableMovingAverage";
const TickerTableMa = ({ currentTimeframe }) => {
  const { symbol } = useParams();
  const {
    isLoading,
    isError,
    error,
    data: histiricalData,
  } = useQuery("allHistorical", () =>
    fetchAllHistorical(symbol, currentTimeframe)
  );

  const computeHistoricalData = useMemo(() => {
    if (!histiricalData) return null;
    let historicalHigh = histiricalData.data[0].high;
    let historicalHighCount = 0;
    let historicalHighDate = null;
    const computed = histiricalData.data.map((k) => {
      if (k.high > historicalHigh) {
        historicalHigh = k.high;
        historicalHighCount++;
        historicalHighDate = k.date;
      }
      return { ...k, historicalHigh, historicalHighCount, historicalHighDate };
    });
    console.table(computed);
    return computed;
  }, [histiricalData]);

  const ath =
    computeHistoricalData &&
    computeHistoricalData[computeHistoricalData.length - 1].historicalHigh;
  const currentClosePrice =
    computeHistoricalData &&
    computeHistoricalData[computeHistoricalData.length - 1].close;
  const athLevel =
    computeHistoricalData && ((currentClosePrice / ath) * 100).toFixed(2);

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
        <div>
          <div>歷史新高 {ath}</div>
          <div>歷史新高水位 {athLevel} %</div>
          <hr />
          <div>
            <p>移動平均線 {">"} </p>
            <TableMovingAverage>
              <TableMovingAverage.Ema
                period={12}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Ema
                period={34}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Ema
                period={55}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Ema
                period={144}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Ema
                period={169}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Ema
                period={576}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Ema
                period={676}
                histirical={histiricalData.data}
              />

              <TableMovingAverage.Sma
                period={5}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Sma
                period={10}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Sma
                period={20}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Sma
                period={60}
                histirical={histiricalData.data}
              />
              <TableMovingAverage.Sma
                period={55}
                histirical={histiricalData.data}
              />
            </TableMovingAverage>
          </div>
        </div>
      )}
    </div>
  );
};

export default TickerTableMa;
