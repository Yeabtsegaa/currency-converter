import React from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const {
    searchTerm,
    filterBy,
    difficultyFilter,
    maxPrepTime,
    setSearchTerm,
    setFilterBy,
    setDifficultyFilter,
    setMaxPrepTime,
    clearFilters
  } = useRecipeStore();

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={clearFilters} className="clear-filters-btn">
          Clear Filters
        </button>
      </div>
      
      <div className="filter-options">
        <div className="filter-group">
          <label>Search in:</label>
          <select 
            value={filterBy} 
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Fields</option>
            <option value="title">Title Only</option>
            <option value="ingredients">Ingredients Only</option>
            <option value="description">Description Only</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Difficulty:</label>
          <select 
            value={difficultyFilter} 
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Max Prep Time: {maxPrepTime} min</label>
          <input
            type="range"
            min="0"
            max="120"
            value={maxPrepTime}
            onChange={(e) => setMaxPrepTime(parseInt(e.target.value))}
            className="time-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 