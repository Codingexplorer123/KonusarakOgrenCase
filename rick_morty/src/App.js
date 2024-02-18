import "./App.scss";

import Home from "./pages/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import Characters from "./pages/Characters/Characters.js";
import Episodes from "./pages/Episodes/Episodes.js";
import Locations from "./pages/Locations/Locations.js";

import { Route, Routes } from "react-router-dom";
import Favotites from "./pages/Favorites/Favotites.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages max-w-screen-2xl mx-auto">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/characters" element={<Characters />}>
            <Route path=":charid" element={<Characters />} />
          </Route>
          <Route path="/episodes" element={<Episodes />}>
            <Route path=":episodeid" element={<Episodes />} />
          </Route>
          <Route path="/locations" element={<Locations />}>
            <Route path=":locationid" element={<Locations />} />
          </Route>
          <Route path="/favorites" element={<Favotites />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
