import { Stochastic } from "technicalindicators";

const useStochastic = (params) => {
  if (typeof params === "function") {
    console.log("func");
    const input = params();
    if (input === undefined) return;
    return Stochastic.calculate(input);
  }
  // const { high, low, close, period, signalPeriod } = params
  //   let input = {
  //     high: high,
  //     low: low,
  //     close: close,
  //     period: period,
  //     signalPeriod: signalPeriod,
  //   };

  return Stochastic.calculate(params);
};

export default useStochastic;
