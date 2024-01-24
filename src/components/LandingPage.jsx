import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (username.trim() === "") return;
    navigate(`/repositories/${username}`);
  };

  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <h1 className="landing-page-title">GitHub User Search</h1>
        <div className="landing-page-input">
          <label htmlFor="username" className="landing-page-label">
            GitHub Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="landing-page-text-input"
            placeholder="Enter GitHub username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          className="landing-page-button"
          type="button"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
