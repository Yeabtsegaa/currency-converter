export const fetchUserData = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error("User not found");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}