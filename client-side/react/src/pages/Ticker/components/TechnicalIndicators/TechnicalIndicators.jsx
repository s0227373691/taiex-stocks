import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import fetchAllHistorical from "../../../../services/fetchAllHistorical";
import useStochastic from "../../../../hooks/useStochastic";

const TechnicalIndicators = ({ currentTimeframe }) => {
  const { symbol } = useParams();
  const {
    isLoading,
    isError,
    error,
    data: historical,
  } = useQuery("allHistorical", () =>
    fetchAllHistorical(symbol, currentTimeframe)
  );

  const stochastic = useStochastic(() => {
    if (isLoading) return;
    const high = historical.data.map((el) => el.high);
    const low = historical.data.map((el) => el.low);
    const close = historical.data.map((el) => el.close);
    console.log(close);
    return { high, low, close, period: 14, signalPeriod: 3 };
  });

  console.log(stochastic);

  return <div>TechnicalIndicators</div>;
};

export default TechnicalIndicators;
