import useRecipeStore from "./RecipeStore";
import { Link } from "react-router-dom";

const RecipeList = () =>{
    const recipes = useRecipeStore( (state)=> state.recipes);
    return(
        <div>
            {recipes.map(recipe => (
                <div key = {recipe.id} className="recipe-card">
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <Link to={`/recipe/${recipe.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    )
}

export default RecipeList;