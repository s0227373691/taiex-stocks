import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import LayoutArea from "./components/LayoutArea/LayoutArea";
import Menu from "./components/Menu/Menu";
import Overview from "./pages/Overview/Overview";
import Ticker from "./pages/Ticker/Ticker";
import Explor from "./pages/Explor/Explor";
import Index from "./pages/Index/Index";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutArea.Left>
        <Menu />
      </LayoutArea.Left>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutArea.Right>
              <Overview />
            </LayoutArea.Right>
          }
        />
        <Route
          path="/index"
          element={
            <LayoutArea.Right>
              <Index />
            </LayoutArea.Right>
          }
        />
        <Route
          path="/ticker/:symbol"
          element={
            <LayoutArea.Right>
              <Ticker />
            </LayoutArea.Right>
          }
        />
        <Route
          path="/explor"
          element={
            <LayoutArea.Right>
              <Explor />
            </LayoutArea.Right>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
