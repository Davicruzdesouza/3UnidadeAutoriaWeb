import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailPokemonProvider } from "./contexts/DetailPokemon";

function App() {
  return (
    <DetailPokemonProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalhes" element={<Detalhes />} />
        </Routes>
      </BrowserRouter>
    </DetailPokemonProvider>
  );
}

export default App;
