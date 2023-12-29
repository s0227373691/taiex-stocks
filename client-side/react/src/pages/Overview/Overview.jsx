import { useQuery } from "react-query";

import fetchTickers from "../../services/fetchTickers";
import fetchSnapshot from "../../services/fetchSnapshot";

const Overview = () => {
  const { isLoading, isError, error, isSuccess, data } = useQuery(
    "snapshot",
    () => fetchSnapshot("TSE,OTC")
  );
  console.log(data);
  return (
    <div>
      <h2>Overview</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((el) => (
            <div style={{ display: "flex" }}>
              <div style={{ width: "100px" }}>
                {el.type === "EQUITY" && "股票"}
                {el.type === "INDEX" && "指數"}
              </div>
              <div style={{ width: "100px" }}>{el.symbol}</div>
              <div>{el.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
