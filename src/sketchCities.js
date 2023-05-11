let statusP;
let canvas;
const width = 1440 / 2;
const height = 710;

let cities = [];
let order = [];
const popSize = 500;

let startAlgorithm = false;
let generatePopulation = false;
let nrCities;

const start = (document.getElementById("start").onclick = function () {
  //todo
});
const generate = (document.getElementById("generate").onclick = function () {
  //todo
});
const refresh = (document.getElementById("refresh").onclick = function () {
  window.location.reload();
});

function setup() {
  canvas = createCanvas(width * 2, height);

  statusP = createP("").style("font-size", "32pt");
}

function draw() {
  background(0);

  stroke(255, 255, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  vertex(1440 / 2 + 2, 0);
  vertex(1440 / 2 + 2, 710);
  endShape();

  if (startAlgorithm) {
    calculateFitness();
    normalizeFitness();
    nextGeneration();

    //todo
  }
}

function generateCitiesFunction() {
  nrCities = Math.floor(Math.random() * 11) + 10;
  let a = width;
  for (let i = 0; i < nrCities; i++) {
    const v = createVector(
      random(7 * (a / 8) - 1 * (a / 8) + 1 * (a / 8)) + 10,
      random(7 * (a / 8) - 1 * (a / 8)) + 1 * (a / 8) + 10
    );
    cities[i] = v;
    order[i] = i;
  }
  if (generatePopulation) {
    for (let i = 0; i < popSize; i++) {
      population[i] = shuffle(order);
    }
    startAlgorithm = true;
  }
}
