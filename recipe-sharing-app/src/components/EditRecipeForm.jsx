// EditRecipeForm.jsx
import { useState } from "react";
import useRecipeStore from "./RecipeStore";
import { useNavigate } from "react-router-dom";

const EditRecipeForm = ({ recipe, onClose }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const navigate = useNavigate();

  const [title, setTitle] = useState(recipe.title || "");
  const [description, setDescription] = useState(recipe.description || "");
  const [ingredients, setIngredients] = useState(recipe.ingredients ? recipe.ingredients.join(', ') : "");
  const [prepTime, setPrepTime] = useState(recipe.prepTime || 15);
  const [cookTime, setCookTime] = useState(recipe.cookTime || 30);
  const [difficulty, setDifficulty] = useState(recipe.difficulty || "Easy");

  const handleSubmit = (event) => {
    event.preventDefault();
    const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item);
    
    updateRecipe({ 
      id: recipe.id, 
      title, 
      description,
      ingredients: ingredientsArray,
      prepTime: parseInt(prepTime),
      cookTime: parseInt(cookTime),
      difficulty
    });
    if (onClose) onClose();
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Recipe</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        required
      />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (separated by commas)..."
        required
      />
      
      <div className="form-row">
        <div className="form-group">
          <label>Prep Time (minutes):</label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            min="0"
            max="180"
          />
        </div>
        <div className="form-group">
          <label>Cook Time (minutes):</label>
          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            min="0"
            max="180"
          />
        </div>
        <div className="form-group">
          <label>Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
