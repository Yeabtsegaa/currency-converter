// RecipeDetails.jsx
import { useParams } from "react-router-dom";
import useRecipeStore from "./RecipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";
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
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

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
