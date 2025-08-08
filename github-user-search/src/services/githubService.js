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