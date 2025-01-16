import "./Navbar.css";

//import React, { useEffect } from "react";


interface NavbarProps {
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {

  return (
    <header className={`navbar navbar-${theme}`}>
      <div className="navbar-logo">
        <img src="./logo.svg" alt="App Logo" />
        <h1 className="navbar-title">News Thing</h1>
      </div>
      <nav className="navbar-links">
        <a href="#page1">(Another Page)</a>
        <a href="#page2">(Another Page)</a>
        <a href="#page3">(Another Page)</a>
      </nav>
    </header>
  );
};

export default Navbar;
