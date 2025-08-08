import { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

const Search = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        username: "",
        location: "",
        minRepos: ""
    });
    const [userData, setUserData] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchMode, setSearchMode] = useState("single"); // "single" or "advanced"

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSingleUserSearch = async (e) => {
        e.preventDefault();
        setError("");
        setUserData(null);
        setSearchResults(null);
        setLoading(true);

        if (!searchCriteria.username.trim()) {
            setError("Please enter a username");
            setLoading(false);
            return;
        }
        
        try {
            const data = await fetchUserData(searchCriteria.username);
            setUserData(data);
        } catch (error) {
            if (error.message === "User not found") {
                setError("Looks like we cant find the user");
            } else {
                setError(error.message || "An error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAdvancedSearch = async (e) => {
        e.preventDefault();
        setError("");
        setUserData(null);
        setSearchResults(null);
        setLoading(true);

        if (!searchCriteria.username.trim()) {
            setError("Please enter a username to search for");
            setLoading(false);
            return;
        }
        
        try {
            const data = await searchUsers(searchCriteria);
            setSearchResults(data);
        } catch (error) {
            setError(error.message || "An error occurred during search");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        if (searchMode === "single") {
            handleSingleUserSearch(e);
        } else {
            handleAdvancedSearch(e);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        GitHub User Search
                    </h1>
                    <p className="text-gray-600">
                        Search for GitHub users with advanced filtering options
                    </p>
                </div>

                {/* Search Mode Toggle */}
                <div className="flex justify-center mb-6">
                    <div className="bg-white rounded-lg p-1 shadow-md">
                        <button
                            onClick={() => setSearchMode("single")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                searchMode === "single"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            Single User
                        </button>
                        <button
                            onClick={() => setSearchMode("advanced")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                searchMode === "advanced"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            Advanced Search
                        </button>
                    </div>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username *
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter GitHub username"
                                value={searchCriteria.username}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                required
                            />
                        </div>

                        {/* Advanced Search Fields */}
                        {searchMode === "advanced" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        placeholder="e.g., San Francisco, CA"
                                        value={searchCriteria.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Repositories
                                    </label>
                                    <input
                                        type="number"
                                        id="minRepos"
                                        name="minRepos"
                                        placeholder="e.g., 10"
                                        min="0"
                                        value={searchCriteria.minRepos}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                searchMode === "single" ? "Search User" : "Search Users"
                            )}
                        </button>
                    </form>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <svg className="h-5 w-5 text-red-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-3 text-sm text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Single User Results */}
                {userData && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                            {userData.avatar_url && (
                                <img 
                                    src={userData.avatar_url} 
                                    alt={`${userData.login}'s profile`} 
                                    className="w-32 h-32 rounded-full border-4 border-gray-200"
                                />
                            )}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {userData.name || userData.login}
                                </h2>
                                <p className="text-gray-600 mb-4">@{userData.login}</p>
                                {userData.bio && (
                                    <p className="text-gray-700 mb-4">{userData.bio}</p>
                                )}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{userData.public_repos}</div>
                                        <div className="text-sm text-gray-600">Repositories</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{userData.followers}</div>
                                        <div className="text-sm text-gray-600">Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">{userData.following}</div>
                                        <div className="text-sm text-gray-600">Following</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">{userData.public_gists}</div>
                                        <div className="text-sm text-gray-600">Gists</div>
                                    </div>
                                </div>
                                {userData.location && (
                                    <div className="mt-4 flex items-center text-gray-600">
                                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {userData.location}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

               
           {/* Advanced Search Results */}
{searchResults && (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Search Results ({searchResults.total_count} users found)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.items.map((user) => (
                <div 
                    key={user.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center space-x-3">
                        <img 
                            src={user.avatar_url} 
                            alt={`${user.login}'s avatar`} 
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <h4 className="font-medium text-gray-800">{user.login}</h4>
                            <p className="text-sm text-gray-600">ID: {user.id}</p>
                            {/* Added GitHub profile link */}
                            <a 
                                href={user.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline text-sm"
                            >
                                View Profile
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)}

            </div>
        </div>
    );
};

export default Search;
