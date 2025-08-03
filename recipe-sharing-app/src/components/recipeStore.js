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
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "A flavorful Indian curry with tender chicken and aromatic spices.",
      ingredients: ["chicken", "onions", "tomatoes", "spices", "coconut milk"],
      prepTime: 20,
      cookTime: 45,
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Chocolate Cake",
      description: "A rich and moist chocolate cake perfect for celebrations.",
      ingredients: ["flour", "cocoa", "sugar", "eggs", "milk", "butter"],
      prepTime: 25,
      cookTime: 35,
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "Caesar Salad",
      description: "A classic salad with crisp lettuce, croutons, and Caesar dressing.",
      ingredients: ["lettuce", "croutons", "parmesan", "anchovies", "garlic"],
      prepTime: 10,
      cookTime: 0,
      difficulty: "Easy"
    }
  ],
  
  // Search and filtering state
  searchTerm: '',
  filterBy: 'all', // 'all', 'title', 'ingredients', 'description'
  difficultyFilter: 'all', // 'all', 'Easy', 'Medium', 'Hard'
  maxPrepTime: 60,
  
  // Computed filtered recipes
  get filteredRecipes() {
    const state = get();
    let filtered = state.recipes;
    
    // Filter by search term
    if (state.searchTerm.trim()) {
      const searchLower = state.searchTerm.toLowerCase();
      filtered = filtered.filter(recipe => {
        switch (state.filterBy) {
          case 'title':
            return recipe.title.toLowerCase().includes(searchLower);
          case 'ingredients':
            return recipe.ingredients.some(ingredient => 
              ingredient.toLowerCase().includes(searchLower)
            );
          case 'description':
            return recipe.description.toLowerCase().includes(searchLower);
          default: // 'all'
            return (
              recipe.title.toLowerCase().includes(searchLower) ||
              recipe.description.toLowerCase().includes(searchLower) ||
              recipe.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(searchLower)
              )
            );
        }
      });
    }
    
    // Filter by difficulty
    if (state.difficultyFilter !== 'all') {
      filtered = filtered.filter(recipe => 
        recipe.difficulty === state.difficultyFilter
      );
    }
    
    // Filter by preparation time
    filtered = filtered.filter(recipe => 
      recipe.prepTime <= state.maxPrepTime
    );
    
    return filtered;
  },
  
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

 