import React from "react";
import "../../landing.css";

import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar ">
      <div className=" navbar-inner ">
        <Link to={"/"} className="brand">
          FloraUrban
        </Link>
        <div className="nav-links">
          <Link to={"#"} prefetch="intent" className="nav-link active">
            Gardens
          </Link>
          <Link to="/marketplace" prefetch="intent" className="nav-link">
            Marketplace
          </Link>
          <Link to="/plant-tracking" prefetch="intent" className="nav-link">
            Tracking
          </Link>
          <Link to="/forum" prefetch="intent" className="nav-link">
            Community
          </Link>
        </div>
        <button className="btn btn-primary">Start Growing</button>
      </div>
    </nav>
  );
};
