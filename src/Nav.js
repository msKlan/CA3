import React from "react";
import { NavLink } from "react-router-dom";

import "./App.css";

function Nav({ isLoggedIn, loginMsg }) {
  // console.log("LOGIN", loginMsg);
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink activeClassName="active" to="/add-item">
                Add item
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/find-item">
                Find item
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink activeClassName="active" to="/login-out">
            {loginMsg}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
