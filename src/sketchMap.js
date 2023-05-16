let statusP;
let canvas;
const width = 1440 / 2;
const height = 710;

const container = document.getElementById("container");
const start = document.getElementById("start").onclick = function (){
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
}

const refresh = document.getElementById("refresh").onclick = function (){
    window.location.reload();
}
const editMap = document.getElementById("editMap").onclick = function () {
    container.classList.remove("container-below");
    container.classList.add("container-above");
}
const editLocations = document.getElementById("editLocations").onclick = function () {
    container.classList.remove("container-above");
    container.classList.add("container-below");
}

function setup() {

    canvas = createCanvas(width * 2, height);

    statusP = createP('').style('font-size', '32pt');
}

function draw() {
    background(0, 0, 0, 0);

}
