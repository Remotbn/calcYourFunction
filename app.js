"use strict";
const btnForm = document.querySelector(".btn-submit");

const aForm = document.querySelector("#input-a");
const bForm = document.querySelector("#input-b");
const cForm = document.querySelector("#input-c");

const error = document.querySelector(".error-container");
const overlay = document.querySelector(".overlay");

const yAxisOutput = document.querySelector("#output-yaxis");
const xAxisOutput1 = document.querySelector("#output-xaxis--1");
const xAxisOutput2 = document.querySelector("#output-xaxis--2");

let activeCalc = false;

const fxInfos = {
  a: undefined,
  b: undefined,
  c: undefined,
  xAxis: [],
  yAxis: undefined,
  fxKind: undefined, // "linear", "quadratic"
};

const init = function () {
  //Visuals
  overlay.style.display = "block";

  //values
  fxInfos.a = undefined;
  fxInfos.b = undefined;
  fxInfos.c = undefined;
  fxInfos.xAxis = [];
  fxInfos.yAxis = undefined;
  fxInfos.fxKind = undefined;
};

init();

const showError = function () {
  error.style.visibility = "visible";
};

const displayResults = function (xAxis = "x", yAxis = "y") {
  yAxisOutput.textContent = Math.round(fxInfos.yAxis * 100) / 100;
  xAxisOutput1.textContent = Math.round(fxInfos.xAxis[0] * 100) / 100;
  xAxisOutput2.textContent = Math.round(fxInfos.xAxis[1] * 100) / 100;

  overlay.style.display = "none";

  console.log(fxInfos);
};

const runProgramm = function (e) {
  e.preventDefault();
  // Reset old values
  init();

  fxInfos.a = Number(aForm.value);
  fxInfos.b = Number(bForm.value);
  fxInfos.c = Number(cForm.value);

  const a = fxInfos.a;
  const b = fxInfos.b;
  const c = fxInfos.c;

  // check if input is a number --> only checking with defined input (inputs field can also be not filled)

  if (a != "" || b != "") {
    error.style.visibility = "hidden";
    if (a === undefined || a === 0) {
      fxInfos.fxKind = "linear";
      fxInfos.yAxis = c;
      fxInfos.xAxis = (0 - c) / b;
    } else {
      fxInfos.fxKind = "quadratic";
      fxInfos.yAxis = c;
      fxInfos.xAxis[0] = -(b / 2) + Math.sqrt((b / 2) ** 2 - c);
      fxInfos.xAxis[1] = -(b / 2) - Math.sqrt((b / 2) ** 2 - c);
      // Bug: if fxInfos.xAxis[1] is 0, it prints -0 --> Maybe an issue when displayling
    }
    console.log(typeof a);

    displayResults(fxInfos.xAxis, fxInfos.yAxis);
  } else {
    init();
    showError();
  }
};

btnForm.addEventListener("click", runProgramm);

console.log(fxInfos);

// Decreasing font size when input field is overflow
/*


https://stackoverflow.com/questions/56099198/make-html-input-font-size-shrink-as-more-type-is-typed

function changefontsize() {
  var myInput = document.getElementById('myInput');
  if(isOverflown(myInput)) {
    while (isOverflown(myInput)){
    currentfontsize--;
    myInput.style.fontSize = currentfontsize + 'px';
    }
  }else {
    currentfontsize = 13;
    myInput.style.fontSize = currentfontsize + 'px';
    while (isOverflown(myInput)){
    currentfontsize--;
    myInput.style.fontSize = currentfontsize + 'px';
    }
  }	
}

function isOverflown(element) {
    return element.scrollWidth > element.clientWidth;
}
*/
