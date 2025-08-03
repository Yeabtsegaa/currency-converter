import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import AddRecipeForm from "./components/AddRecipeForm"
import RecipeDetails from "./components/RecipeDetails"

// Note: BrowserRouter is set up in main.jsx to wrap this App component


function App() {

  return (
    <div>
        <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Recipe</Link>
        
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </div>
    

  )
   
}

export default App
