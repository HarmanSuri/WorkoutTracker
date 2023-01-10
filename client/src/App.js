import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []);

  return (
    <div className="App">

      {(typeof backendData.count === 'undefined') ? (
        <p>Loading...</p>
      ): (
        <p>{backendData.count}</p>
      )}

    </div>
  );
}

export default App;
