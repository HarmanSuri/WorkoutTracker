import React, {useEffect, useState} from 'react';
import './App.css';


function App() {
  const testArr = [1, 2, 3, 4, 5];
  const [inputArr, setInputArr] = useState([]);

  const [inputData, setInputData] = useState({
    sets:""
  });
  
  useEffect(
    () => {
      console.log(inputArr);
    }, [inputArr]
  )

  function changeHandler(e) {
    setInputData({...inputData, [e.target.name]:e.target.value})
  }
  
  function onClick() {
    if (inputData.sets !== '') {
      setInputArr([...inputArr, inputData.sets]);
      console.log(inputArr);
      setInputData({sets:""});
    }
  }

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
      <input type='text' name='sets' value={inputData.sets} onChange={changeHandler}/>
      <button type='button' onClick={onClick}>Click</button>

      <table border={1}>
        <thead>
          <tr>
            <td>Sets</td>
          </tr>
        </thead>
        <tbody>
          {
            inputArr.map(
              (ele, i) => {
                return(
                  <tr>
                    <td key={i}><input type='text' value={ele} readOnly></input></td>
                  </tr>
                )
              }
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
