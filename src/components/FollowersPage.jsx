import { useUserContext } from "../utils/UserContext";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./FollowersPage.css";

const FollowersPage = () => {
  const { userData, setUserData } = useUserContext();
  const { username } = useParams();
  const followers = userData[username]?.followers || [];

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!userData[username] || !userData[username].followers) {
        try {
          const response = await axios.get(
            `https://api.github.com/users/${username}/followers`
          );
          setUserData((prevData) => ({
            ...prevData,
            [username]: {
              ...prevData[username],
              followers: response.data,
            },
          }));
        } catch (error) {
          console.error("Error fetching followers:", error);
        }
      }
    };

    fetchFollowers();
  }, [username, userData, setUserData]);

  return (
    <div className="followers-page">
      <Navbar />
      <div className="followers-content">
        <h2 className="followers-title">Followers of {username}</h2>
        <ul className="followers-list">
          {followers.map((follower) => (
            <li key={follower.id} className="follower-item">
              <div className="follower-info">
                <img
                  src={follower.avatar_url}
                  alt={follower.login}
                  className="follower-avatar"
                />
                <Link
                  to={`/repositories/${follower.login}`}
                  className="follower-username"
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
