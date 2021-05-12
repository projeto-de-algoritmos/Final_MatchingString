import "./App.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function editDistance(a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  let matrix = [];

  let i, j;

  for (i = 0; i <= a.length; i++) {
    matrix[i] = [i];
  }

  for (j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1)
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

function compare(a, b) {
  if (a.distance < b.distance) return true;
  if (a.distance == b.distance && a.string < b.string) return true;
  return false;
}

function merge(a, b) {
  let arr = [];

  while (a.length && b.length) {
    if (compare(a[0], b[0])) {
      arr.push(a.shift());
    } else {
      arr.push(b.shift());
    }
  }

  return [...arr, ...a, ...b];
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  const half = array.length / 2;
  const array2 = array.splice(0, half);

  return merge(mergeSort(array), mergeSort(array2));
}

function filterByDistance(options, value, setList) {
  let array = [],
    i;

  for (i = 0; i < options.length; i++) {
    array[i] = {
      string: String(options[i]),
      distance: editDistance(String(options[i]), String(value)),
    };
  }

  array = mergeSort(array);
  let newOptions = [];

  for (i = 0; i < options.length; i++) {
    if (value == undefined) console.log(i);
    if (array[i].distance < Math.max(array[i].string.length, value.length)) {
      newOptions.push(array[i].string);
    }
  }

  newOptions = newOptions.splice(0, 20);
  setList(newOptions);
}

async function getCities(setOptions) {
  let cities = [];

  await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      cities = response;
    });

  cities = cities.map((value) => value.nome);
  setOptions(cities);
}

function App() {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState(["a", "b", "c", "aa", "ab", "abar"]);
  const [list, setList] = useState(["Algo"]);

  getCities(setOptions)

  return (
    <div className="container">
      <h1 id="product-sans">
        <b className="textBlue">M</b>
        <b className="textRed">a</b>
        <b className="textYellow">t</b>
        <b className="textBlue">c</b>
        <b className="textGreen">h</b>
        <b className="textRed">i</b>
        <b className="textRed">n</b>
        <b className="textYellow">g</b>
        <b className="textGreen">S</b>
        <b className="textBlue">t</b>
        <b className="textRed">r</b>
        <b className="textYellow">i</b>
        <b className="textGreen">n</b>
        <b className="textBlue">g</b>
      </h1>
      <div className="contentContainer">
        <div id="inputWrapper">
          <FaSearch className="searchIcon" color="#9aa0a6" size={15} />
          <input
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              filterByDistance(options, event.target.value, setList);
            }}
          ></input>
        </div>
        <div className="listContainer">
          {list.map((value, index) => {
            return (
              <div key={index} className="listItem">
                <text>{value}</text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
