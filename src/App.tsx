// TO RUN THE PROJECT (since it uses docker)
// commands:
// docker build -t react-app .
// docker run -p 3000:80 react-app

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
          old text
        </a>
      </header>
    </div>
  );
}

export default App;
