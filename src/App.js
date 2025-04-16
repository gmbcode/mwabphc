import React from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className="Mock Allotment">
      <header className="App-header">
        <h1 align="center">Mock Wing Allotment</h1>
      </header>
      <main>
        <Form />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} - gmbcode</p>
      </footer>
    </div>
  );
}

export default App;
