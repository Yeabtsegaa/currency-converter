import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setUserData(null);

        if (!username.trim()) {
            setError("Please enter a username");
            return;
        }
        
        try {
            const data = await fetchUserData(username);
            setUserData(data);
        } catch (error) {
            setError(error.message || "An error occurred");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}

            {userData && (
                <div>
                    <h2>{userData.name || userData.login}</h2>
                    <p>Username: {userData.login}</p>
                    <p>Followers: {userData.followers}</p>
                    <p>Following: {userData.following}</p>
                    <p>Public Repos: {userData.public_repos}</p>
                    {userData.avatar_url && (
                        <img src={userData.avatar_url} alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;