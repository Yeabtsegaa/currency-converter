import useRecipeStore from "./RecipeStore";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import FavoriteButton from "./FavoriteButton";

const RecipeList = () =>{
    const recipes = useRecipeStore((state) => state.recipes);
    const searchTerm = useRecipeStore((state) => state.searchTerm);
    const filterBy = useRecipeStore((state) => state.filterBy);
    const difficultyFilter = useRecipeStore((state) => state.difficultyFilter);
    const maxPrepTime = useRecipeStore((state) => state.maxPrepTime);
    
    const filteredRecipes = useMemo(() => {
        let filtered = recipes;
        
        // Filter by search term
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(recipe => {
                switch (filterBy) {
                    case 'title':
                        return recipe.title.toLowerCase().includes(searchLower);
                    case 'ingredients':
                        return recipe.ingredients.some(ingredient => 
                            ingredient.toLowerCase().includes(searchLower)
                        );
                    case 'description':
                        return recipe.description.toLowerCase().includes(searchLower);
                    default: // 'all'
                        return (
                            recipe.title.toLowerCase().includes(searchLower) ||
                            recipe.description.toLowerCase().includes(searchLower) ||
                            recipe.ingredients.some(ingredient => 
                                ingredient.toLowerCase().includes(searchLower)
                            )
                        );
                }
            });
        }
        
        // Filter by difficulty
        if (difficultyFilter !== 'all') {
            filtered = filtered.filter(recipe => 
                recipe.difficulty === difficultyFilter
            );
        }
        
        // Filter by preparation time
        filtered = filtered.filter(recipe => 
            recipe.prepTime <= maxPrepTime
        );
        
        return filtered;
    }, [recipes, searchTerm, filterBy, difficultyFilter, maxPrepTime]);
    
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
                        <div className="recipe-header">
                            <h3>{recipe.title}</h3>
                            <FavoriteButton recipeId={recipe.id} />
                        </div>
                        <p>{recipe.description}</p>
                        <div className="recipe-meta">
                            <span className="difficulty">{recipe.difficulty}</span>
                            <span className="prep-time">Prep: {recipe.prepTime} min</span>
                            <span className="cook-time">Cook: {recipe.cookTime} min</span>
                        </div>
                        <div className="recipe-tags">
                            {recipe.tags && recipe.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
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