import { useUserContext } from "../utils/UserContext";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./RepositoryDetailsPage.css"; // Import the CSS file

const RepositoryDetailsPage = () => {
  const { userData, setUserData } = useUserContext();
  const { owner, repoName } = useParams();
  const repository =
    userData[owner]?.repositories?.find((repo) => repo.name === repoName) || {};
  const [languages, setLanguages] = useState(repository.languages || {});

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      if (!userData[owner] || !userData[owner].repositories) {
        try {
          // Fetch repository details
          const repoResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repoName}`
          );

          setUserData((prevData) => ({
            ...prevData,
            [owner]: {
              ...prevData[owner],
              repositories: prevData[owner]?.repositories
                ? prevData[owner].repositories.map((repo) =>
                    repo.name === repoName
                      ? { ...repo, ...repoResponse.data }
                      : repo
                  )
                : [repoResponse.data],
            },
          }));

          // Fetch repository languages
          const languagesResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repoName}/languages`
          );
          setLanguages(languagesResponse.data);
        } catch (error) {
          console.error("Error fetching repository details:", error);
        }
      }
    };

    fetchRepositoryDetails();
  }, [owner, repoName, userData, setUserData, setLanguages]);

  return (
    <div className="repository-details-container">
      <Navbar />
      <div className="repository-details-content">
        <h2 className="repository-details-title">Repository Details</h2>
        {/* Display repository details */}
        {repository && (
          <div className="repository-details-info">
            <p>
              <span className="font-bold">Name: </span>
              {repository.name}
            </p>
            <p>
              <span className="font-bold">Description: </span>
              {repository.description}
            </p>
            <p>
              <span className="font-bold">Primary Language: </span>
              {repository.language}
            </p>
            <p>
              <span className="font-bold">Forks Count: </span>
              {repository.forks_count}
            </p>

            {/* Display languages */}
            {languages && (
              <div className="repository-details-languages">
                <h3 className="font-bold mb-1">Languages:</h3>
                <ul>
                  {Object.keys(languages).map((lang) => (
                    <li className="repository-details-language" key={lang}>
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
