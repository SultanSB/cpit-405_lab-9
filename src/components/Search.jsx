import { useState } from "react";
import RecipeList from "./RecipeList";

function Search() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

    const searchRecipes = async () => {
        const res = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
        );
        const data = await res.json();
        setRecipes(data.results);
    };

    return (
        <div>
            <h1>Recipe Search</h1>

            <input
                type="text"
                placeholder="Search recipes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={searchRecipes}>Search</button>

            <RecipeList recipes={recipes} />
        </div>
    );
}

export default Search;
