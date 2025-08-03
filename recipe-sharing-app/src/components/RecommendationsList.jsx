import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const favorites = useRecipeStore((state) => state.favorites);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  useEffect(() => {
    // Generate recommendations when component mounts or favorites change
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-section">
        <h2>Recommended for You</h2>
        <div className="no-recommendations">
          <p>Add some favorites to get personalized recommendations!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-section">
      <h2>Recommended for You</h2>
      <p className="recommendations-subtitle">
        Based on your favorites and preferences
      </p>
      <div className="recommendations-grid">
        {recommendations.map(recipe => (
          <div key={recipe.id} className="recipe-card recommendation-card">
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

export default RecommendationsList; 