import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const FollowersPage = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/followers`
        );
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Navbar />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Followers of {username}</h2>
        <ul>
          {followers.map((follower) => (
            <li key={follower.id} className="mb-4">
              <div className="flex items-center">
                <img
                  src={follower.avatar_url}
                  alt={follower.login}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <Link
                  to={`/repositories/${follower.login}`}
                  className="text-blue-500 hover:underline"
                >
                  {follower.login}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowersPage;
