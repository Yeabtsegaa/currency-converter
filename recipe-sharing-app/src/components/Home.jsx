// Home.jsx
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";

const Home = () => {
  return (
    <div>
      <h1>All Recipes</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
};

export default Home;
