let statusP;
let canvas;
const width = 1440 / 2;
const height = 710;

let startAlgorithm = false;
const d = 16;
let cities = [];
let order = [];
const popSize = 500;
const fitness = [];
let count = 0;
let generatePopulation = false;
let population = [];
let recordDistance = Infinity;
let worstDistance = 0;
let bestEver;
let currentBest;
let restartAlgorithm = false;

const container = document.getElementById("container");
const start = document.getElementById("start").onclick = function (){
    //todo
}
const refresh = document.getElementById("refresh").onclick = function (){
    window.location.reload();
}
const editMap = document.getElementById("editMap").onclick = function () {
    //todo
}
const editLocations = document.getElementById("editLocations").onclick = function () {
    //todo
}

function setup() {

    canvas = createCanvas(width * 2, height);

    statusP = createP('').style('font-size', '32pt');
}

function draw() {
    background(0, 0, 0, 0);
    if (startAlgorithm) {

        calculateFitness();
        normalizeFitness();
        nextGeneration();

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

    } else {

        stroke(0, 0, 0);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let i = 0; i < cities.length; i++) {
            const c = cities[i];
            ellipse(c.x, c.y, d, d);
        }
        endShape();

    }
}

function mouseClicked() {
    if (!startAlgorithm) {
        if (!(mouseX < (d / 2) || mouseY < (d / 2) || mouseX > (width * 2) - (d / 2) || mouseY > height - (d / 2))) {

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
