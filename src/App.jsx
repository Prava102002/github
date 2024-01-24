import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RepositoryListPage from "./components/RepositoryListPage";
import RepositoryDetailsPage from "./components/RepositoryDetailsPage";
import FollowersPage from "./components/FollowersPage";
import { UserProvider } from "./utils/UserContext";
import React from "react";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/repositories/:username"
            element={<RepositoryListPage />}
          />
          <Route
            path="/repository/:owner/:repoName"
            element={<RepositoryDetailsPage />}
          />
          <Route path="/followers/:username" element={<FollowersPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
