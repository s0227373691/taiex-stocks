import React from "react";

import fetchTickers from "../../services/fetchTickers";

const Index = () => {
  const { isLoading, isError, error, isSuccess, data } = useQuery(
    "snapshot",
    () => fetchTickers("TSE,OTC")
  );
  return <div>Index</div>;
};

export default Index;
