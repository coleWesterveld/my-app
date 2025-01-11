// TO RUN THE PROJECT (since it uses docker)
// commands:
// the following is to clear cache and stuff, good to try if getting errors
// docker-compose down
// docker-compose build --no-cache

// this is to run
// docker-compose up

// from there, it should be accessible through browser with:
// http://localhost:3000/

import React from 'react';
import './App.css';
import ReactSwitch from "react-switch";
import SearchBar from './components/searchbar';
import Navbar from './components/Navbar'; 
import SidebarMenu from "./components/Sidebar";
import { FaSun, FaMoon } from "react-icons/fa";
import NewsApp from "./components/News"


import { createContext, useState } from "react";
// import axios from "axios";  

export const ThemeContext = createContext<ThemeContextType | null>(null);

// Define the type for the context value
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

function App() {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : 'light'));
  }
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className={`App-${theme}`}
          style={{
            backgroundColor: theme === 'dark' ? '#333' : '#fff', // Apply background color
            color: theme === 'dark' ? '#fff' : '#000', // Apply text color
            minHeight: '100vh', // Ensure the background covers the full screen
            display: 'flex', // Optional: to ensure the switch is in the correct position
            flexDirection: 'column',
          }}
      >
      <Navbar theme={theme} />
        <div className="switch-container" style={{ border: `2px solid #${theme === 'dark' ? '666' : '777'}` }}>

          {/* <label className={`label-${theme}`}>
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </label> */}
          <ReactSwitch 
              
              onColor='#222'
              offColor = '#999'
              checked={theme === 'dark'}        // This controls whether the switch is on or off based on the theme
              onChange={toggleTheme}
              height={30}  // Adjust the height
              width={55}


              
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 14,
                    color: "#fff",
                    paddingRight: 2,
                  }}
                >
                  <FaSun />
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 14,
                    //color: "#f9d71c",
                    paddingLeft: 2,
                  }}
                >
                  <FaMoon />
                </div>
                }
            />
            <SidebarMenu theme={theme}/>
        </div>
          <div className = "Padding">
            <div className = "SearchButton">
              <SearchBar onSearch={handleSearch} placeholder = "Enter search adress"/>
            </div>
          </div>
        </div>
        <main style={{ padding: "20px" }}>
          <NewsApp />
        </main>
         
      
      

    </ThemeContext.Provider>
  )}
export default App;
