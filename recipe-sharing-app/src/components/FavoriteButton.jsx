import React from 'react';
import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  
  const isFavorite = favorites.includes(recipeId);

  return (
    <button 
      onClick={() => toggleFavorite(recipeId)}
      className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton; 