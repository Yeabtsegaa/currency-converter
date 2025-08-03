# Recipe Sharing App

A modern React application for sharing and managing recipes with full CRUD functionality.

## Features

- **Add Recipes**: Create new recipes with title and description
- **View Recipes**: Browse all recipes in a clean, card-based layout
- **Edit Recipes**: Update existing recipe details
- **Delete Recipes**: Remove recipes with confirmation
- **Responsive Design**: Modern UI with clean styling
- **State Management**: Uses Zustand for efficient state management

## Technologies Used

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Vite** - Build tool and development server
- **CSS3** - Custom styling

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Yeabtsegaa/alx-fe-reactjs.git
cd alx-fe-reactjs/recipe-sharing-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── AddRecipeForm.jsx      # Form for adding new recipes
│   ├── DeleteRecipeButton.jsx # Component for deleting recipes
│   ├── EditRecipeForm.jsx     # Form for editing recipes
│   ├── Home.jsx              # Home page component
│   ├── RecipeDetails.jsx     # Individual recipe view
│   ├── RecipeList.jsx        # List of all recipes
│   └── recipeStore.js        # Zustand store for state management
├── App.jsx                   # Main app component with routing
├── main.jsx                  # App entry point
└── App.css                   # Custom styles
```

## Functionality

### Adding Recipes
- Navigate to "Add Recipe" page
- Fill in title and description
- Submit to add to the recipe collection
- Automatically redirects to home page

### Viewing Recipes
- Home page displays all recipes in cards
- Click "View Details" to see full recipe information
- Clean, responsive layout

### Editing Recipes
- From recipe details page, click "Edit Recipe"
- Modify title and/or description
- Save changes to update the recipe
- Form automatically closes after saving

### Deleting Recipes
- From recipe details page, click "Delete Recipe"
- Recipe is immediately removed from the collection
- Automatically redirects to home page

## State Management

The app uses Zustand for state management with the following store structure:

```javascript
{
  recipes: [], // Array of recipe objects
  addRecipe: (newRecipe) => {}, // Add new recipe
  updateRecipe: (updatedRecipe) => {}, // Update existing recipe
  deleteRecipe: (id) => {}, // Delete recipe by ID
  setRecipes: (recipes) => {} // Set entire recipes array
}
```

## Styling

The app features a modern, clean design with:
- Responsive card layouts
- Consistent color scheme
- Hover effects and transitions
- Mobile-friendly design
- Clean typography

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Yeabtsegaa**
- GitHub: [@Yeabtsegaa](https://github.com/Yeabtsegaa)

## Acknowledgments

- Built as part of ALX Frontend React.js curriculum
- Inspired by the need for a simple recipe management system
