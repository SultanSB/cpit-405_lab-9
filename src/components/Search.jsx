import { useState } from "react";
import RecipeList from "./RecipeList";
import "../Search.css";

function Search() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

    const searchRecipes = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setSearched(true);

        const res = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&number=12`
        );
        const data = await res.json();
        setRecipes(data.results || []);
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    };

    return (
        <div className="search-container">
            <div className="search-header">
                <h1 className="search-title">🍳 Recipe Finder</h1>

                <div className="search-box">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for delicious recipes..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={searchRecipes}>
                        Search
                    </button>
                </div>
            </div>

            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            )}

            {!loading && searched && recipes.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">🍽️</div>
                    <p>No recipes found. Try a different search!</p>
                </div>
            )}

            {!loading && recipes.length > 0 && <RecipeList recipes={recipes} />}

            {!searched && !loading && (
                <div className="empty-state">
                    <div className="empty-state-icon">👨‍🍳</div>
                    <p>Search for your favorite recipes and discover new dishes!</p>
                </div>
            )}
        </div>
    );
}

export default Search;