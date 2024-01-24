import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (username.trim() === "") return;
    navigate(`/repositories/${username}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-500">
          GitHub User Search
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            GitHub Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter GitHub username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
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
