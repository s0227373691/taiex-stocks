import React, { useEffect, useState } from "react";
import fetchSnapshot from "../../services/fetchSnapshot";
import { useQuery } from "react-query";

import MonthCompute from "./MonthCompute/MonthCompute";
import delay from "../../utils/delay";
import fetchAllHistorical from "../../services/fetchAllHistorical";

const Explor = () => {
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: snapshotDatas,
  } = useQuery("fetchSnapshot", () => fetchSnapshot("TSE,OTC"));
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    if (snapshotDatas) {
      let newSymbolsData = [];
      snapshotDatas.map((snapshot) => {
        const newSnapshotData = snapshot.data.filter(
          (el) => el.symbol.length === 4
        );
        newSymbolsData = [...newSymbolsData, ...newSnapshotData];
      });

      const getSymbolsAllHistorical = async (symbolsData, i = 0) => {
        const historical = await fetchAllHistorical(symbolsData[i].symbol, "M");
        await delay(1010);

        if (historical === undefined) {
          getSymbolsAllHistorical(symbolsData, i);
        } else {
          setHistoricalData((prev) => [...prev, historical]);
          i++;
          getSymbolsAllHistorical(symbolsData, i);
        }
      };
      getSymbolsAllHistorical(newSymbolsData);
    }
  }, [snapshotDatas]);

  useEffect(() => console.log(historicalData), [historicalData]);
  return (
    <div>
      <h2> Explor </h2>
      <ul>
        {historicalData.map((el) => {
          return <MonthCompute key={el.symbol} {...el} />;
        })}
      </ul>
    </div>
  );
};

export default Explor;
