'use strict';

var letters = [];
var density = 2.5;
var ribbonWidth = 92;
var shapeColor;
var fontSize = 200;
var pathSimplification = 0;
var pathSampleFactor = 0.1;
var inputField;

var textTyped = '';

var font;

function preload() {
  font = loadFont('NotoSansBold.ttf');
}

function setup() {
  let canvas = createCanvas(600, 500);
  canvas.position(windowWidth / 2, windowHeight / 2 - 200);
  noFill();
  strokeWeight(1);
  shapeColor = color(255, 255, 0);
  frameRate(80);

  // Input Field
  inputField = createInput();
  inputField.attribute('placeholder', 'Text eingeben');
  inputField.position(60, 250);
  inputField.size(150, 30);
  inputField.input(inputChanged); // Zuweisen der Funktion

  createLetters();
}

function inputChanged() {
  // Diese Funktion wird aufgerufen, wenn sich der Input-Wert ändert
  textTyped = inputField.value(); // Aktualisiere den Text
  createLetters(); // Aktualisiere die Buchstaben
}

function draw() {
  background(255);

  translate(100, height * 0.7);

  // Verwende eine Sinusfunktion für die Variation der ribbonWidth
  var sinValue = -sin(frameCount * 0.02);
  ribbonWidth = map(sinValue, -5, 0.8, 100, 1);

  for (var i = 0; i < letters.length; i++) {
    letters[i].draw();
  }
}

function createLetters() {
  letters = [];
  var chars = textTyped.split('');

  var x = 0;
  for (var i = 0; i < chars.length; i++) {
    if (i > 0) {
      var charsBefore = textTyped.substring(0, i);
      x = font.textBounds(charsBefore, 0, 0, fontSize).w;
    }
    var newLetter = new Letter(chars[i], x, 0);
    letters.push(newLetter);
  }
}

function Letter(char, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;

  Letter.prototype.draw = function () {
    var path = font.textToPoints(this.char, this.x, this.y, fontSize, { sampleFactor: pathSampleFactor });
    stroke(shapeColor);

    for (var d = 0; d < ribbonWidth; d += density) {
      beginShape();

      for (var i = 0; i < path.length; i++) {
        var pos = path[i];
        var nextPos = path[i + 1];

        if (nextPos) {
          var p0 = createVector(pos.x, pos.y);
          var p1 = createVector(nextPos.x, nextPos.y);
          var v = p5.Vector.sub(p1, p0);
          v.normalize();
          v.rotate(HALF_PI);
          v.mult(d);
          var pneu = p5.Vector.add(p0, v);
          curveVertex(pneu.x, pneu.y);
        }
      }

      endShape(CLOSE);
    }
  };
}

function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode == LEFT_ARROW) density *= 1.25;
  if (keyCode == RIGHT_ARROW) density /= 1.25;

  if (keyCode == UP_ARROW) {
    fontSize *= 1.1;
    createLetters();
  }
  if (keyCode == DOWN_ARROW) {
    fontSize /= 1.1;
    createLetters();
  }

  if (keyCode == ENTER) createLetters();
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      createLetters();
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    createLetters();
  }
}
