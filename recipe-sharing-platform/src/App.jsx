import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import RecipeList from './components/HomePage.jsx'
import RecipeDetail from './components/RecipeDetail.jsx'
import AddRecipe from "./components/AddRecipeForm.jsx";
import './App.css'


function App() {
  return(
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />}/>
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </Router>
  )

}

export default App
