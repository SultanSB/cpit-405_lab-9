import { Link } from "react-router-dom";

function RecipeList({ recipes }) {
    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <img src={recipe.image} alt={recipe.title} width="200" />
                    <br />
                    <Link to={`/recipe/${recipe.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
}

export default RecipeList;
