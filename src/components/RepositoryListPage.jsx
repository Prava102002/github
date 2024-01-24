import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const RepositoryListPage = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/repos`),
        ]);

        setUserInfo(userResponse.data);
        setRepositories(reposResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="py-8 bg-gray-100">
      <Navbar />
      {userInfo && (
        <div className="bg-white p-8 rounded shadow-md max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <img
              src={userInfo.avatar_url}
              alt={userInfo.login}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold">{userInfo.name}</h2>
              <p className="text-gray-600">@{userInfo.login}</p>
              <p className="text-gray-600">{userInfo.location}</p>
            </div>
          </div>
          <p className="text-gray-700">{userInfo.bio}</p>

          <Link
            to={`/followers/${username}`}
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            target="_blank"
          >
            View Followers
          </Link>
        </div>
      )}

      <div className="bg-white rounded shadow-md max-w-4xl mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4 px-8 pt-8 text-black">
          Repositories for {username}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8">
          {repositories.map((repo) => (
            <Link
              to={`/repository/${username}/${repo.name}`}
              className="text-blue-500 border p-6 rounded-md shadow-sm hover:shadow-lg transition duration-300 flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
            >
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-bold mb-1 text-blue-500">
                  {repo.name}
                </h3>
                <p className="text-gray-600">{repo.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepositoryListPage;
