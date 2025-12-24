import { Link } from "react-router-dom";
import "../RecipeList.css";

function RecipeList({ recipes }) {
    if (!recipes || recipes.length === 0) {
        return null;
    }

    return (
        <div className="recipe-grid">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                    <div className="recipe-image-wrapper">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="recipe-image"
                            loading="lazy"
                        />
                    </div>
                    <div className="recipe-card-content">
                        <h3 className="recipe-title">{recipe.title}</h3>
                        <Link to={`/recipe/${recipe.id}`} className="recipe-details-link">
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RecipeList;
