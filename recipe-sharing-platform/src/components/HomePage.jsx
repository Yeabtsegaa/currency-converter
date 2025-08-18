import React, {useState , useEffect} from 'react';
import { Link } from "react-router-dom"

export default function RecipeList(){
    const [recipes,setRecipies] = useState([]);

    useEffect(()=>{
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => setRecipies(data))
            .catch((error) => console.error("Error Loading JSON:", error))
    },[])

    return(
        <div className ="grid lg:grid-cols-4 md:grid-cols-3 gap-6 sm:grid-cols-1 sm:grid-cols-2  bg-green-300 p-8 m-7">
            
            {recipes.map((recipe)=>(
                
                <div key={recipe.id} className="p-2 bg-green-500 shadow-lg rounded-lg hover:scale-110 transition-transform duration-300 hover:shadow-[4px_4px_10px_black] transition-shadow duration-300 ">
                    <img src={recipe.image } className="shadow-[6px_4px_10px] rounded-full mx-auto mb-5 mt-5 w-60 h-60  hover:scale-105 transition-transform duration-300 hover:rotate-180 transition transform duration-200 " ></img>
                    <div>
                        <h2 className=" text-xl font-bold  text-center text-white mb-5 ">{recipe.title}</h2>
                        <p className="text-white text-center mb-5">{recipe.summary}</p>
                         <Link to={`/recipes/${recipe.id}`} className ="text-white"> View Details  </Link>
                    </div>

                </div>
            
            ))};

             <div className="flex justify-end mb-6">
        <Link
          to="/add-recipe"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
           Add Recipe
        </Link>
      </div>

        </div>
    );
};