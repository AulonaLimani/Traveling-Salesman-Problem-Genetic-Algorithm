let statusP;
let canvas;
const width = 1440 / 2;
const height = 710;

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

}
