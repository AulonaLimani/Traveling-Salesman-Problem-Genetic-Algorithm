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

let found = false;
let foundCout = 0;
let foundComparisons;
let ratio = 1.000001;
let multiplicator = 100;
let currentDistance = Infinity;

const start = (document.getElementById("start").onclick = function () {
    if (restartAlgorithm) {
        alert("You must refresh to try again");
    } else {
        if (cities.length > 2) {
            generatePopulation = true;
            count = 0;
            restartAlgorithm = true;
            foundComparisons = cities.length * ((cities.length / ratio) * multiplicator).toFixed(0);
        } else {
            alert("There must be at least 3 cities given!");
        }
    }
});
const generate = (document.getElementById("generate").onclick = function () {
    if (restartAlgorithm) {
        alert("You must refresh to try again ");
    } else {
        generateCities = true;
        // generatePopulation = true;
        generateCitiesFunction();
        count = 0;
        restartAlgorithm = true;

        foundComparisons = cities.length * ((cities.length / ratio) * multiplicator).toFixed(0);
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

        if (!found) {
            calculateFitness();
            normalizeFitness();
            nextGeneration();

            ctx.font = '20pt Arial';
            ctx.fillStyle = 'Green';
            ctx.fillText(((foundCout / foundComparisons) * 100).toFixed(0) + "% checked if this is the right path", width + 10, 25);

        } else {
            ctx.font = '20pt Arial';
            ctx.fillStyle = 'Green';
            ctx.fillText("Found!", width + 10, 25);
        }

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

        ctx.font = '20pt Arial';
        ctx.fillStyle = 'red';
        ctx.fillText(cities.length + " Cities", 5, 25);

        ctx.font = '20pt Arial';
        ctx.fillStyle = 'red';
        ctx.fillText("Worst Distance: " + worstDistance.toFixed(2), 5, 700);

        ctx.font = '20pt Arial';
        ctx.fillStyle = 'red';
        ctx.fillText("Current Distance: " + currentDistance.toFixed(2), width - 330, 700);

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

        ctx.font = '20pt Arial';
        ctx.fillStyle = 'green';
        ctx.fillText("Best Distance: " + recordDistance.toFixed(2), 5, 700);
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
                cities[cities.length] = createVector(x, y);
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
    nrCities = Math.floor(Math.random() * 16) + 15;
    let a = width;
    for (let i = 0; i < nrCities; i++) {
        cities[i] = createVector(
            random(7 * (a / 8) - (a / 8) + (a / 8)) + 10,
            random(7 * (a / 8) - (a / 8)) + (a / 8) + 10
        );
        order[i] = i;
    }

    for (let i = 0; i < popSize; i++) {
        population[i] = shuffle(order);
    }
    startAlgorithm = true;
}
