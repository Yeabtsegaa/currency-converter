import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with eggs, cheese, and pancetta.",
      ingredients: ["pasta", "eggs", "cheese", "pancetta", "black pepper"],
      prepTime: 15,
      cookTime: 20,
      difficulty: "Medium",
      category: "Italian",
      tags: ["pasta", "quick", "dinner"]
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "A flavorful Indian curry with tender chicken and aromatic spices.",
      ingredients: ["chicken", "onions", "tomatoes", "spices", "coconut milk"],
      prepTime: 20,
      cookTime: 45,
      difficulty: "Easy",
      category: "Indian",
      tags: ["curry", "spicy", "dinner"]
    },
    {
      id: 3,
      title: "Chocolate Cake",
      description: "A rich and moist chocolate cake perfect for celebrations.",
      ingredients: ["flour", "cocoa", "sugar", "eggs", "milk", "butter"],
      prepTime: 25,
      cookTime: 35,
      difficulty: "Medium",
      category: "Dessert",
      tags: ["cake", "chocolate", "dessert"]
    },
    {
      id: 4,
      title: "Caesar Salad",
      description: "A classic salad with crisp lettuce, croutons, and Caesar dressing.",
      ingredients: ["lettuce", "croutons", "parmesan", "anchovies", "garlic"],
      prepTime: 10,
      cookTime: 0,
      difficulty: "Easy",
      category: "Salad",
      tags: ["salad", "healthy", "quick"]
    },
    {
      id: 5,
      title: "Beef Tacos",
      description: "Delicious Mexican tacos with seasoned ground beef and fresh toppings.",
      ingredients: ["ground beef", "tortillas", "onions", "tomatoes", "cheese", "lettuce"],
      prepTime: 15,
      cookTime: 20,
      difficulty: "Easy",
      category: "Mexican",
      tags: ["tacos", "beef", "dinner"]
    },
    {
      id: 6,
      title: "Greek Salad",
      description: "Fresh Mediterranean salad with feta cheese and olives.",
      ingredients: ["cucumber", "tomatoes", "olives", "feta", "red onion", "olive oil"],
      prepTime: 10,
      cookTime: 0,
      difficulty: "Easy",
      category: "Mediterranean",
      tags: ["salad", "healthy", "vegetarian"]
    }
  ],
  
  // Search and filtering state
  searchTerm: '',
  filterBy: 'all', // 'all', 'title', 'ingredients', 'description'
  difficultyFilter: 'all', // 'all', 'Easy', 'Medium', 'Hard'
  maxPrepTime: 60,
  
  // Favorites and recommendations state
  favorites: [],
  recommendations: [],
  
  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setFilterBy: (filterType) => set({ filterBy: filterType }),
  
  setDifficultyFilter: (difficulty) => set({ difficultyFilter: difficulty }),
  
  setMaxPrepTime: (time) => set({ maxPrepTime: time }),
  
  clearFilters: () => set({ 
    searchTerm: '', 
    filterBy: 'all', 
    difficultyFilter: 'all', 
    maxPrepTime: 60 
  }),

  // Favorites actions
  addFavorite: (recipeId) => set(state => {
    if (!state.favorites.includes(recipeId)) {
      const newFavorites = [...state.favorites, recipeId];
      // Generate recommendations when favorites change
      setTimeout(() => get().generateRecommendations(), 0);
      return { favorites: newFavorites };
    }
    return state;
  }),

  removeFavorite: (recipeId) => set(state => {
    const newFavorites = state.favorites.filter(id => id !== recipeId);
    // Generate recommendations when favorites change
    setTimeout(() => get().generateRecommendations(), 0);
    return { favorites: newFavorites };
  }),

  toggleFavorite: (recipeId) => set(state => {
    const isFavorite = state.favorites.includes(recipeId);
    if (isFavorite) {
      return get().removeFavorite(recipeId);
    } else {
      return get().addFavorite(recipeId);
    }
  }),

  // Recommendations actions
  generateRecommendations: () => set(state => {
    if (state.favorites.length === 0) {
      // If no favorites, recommend popular recipes
      const popularRecipes = state.recipes
        .filter(recipe => recipe.difficulty === "Easy" || recipe.prepTime <= 20)
        .slice(0, 3);
      return { recommendations: popularRecipes };
    }

    // Get favorite recipes
    const favoriteRecipes = state.recipes.filter(recipe => 
      state.favorites.includes(recipe.id)
    );

    // Analyze user preferences
    const userCategories = favoriteRecipes.map(recipe => recipe.category);
    const userTags = favoriteRecipes.flatMap(recipe => recipe.tags);
    const userDifficulty = favoriteRecipes.map(recipe => recipe.difficulty);

    // Find recipes similar to favorites
    const recommendations = state.recipes
      .filter(recipe => !state.favorites.includes(recipe.id)) // Exclude already favorited
      .map(recipe => {
        let score = 0;
        
        // Score based on category match
        if (userCategories.includes(recipe.category)) {
          score += 3;
        }
        
        // Score based on tag matches
        const matchingTags = recipe.tags.filter(tag => userTags.includes(tag));
        score += matchingTags.length * 2;
        
        // Score based on difficulty preference
        if (userDifficulty.includes(recipe.difficulty)) {
          score += 1;
        }
        
        // Bonus for similar prep time
        const avgPrepTime = favoriteRecipes.reduce((sum, r) => sum + r.prepTime, 0) / favoriteRecipes.length;
        if (Math.abs(recipe.prepTime - avgPrepTime) <= 10) {
          score += 1;
        }
        
        return { ...recipe, score };
      })
      .filter(recipe => recipe.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(({ score, ...recipe }) => recipe); // Remove score from final result

    return { recommendations };
  }),

  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, newRecipe]
  })),

  setRecipes: (recipes) => set({ recipes }),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

}));

export default useRecipeStore;

 