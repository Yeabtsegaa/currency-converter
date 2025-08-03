import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './components/Home';
import RecipeList from "./components/RecipeList"
import AddRecipeForm from "./components/AddRecipeForm"
import RecipeDetails from "./components/RecipeDetails"


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
