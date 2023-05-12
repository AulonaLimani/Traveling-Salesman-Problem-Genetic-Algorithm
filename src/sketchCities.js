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

const d = 16;
let count = 0;

let restartAlgorithm = false;
const fitness = [];
let generateCities = false;
let population = [];
let recordDistance = Infinity;
let worstDistance = 0;
let bestEver;
let currentBest;

const start = (document.getElementById("start").onclick = function () {
  if (restartAlgorithm) {
        alert("You must refresh to ");
    } else {
        if (cities.length > 2) {
            generatePopulation = true;
            count = 0;
            restartAlgorithm = true;
        } else {
            alert("There must be at least 3 cities given!");
        }
    }
});
const generate = (document.getElementById("generate").onclick = function () {
  if (restartAlgorithm) {
        alert("You must refresh to ");
    } else {
        cities = [];
        order = [];
        generateCities = true;
        generatePopulation = true;
        generateCitiesFunction();
        count = 0;
        restartAlgorithm = true;
    }
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

  var ctx = canvas.drawingContext;

  if (startAlgorithm) {
    calculateFitness();
    normalizeFitness();
    nextGeneration();

    stroke(255, 0, 0);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let i = 0; i < currentBest.length; i++) {
            const n = currentBest[i];
            vertex(cities[n].x, cities[n].y);
            ellipse(cities[n].x, cities[n].y, 16, 16);
        }
        vertex(cities[currentBest[0]].x, cities[currentBest[0]].y);
        endShape();

        ctx.font = '15pt Arial';
        ctx.fillStyle = 'red';
        ctx.fillText(cities.length + " Cities", 5, 17);

        ctx.font = '15pt Arial';
        ctx.fillStyle = 'red';
        ctx.fillText("Worst Distance: " + worstDistance.toFixed(2), 5, 705);

        translate(width, 0);
        stroke(0, 128, 0);
        strokeWeight(4);
        noFill();
        beginShape();
        for (let i = 0; i < bestEver.length; i++) {
            const n = bestEver[i];
            vertex(cities[n].x, cities[n].y);
            ellipse(cities[n].x, cities[n].y, 16, 16);
        }
        vertex(cities[bestEver[0]].x, cities[bestEver[0]].y); // add a vertex at the first city
        endShape();

        ctx.font = '15pt Arial';
        ctx.fillStyle = 'green';
        ctx.fillText("Best Distance: " + recordDistance.toFixed(2), 5, 705);
    } else {

        stroke(255, 255, 255);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let i = 0; i < cities.length; i++) {
            const c = cities[i];
            ellipse(c.x, c.y, d, d);
        }
        endShape();

        if (cities.length !== 0) {
            ctx.font = '15pt Arial';
            ctx.fillStyle = 'red';
            ctx.fillText(cities.length + " Cities", 5, 17);
        }

  }
}

function mouseClicked() {
  if (!startAlgorithm) {
    if (!(mouseX < (d / 2) || mouseY < (d / 2) || mouseX > width - (d / 2) || mouseY > height - (d / 2))) {

      const x = mouseX;
      const y = mouseY;
      let pozitionTaken = false;

      for (let i = 0; i < cities.length; i++) {
        if (cities[i].x === x && cities[i].y === y) {
          pozitionTaken = true;
        }
      }

      if (!pozitionTaken) {
        const v = createVector(x, y);
        cities[cities.length] = v;
        order[count] = count;
        count++;
      }
    }

    if (generatePopulation) {
      for (let i = 0; i < popSize; i++) {
        population[i] = shuffle(order);
      }
      startAlgorithm = true;
    }
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
