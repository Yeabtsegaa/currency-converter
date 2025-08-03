import {useState} from 'react';
import useRecipeStore from "./RecipeStore";
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () =>{
    const addRecipe = useRecipeStore(state => state.addRecipe);
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [prepTime, setPrepTime] = useState(15);
    const [cookTime, setCookTime] = useState(30);
    const [difficulty, setDifficulty] = useState("Easy");
    const [category, setCategory] = useState("Other");
    const [tags, setTags] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
        const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item);
        
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        addRecipe({
            id: Date.now(), 
            title, 
            description,
            ingredients: ingredientsArray,
            prepTime: parseInt(prepTime),
            cookTime: parseInt(cookTime),
            difficulty,
            category,
            tags: tagsArray
        });
        
        setTitle("");
        setDescription("");
        setIngredients("");
        setPrepTime(15);
        setCookTime(30);
        setDifficulty("Easy");
        setCategory("Other");
        setTags("");
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
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
                placeholder="Recipe Description..."
                required
             ></textarea>
             <textarea 
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Ingredients (separated by commas)..."
                required
             ></textarea>
             
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
                 <div className="form-group">
                     <label>Category:</label>
                     <select 
                         value={category} 
                         onChange={(e) => setCategory(e.target.value)}
                     >
                         <option value="Italian">Italian</option>
                         <option value="Indian">Indian</option>
                         <option value="Mexican">Mexican</option>
                         <option value="Mediterranean">Mediterranean</option>
                         <option value="Dessert">Dessert</option>
                         <option value="Salad">Salad</option>
                         <option value="Other">Other</option>
                     </select>
                 </div>
                 <div className="form-group">
                     <label>Tags (comma-separated):</label>
                     <input 
                         type="text"
                         value={tags}
                         onChange={(e) => setTags(e.target.value)}
                         placeholder="quick, dinner, healthy..."
                     />
                 </div>
              </div>

             <button type="submit">Add Recipe</button>
            
        </form>
    )

}

export default AddRecipeForm