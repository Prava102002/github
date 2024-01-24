import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-5">
      <Link
        to={`/`}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Home
      </Link>
    </div>
  );
};

export default Navbar;
