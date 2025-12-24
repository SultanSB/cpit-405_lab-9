import { Routes, Route } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";
import Search from "./components/search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
}

export default App;
