import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with eggs, cheese, and pancetta."
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "A flavorful Indian curry with tender chicken and aromatic spices."
    }
  ],
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

 