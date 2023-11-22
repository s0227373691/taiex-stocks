import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

import LayoutArea from './components/LayoutArea/LayoutArea'
import Menu from './components/Menu/Menu'
import Overview from './pages/Overview/Overview';
import Ticker from './pages/Ticker/Ticker';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutArea.Left>
        <Menu />
      </LayoutArea.Left>
      <Routes>
        <Route path="/"
          element={
            <LayoutArea.Right>
              <Overview />
            </LayoutArea.Right>}
        />
        <Route
          path='/ticker'
          element={
            <LayoutArea.Right>
              <Ticker />
            </LayoutArea.Right>
          }
        />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
