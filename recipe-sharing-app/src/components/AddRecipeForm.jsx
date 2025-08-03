import {useState} from 'react';
import useRecipeStore from "./RecipeStore";
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () =>{
    const addRecipe = useRecipeStore(state => state.addRecipe);
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [description , setDescription] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
        addRecipe({id:Date.now(), title, description});
        setTitle("")
        setDescription("");
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder= 'Title'
             />
             <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder ="Description ..."
             ></textarea>

             <button type="submit">Add Recipe</button>
            
        </form>
    )

}

export default AddRecipeForm