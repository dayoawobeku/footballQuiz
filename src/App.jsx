import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PremierLeague from "./pages/PremierLeague";
import Laliga from "./pages/Laliga";
import ChampionsLeague from "./pages/ChampionsLeague";
import Selection from "./pages/Selection";
import { DataProvider } from "./contexts/DataProvider";
import FinishScreen from "./pages/FinishScreen";
import PageNotFound from "./pages/PageNotFound";
// import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  // const queryClient = new QueryClient();
  return (
    // <QueryClientProvider client={queryClient}>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/premierLeague" element={<PremierLeague />} />

          <Route path="/laLiga" element={<Laliga />} />
          <Route path="/championsLeague" element={<ChampionsLeague />} />
          <Route path="/finish" element={<FinishScreen />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
    // </QueryClientProvider>
  );
}

export default App;
