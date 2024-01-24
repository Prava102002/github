import { Link } from "react-router-dom";
import "./Navbar.css";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to={`/`} className="navbar-link">
        Home
      </Link>
    </div>
  );
};

export default Navbar;
