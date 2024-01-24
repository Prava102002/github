import { useUserContext } from "../utils/UserContext";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./RepositoryListPage.css"; // Import the CSS file

const RepositoryListPage = () => {
  const { userData, setUserData } = useUserContext();
  const { username } = useParams();
  const userInfo = userData[username] || {};
  const repositories = userInfo.repositories || [];

  useEffect(() => {
    const fetchData = async () => {
      if (!userData[username] || !userData[username].repositories) {
        try {
          const [userResponse, reposResponse] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`),
            axios.get(`https://api.github.com/users/${username}/repos`),
          ]);

          setUserData((prevData) => ({
            ...prevData,
            [username]: {
              ...prevData[username],
              ...userResponse.data,
              repositories: reposResponse.data,
            },
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [username, userData, setUserData]);

  return (
    <div className="repository-list-page">
      <Navbar />
      {userInfo && (
        <div className="user-info-container">
          <div className="user-info">
            <img
              src={userInfo.avatar_url}
              alt={userInfo.login}
              className="user-avatar"
            />
            <div className="user-details">
              <h2 className="user-name">{userInfo.name}</h2>
              <p className="user-username">@{userInfo.login}</p>
              <p className="user-location">{userInfo.location}</p>
            </div>
          </div>
          <p className="user-bio">{userInfo.bio}</p>

          <Link
            to={`/followers/${username}`}
            className="view-followers-button"
            target="_blank"
          >
            View Followers
          </Link>
        </div>
      )}

      <div className="repository-list-container">
        <h2 className="repository-list-title">Repositories for {username}</h2>
        <div className="repository-grid">
          {repositories.map((repo) => (
            <Link
              to={`/repository/${username}/${repo.name}`}
              className="repository-card"
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
            >
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="repository-owner-avatar"
              />
              <div className="repository-details">
                <h3 className="repository-name">{repo.name}</h3>
                <p className="repository-description">{repo.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepositoryListPage;
