let statusP;
let canvas;
const width = 1440 / 2;
const height = 710;

const start = document.getElementById("start").onclick = function (){
    //todo
}
const generate = document.getElementById("generate").onclick = function (){
    //todo
}
const refresh = document.getElementById("refresh").onclick = function (){
    window.location.reload();
}

function setup() {

    canvas = createCanvas(width * 2, height);

    statusP = createP('').style('font-size', '32pt');
}

function draw() {
    background(0);

    stroke(255, 255, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    vertex((1440 / 2) + 2, 0);
    vertex((1440 / 2) + 2, 710);
    endShape();
}
