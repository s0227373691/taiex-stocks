import "./Ticker.css";
import React from "react";
import { useQuery } from "react-query";

import fetchTickerInfo from "../../services/fetchTickerInfo";
import fetchConstant from "../../services/fetchConstant";
import TickerTimeframe from "./components/TickerTimeframe/TickerTimeframe";
import TickerTableMa from "./components/TickerTableMa/TickerTableMa";
import TechnicalIndicators from "./components/TechnicalIndicators/TechnicalIndicators";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Ticker = () => {
  const { symbol } = useParams();
  const tickerInfoResult = useQuery("tickerInfo", () =>
    fetchTickerInfo(symbol)
  );
  const constantResult = useQuery("constant", () => fetchConstant());
  const [currentTimeframe, setCurrentTimeframe] = useState("M");

  if (tickerInfoResult.isLoading || constantResult.isLoading) {
    return <span>Loading...</span>;
  }

  if (tickerInfoResult.isError) {
    return <span>Error: {tickerInfoResult.error.message}</span>;
  }

  const tickerInfo = tickerInfoResult.data;
  const constant = constantResult.data.data;
  //   console.log(tickerInfo);
  // console.log(constant)
  // console.log(allHistoricalResult.data)

  const { name: industry } = constant.industry.find(
    (el) => el.code === tickerInfo.industry
  );
  return (
    <div>
      <div>
        <div>
          <span>
            {tickerInfo.name} {tickerInfo.referencePrice}
          </span>
        </div>
        <div>
          <span>
            {tickerInfo.symbol} {industry}
          </span>
        </div>
      </div>
      <TickerTimeframe
        currentTimeframe={currentTimeframe}
        setCurrentTimeframe={setCurrentTimeframe}
      />
      <div>
        <TickerTableMa currentTimeframe={currentTimeframe} />
        <TechnicalIndicators currentTimeframe={currentTimeframe} />
      </div>
    </div>
  );
};

export default Ticker;
