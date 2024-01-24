import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const RepositoryDetailsPage = () => {
  const { owner, repoName } = useParams();
  const [repository, setRepository] = useState(null);
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      try {
        // Fetch repository details
        const repoResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repoName}`
        );
        setRepository(repoResponse.data);

        // Fetch repository languages
        const languagesResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repoName}/languages`
        );
        setLanguages(languagesResponse.data);
      } catch (error) {
        console.error("Error fetching repository details:", error);
      }
    };

    fetchRepositoryDetails();
  }, [owner, repoName]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Navbar />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">
          Repository Details
        </h2>
        {/* Display repository details */}
        {repository && (
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-bold">Name: </span>
              {repository.name}
            </p>
            <p>
              <span className="font-bold">Description: </span>
              {repository.description}
            </p>
            <p>
              <span className="font-bold">Primary Langauges: </span>
              {repository.language}
            </p>
            <p>
              <span className="font-bold">Forks Count: </span>
              {repository.forks_count}
            </p>

            {/* Display languages */}
            {languages && (
              <div>
                <h3 className="font-bold mb-1">Languages:</h3>
                <ul>
                  {Object.keys(languages).map((lang) => (
                    <li className="text-sm" key={lang}>
                      {lang}: {languages[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryDetailsPage;
