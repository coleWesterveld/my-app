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
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [query,setQuery] = useState("")

  // Handler to select an article
  const handleArticleClick = (articleId: number) => {
    setSelectedArticle(articleId);
  };


  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : 'light'));
  }
  const handleSearch = (query: string) => {
    setQuery(query)
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
        <div style={{paddingLeft: "300px"}}>
          <div className = "search-bar" style = {{
            padding: '10px', 
            color: theme == 'dark' ? '#666' : '#333',
            width : '100vf',
            zIndex: '500'

          }}>
            <SearchBar onSearch={handleSearch} placeholder = "Enter search adress"/>
          </div>

          <div style={{
            //paddingTop: '100px',
            marginTop: '100px',
            marginBottom : '20px',
            marginRight: '40px',
            //padding: '20px',
            overflowY: 'auto', // Enables scrolling for the content area
            maxHeight: 'calc(100vh - 200px)', // Adjust to exclude navbar and search bar height
            zIndex: '0'
          }}>
            {query && <NewsApp query = {query}/>}
          </div>
          
        </div>
        </div>
    </ThemeContext.Provider>
  )}
export default App;
