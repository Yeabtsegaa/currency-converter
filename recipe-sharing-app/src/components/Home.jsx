// Home.jsx
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";
import FavoritesList from "./FavoritesList";
import RecommendationsList from "./RecommendationsList";

const Home = () => {
  return (
    <div>
      <h1>Recipe Collection</h1>
      
      {/* Recommendations Section */}
      <RecommendationsList />
      
      {/* Favorites Section */}
      <FavoritesList />
      
      {/* All Recipes Section */}
      <div className="all-recipes-section">
        <h2>All Recipes</h2>
        <SearchBar />
        <RecipeList />
      </div>
    </div>
  );
};

export default Home;
