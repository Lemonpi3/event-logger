import React, { useEffect } from 'react';
import { handleEvent } from './eventHandler';
import './App.css';

const App = () => {

  useEffect(() => {
    // Attach event listeners
    document.addEventListener('click', handleEvent);
    document.addEventListener('submit', handleEvent);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('click', handleEvent);
      document.removeEventListener('submit', handleEvent);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Event Delegation Demo</h1>
        <button id="myButton1" className="clickable">Click Me 1</button>
        <button id="myButton2" className="clickable">Click Me 2</button>
        <button id="myButton3" className="clickable">Click Me 3</button>
        <form id="myForm">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
};

export default App;
