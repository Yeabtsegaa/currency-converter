import {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
const RecipeDetail = ()=>{

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        setError(null);
        
        fetch("/data.json")
        .then((res)=>res.json())
        .then((data) => {
            const found = data.find((r)=> r.id.toString() === id);
            if (found) {
                setRecipe(found);
            } else {
                setError("Recipe not found");
            }
            setLoading(false);
        })
        .catch((err) => {
            setError("Failed to load recipe");
            setLoading(false);
        });
        
    },[id]);

    if (loading) {
        return (
            <div className="bg-green-200 p-8 text-center"  >
                <h2>Loading recipe...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-200 p-8 text-center">
                <h2 className="text-red-800">{ error}</h2>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="bg-yellow-200 p-8 text-center">
                <h2>Recipe not found</h2>
            </div>
        );
    }

    return(
        <div className="bg-green-200 p-8">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} className="w-full max-w-md rounded-lg shadow-lg mb-4" />
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <p>{recipe.summary}</p>
            </div>
            {recipe.details && (
                <div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                        <ul className="list-disc list-inside">
                            {recipe.details.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Steps</h3>
                        <ol className="list-decimal list-inside">
                            {recipe.details.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    ) 
}

export default RecipeDetail;