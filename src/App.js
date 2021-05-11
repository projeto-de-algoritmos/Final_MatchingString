import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function editDistance(a, b){
  if (a.length == 0) return b.length
  if (b.length == 0) return a.length

  let matrix = []

  let i, j;

  for (i=0; i<=a.length; i++){
    matrix[i] = [i]
  }

  for (j=0; j<=b.length; j++){
    matrix[0][j] = j;
  }

  for (i = 1; i<=a.length; i++){
    for (j = 1; j <= b.length; j++){
      if (a[i-1] === b[j-1]){
        matrix[i][j] = matrix[i-1][j-1]
      }
      else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1,
                        Math.min(
                          matrix[i-1][j] + 1, 
                          matrix[i][j-1] + 1
                        ))
      }
    }
  }
  return matrix[a.length][b.length]
}

function filterByDistance(options, value){
  
}

function App() {

  const [value, setValue] = useState("")
  const [options, setOptions] = useState([])
  return (
    <div>
      <input type="text" value={value} onChange={() => setValue()}></input>
      <text>{editDistance("Algo", "Auge")}</text>
    </div>
  );
}

export default App;
