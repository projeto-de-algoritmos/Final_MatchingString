import './App.css';
import { useState } from 'react';

function editDistance(a, b) {
  if (a.length == 0) return b.length
  if (b.length == 0) return a.length

  let matrix = []

  let i, j;

  for (i = 0; i <= a.length; i++) {
    matrix[i] = [i]
  }

  for (j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1]
      }
      else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
          Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1
          ))
      }
    }
  }
  return matrix[a.length][b.length]
}

function compare(a, b){
  if (a.distance < b.distance) return true
  if (a.distance == b.distance && a.string < b.string) return true
  return false
}

function merge(a, b) {
  let arr = []

  while (a.length && b.length) {
    if (compare(a[0], b[0])) {
      arr.push(a.shift())
    } else {
      arr.push(b.shift())
    }
  }

  return [...arr, ...a, ...b]
}

function mergeSort(array) {
  if (array.length < 2) {
    return array
  }

  const half = array.length / 2;
  const array2 = array.splice(0, half)

  return merge(mergeSort(array), mergeSort(array2))
}

function filterByDistance(options, value) {
  let array = [], i;

  for (i = 0; i < options.length; i++) {
    array[i] = {
      string: options[i],
      distance: editDistance(options[i], value)
    }
  }

  array = mergeSort(array)
  let newOptions = []
  
  for (i = 0; i < options.length; i++) {
    console.log(array[i].distance >= Math.max(array[i].string.length, value.length))
    if (array[i].distance < Math.max(array[i].string.length, value.length)){
      newOptions.push(array[i].string)
    }
  }

  return newOptions
}

async function getCities(){
  let cities = []

  await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos")
  .then((response) =>{
    return response.json()
  }).then((response) => {
    cities = response
  })

  console.log(cities)
}

function App() {
  console.log(filterByDistance(["Aba", "Abacate", "Abril", "Aberto", "Alberto", "Vei"], "Arba"))
  // console.log(getCities())
  const [value, setValue] = useState("")
  const [options, setOptions] = useState([])
  return (
    <div>
      <input type="text" value={value} onChange={() => setValue()}></input>
      <text>{"Aba"}</text>
    </div>
  );
}

export default App;
