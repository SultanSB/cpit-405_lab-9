import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../RecipeDetails.css";

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                setRecipe(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recipe:", error);
                setLoading(false);
            });
    }, [id, API_KEY]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="loading-container">
                <p>Recipe not found</p>
            </div>
        );
    }

    return (
        <div className="recipe-details-container">
            <div className="recipe-hero">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-hero-image"
                />
                <div className="recipe-hero-overlay"></div>

                <Link to="/" className="back-button">
                    ← Back to Search
                </Link>

                <div className="recipe-hero-content">
                    <h1 className="recipe-details-title">{recipe.title}</h1>
                    <div className="recipe-meta">
                        {recipe.readyInMinutes && (
                            <div className="recipe-meta-item">
                                🕐 {recipe.readyInMinutes} mins
                            </div>
                        )}
                        {recipe.servings && (
                            <div className="recipe-meta-item">
                                👥 {recipe.servings} servings
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="recipe-content">
                <div className="recipe-section">
                    <h2 className="section-title">Ingredients</h2>
                    <div className="ingredients-grid">
                        {recipe.extendedIngredients?.map((item) => (
                            <div key={item.id} className="ingredient-item">
                                <span className="ingredient-bullet"></span>
                                <span className="ingredient-text">{item.original}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {recipe.instructions && (
                    <div className="recipe-section">
                        <h2 className="section-title">Instructions</h2>
                        <div
                            className="instructions-content"
                            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeDetails;