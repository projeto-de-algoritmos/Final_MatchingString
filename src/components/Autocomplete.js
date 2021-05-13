import "./App.css";
import React, { useState } from "react";
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
      if (a[i - 1].toLowerCase() === b[j - 1].toLowerCase()) {
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

function swap(A, i, j) {
  var temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
function partition(A, inicio, fim) {
  var meio = Math.floor((inicio + fim) / 2);
  var a = A[inicio];
  var b = A[meio];
  var c = A[fim];
  var medianaIndice; 
  if (compare(a, b) === -1) {
    if (compare(b, c) === -1) {
      medianaIndice = meio;
    } else {
      if (compare(a, c) == -1) {
        medianaIndice = fim;
      } else {
        medianaIndice = inicio;
      }
    }
  } else {
    if (compare(c, b) === -1) {
      medianaIndice = meio;
    } else {
      if (compare(c, a) === -1) {
        medianaIndice = fim;
      } else {
        medianaIndice = inicio;
      }
    }
  }
  swap(A, medianaIndice, fim);

  var pivo = A[fim];
  var i = inicio - 1;
  var j;
  for (j = inicio; j <= fim - 1; j++) {
    if (compare(A[j], pivo) <= 0) {
      i = i + 1;
      swap(A, i, j);
    }
  }
  swap(A, i + 1, fim);
  return i + 1; 
}

function quicksortMedianaDeTres(A, inicio, fim) {
  if (inicio < fim) {
    var q = partition(A, inicio, fim);
    quicksortMedianaDeTres(A, inicio, q - 1);
    quicksortMedianaDeTres(A, q + 1, fim);
  }
}

// retorna true se a for menor que b
function compare(a, b) {
  if (a.distance < b.distance) return -1;
  if (a.distance === b.distance && a.string < b.string) return -1;
  if (a.distance === b.distance && a.string === b.string) return 0;
  return 1;
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

  quicksortMedianaDeTres(array, 0, array.length -1);
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

function Autocomplete(props) {
  const [value, setValue] = useState("");
  const [list, setList] = useState(["Algo"]);
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
              filterByDistance(props.data, event.target.value, setList);
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

export default Autocomplete;
