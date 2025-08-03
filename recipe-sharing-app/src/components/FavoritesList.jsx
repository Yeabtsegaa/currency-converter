import React from 'react';
import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);
  
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  if (favorites.length === 0) {
    return (
      <div className="favorites-section">
        <h2>My Favorites</h2>
        <div className="no-favorites">
          <p>You haven't added any favorites yet.</p>
          <p>Click the heart icon on any recipe to add it to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-section">
      <h2>My Favorites ({favorites.length})</h2>
      <div className="favorites-grid">
        {favoriteRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card favorite-card">
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
        ))}
      </div>
    </div>
  );
};

export default FavoritesList; 