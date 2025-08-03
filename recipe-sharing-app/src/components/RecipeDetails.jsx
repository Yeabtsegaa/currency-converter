// RecipeDetails.jsx
import { useParams } from "react-router-dom";
import useRecipeStore from "./RecipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";
import FavoriteButton from "./FavoriteButton";
import { useState } from "react";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(recipeId))
  );
  const [isEditing, setIsEditing] = useState(false);

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <FavoriteButton recipeId={recipe.id} />
      </div>
      <p>{recipe.description}</p>
      
      <div className="recipe-info">
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
        
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="ingredients-list">
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="recipe-actions">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Recipe"}
        </button>

        <DeleteRecipeButton recipeId={recipe.id} />
      </div>

      {isEditing && (
        <div className="edit-form">
          <EditRecipeForm recipe={recipe} onClose={() => setIsEditing(false)} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
