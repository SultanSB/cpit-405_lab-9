import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => setRecipe(data));
    }, [id, API_KEY]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />

            <h2>Ingredients</h2>
            <ul>
                {recipe.extendedIngredients.map((item) => (
                    <li key={item.id}>{item.original}</li>
                ))}
            </ul>

            <h2>Instructions</h2>
            <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </div>
    );
}

export default RecipeDetails;
