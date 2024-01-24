import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RepositoryListPage from "./components/RepositoryListPage";
import RepositoryDetailsPage from "./components/RepositoryDetailsPage";
import FollowersPage from "./components/FollowersPage";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
