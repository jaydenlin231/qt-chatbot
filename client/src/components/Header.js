import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper blue darken-4">
        <ul>
          <li>
            <Link to={"/"} className="brand-logo" style={{ marginLeft: "1EM" }}>
              QUT Blackoard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
