import useRecipeStore from "./RecipeStore";
import { Link } from "react-router-dom";

const RecipeList = () =>{
    const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
    const searchTerm = useRecipeStore((state) => state.searchTerm);
    
    return(
        <div>
            {filteredRecipes.length === 0 && searchTerm.trim() ? (
                <div className="no-results">
                    <p>No recipes found matching your search criteria.</p>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            ) : (
                filteredRecipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                        <div className="recipe-meta">
                            <span className="difficulty">{recipe.difficulty}</span>
                            <span className="prep-time">Prep: {recipe.prepTime} min</span>
                            <span className="cook-time">Cook: {recipe.cookTime} min</span>
                        </div>
                        <div className="ingredients-preview">
                            <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
                            {recipe.ingredients.length > 3 && '...'}
                        </div>
                        <Link to={`/recipe/${recipe.id}`}>View Details</Link>
                    </div>
                ))
            )}
        </div>
    )
}

export default RecipeList;