import { useMemo } from "react";
import { EMA } from "technicalindicators";

const useEMA = (historical, period) => {
  if (!historical) return;

  const ema = useMemo(() => {
    const closePrices = historical.map((el) => el.close);
    return EMA.calculate({ period, values: closePrices });
  }, [historical]);

  return ema;
};

export default useEMA;
