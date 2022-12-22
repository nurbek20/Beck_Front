import React from "react";
import "./navbar.css";
import { useContext } from "react";
import { MyContext } from "../../context/my-context/my-context";
const Navbar = () => {
  const { IsActive, isReady } = useContext(MyContext);
  return (
    <nav>
      <div className="nav-wrapper navbar blue ">
        <span onClick={() => IsActive(null)} className="brand-logo">
          MERN Todo App
        </span>
        {isReady === null ? (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li onClick={() => IsActive(1)}>Выйти</li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li onClick={() => IsActive(2)}>Регистрация</li>
            <li onClick={() => IsActive(1)}>Войти</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
