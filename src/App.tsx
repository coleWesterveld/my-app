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
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          new text
        </a>
      </header>
    </div>
  );
}

export default App;
