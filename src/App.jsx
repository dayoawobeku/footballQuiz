import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PremierLeague from "./pages/PremierLeague";
import Laliga from "./pages/Laliga";
import ChampionsLeague from "./pages/ChampionsLeague";
import Selection from "./pages/Selection";
import { DataProvider } from "./contexts/DataProvider";
import FinishScreen from "./pages/FinishScreen";
import PageNotFound from "./pages/PageNotFound";
import PremierLeagueQxts from "./components/PremierLeagueQxts";
import LaligaQxts from "./components/LaligaQxts";
import ChampionsLeagueQxts from "./components/ChampionsLeagueQxts";
import GlobalStyle from "./globalStyles";
// import ParticlesContainer from "./pages/Particles";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="selection" element={<Selection />} />
          <Route path="premierLeague" element={<PremierLeague />}>
            <Route path="questions" element={<PremierLeagueQxts />} />
          </Route>
          {/* <Route path='particle' element={<ParticlesContainer />} /> */}

          <Route path="laLiga" element={<Laliga />}>
            <Route path="questions" element={<LaligaQxts />} />
          </Route>
          <Route path="championsLeague" element={<ChampionsLeague />}>
            <Route path="questions" element={<ChampionsLeagueQxts />} />
          </Route>
          <Route path="finish" element={<FinishScreen />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
