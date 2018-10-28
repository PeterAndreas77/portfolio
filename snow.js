"use strict";
//credit to https://codepen.io/pimskie/pen/jEVPNx

let canvas = document.querySelector(".snow"),
  ctx = canvas.getContext("2d"),
  windowW = window.innerWidth,
  windowH = window.innerHeight,
  numFlakes = 100,
  flakes = [];

function Flake(x, y) {
  let maxWeight = 5,
    maxSpeed = 1;

  this.x = x;
  this.y = y;
  this.r = randomBetween(0, 1);
  this.a = randomBetween(0, Math.PI);
  this.aStep = 0.01;

  this.weight = randomBetween(2, maxWeight);
  this.alpha = this.weight / maxWeight;
  this.speed = (this.weight / maxWeight) * maxSpeed;

  this.update = function() {
    this.x += Math.cos(this.a) * this.r;
    this.a += this.aStep;
    this.y += this.speed;
  };
}

function letItSnow() {
  let i = numFlakes,
    flake,
    x,
    y;

  while (i--) {
    x = randomBetween(0, windowW, true);
    y = randomBetween(0, windowH, true);

    flake = new Flake(x, y);
    flakes.push(flake);
  }

  scaleCanvas();
  loop();
}

function scaleCanvas() {
  canvas.width = windowW;
  canvas.height = windowH;
}

function loop() {
  let i = flakes.length,
    flake;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, windowW, windowH);
  ctx.restore();

  while (i--) {
    flake = flakes[i];
    flake.update();

    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.weight, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(255, 255, 255, " + flake.alpha + ")";
    ctx.fill();

    if (flake.y >= windowH) {
      flake.y = -flake.weight;
    }
  }

  requestAnimationFrame(loop);
}

function randomBetween(min, max, round) {
  let num = Math.random() * (max - min + 1) + min;

  if (round) {
    return Math.floor(num);
  } else {
    return num;
  }
}

function distanceBetween(vector1, vector2) {
  let dx = vector2.x - vector1.x,
    dy = vector2.y - vector1.y;

  return Math.sqrt(dx * dx + dy * dy);
}

letItSnow();
