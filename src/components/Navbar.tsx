import React, {useEffect} from 'react';
import "./Navbar.css";

//import React, { useEffect } from "react";


interface NavbarProps {
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  useEffect(() => {
    document.title = "News Easy"; // Sets the page title
  }, []);
  return (
    <header className={`navbar navbar-${theme}`}>
      <div className="navbar-logo">
        <img src="/path-to-your-logo.png" alt="App Logo" />
        <h1 className="navbar-title">My App</h1>
      </div>
      <nav className="navbar-links">
        <a href="#page1">(Another Page)</a>
        <a href="#page2">(Another Page)</a>
        <a href="#page3">(Another Page )</a>
      </nav>
    </header>
  );
};

export default Navbar;
