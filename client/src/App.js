
import './App.css';

import logo from './logo.svg';

function App() {
  return (
      <div className="p-10">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind is working!
        </h1>

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </div>
  );
}

export default App;
