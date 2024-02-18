import React from "react";

//css
import "./Navbar.scss";

//component
import Search from "./Search/Search.js";

//react router
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-comp">
        <Link className="navbar-button logo" to="/">
          Home
        </Link>
        <div className="category-buttons">
          <Link className="navbar-button" to="characters">
            Characters
          </Link>
          <Link className="navbar-button" to="/episodes">
            Episodes
          </Link>
          <Link className="navbar-button" to="/locations">
            Locations
          </Link>
          <Link className="navbar-button" to="/favorites">
            Favorites
          </Link>
        </div>
        <Search />
      </div>
    </div>
  );
}

export default Navbar;