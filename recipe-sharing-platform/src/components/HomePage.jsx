import React, {useState , useEffect} from 'react';

export default function RecipeList(){
    const [recipes,setRecipies] = useState([]);

    useEffect(()=>{
        fetch(" src/data.json")
            .then((response) => response.json())
            .then((data) => setRecipies(data))
            .catch((error) => console.error("Error Loading JSON:", error))
    },[])

    return(
        <div class="grid lg:grid-cols-4 md:grid-cols-3 gap-6 sm:grid-cols-2 bg-green-300 p-8 m-7">
            
            {recipes.map((recipe)=>(
                <div key={recipe.id} class="p-2 bg-green-500 shadow-lg rounded-lg hover:scale-110 transition-transform duration-300 hover:shadow-[4px_4px_10px_black] transition-shadow duration-300 ">
                    <img src={recipe.image } class="shadow-[6px_4px_10px] rounded-full mx-auto mb-5 mt-5 w-60 h-60  hover:scale-105 transition-transform duration-300 hover:rotate-180 transition transform duration-200 " ></img>
                    <div>
                        <h2 class=" text-xl font-bold  text-center text-white mb-5 ">{recipe.title}</h2>
                        <p class="text-white text-center mb-5">{recipe.summary}</p>
                    </div>
                </div>
            
            ))};
            

        </div>
    );
};