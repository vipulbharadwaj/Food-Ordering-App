import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header__logo"></div>
        <div className="header-content">
          <h2>Satisfy Your <span>Cravings</span></h2>
          <p>Fresh, fast, and fabulous! Your next meal is just a click away.</p>
          <button>Get Started!</button>
        </div>
      </div>
    </>
  );
};

export default Header;
