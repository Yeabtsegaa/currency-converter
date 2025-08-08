import axios from 'axios';

export const fetchUserData = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("User not found");
        } else if (error.response) {
            throw new Error(`GitHub API error: ${error.response.status}`);
        } else if (error.request) {
            throw new Error("Network error - please check your connection");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const searchUsers = async (searchCriteria) => {
    try {
        const { username, location, minRepos } = searchCriteria;
        let query = username;
        
        if (location) {
            query += ` location:${location}`;
        }
        
        if (minRepos) {
            query += ` repos:>=${minRepos}`;
        }
        
        const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("No users found");
        } else if (error.response) {
            throw new Error(`GitHub API error: ${error.response.status}`);
        } else if (error.request) {
            throw new Error("Network error - please check your connection");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}