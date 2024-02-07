let cp5Font;
let cp5FontSize;
let cp5FontColor;
let pg;
let fontRoboto;
let fontHelvetica;
let fontPilowlava;
let selectedFont;
let fontcolorRed;
let fontcolorBlue;
let fontcolorWhite;
let fontcolorPurple;
let selectedFontcolor;
let fontsizeKlein;
let fontsizeMittel;
let fontsizeGroß;
let selectedFontsize;
let inputField;

let gif;
let capturer;
let recording = false;
let startTime;


function setup() {
  

  fontRoboto = loadFont("Roboto.ttf");
  fontHelvetica = loadFont("HelveticaNeueRegular.ttf");
  fontPilowlava = loadFont("Pilowlava.otf");
  selectedFont = fontRoboto;

  // Input Field
  inputField = createInput();
  inputField.attribute('placeholder', 'Text eingeben');
  inputField.position(60, 250);
  inputField.size(150, 30);
  inputField.input(updateInputText);

  // Font Selection Dropdown
  cp5Font = createSelect();
  setupDropdown(cp5Font, 60, 300, 150, 30, ["Roboto", "Helvetica Neue", "Pilowlava"], updateFont, "Schriftart");

  // Font Size Selection Dropdown
  cp5FontSize = createSelect();
  setupDropdown(cp5FontSize, 60, 350, 150, 30, ["klein", "mittel", "groß"], updateFontSize, "Schriftgröße");

  // Font Color Selection Dropdown
  cp5FontColor = createSelect();
  setupDropdown(cp5FontColor, 60, 400, 150, 30, ["Weiß", "Rot", "Blau", "Lila"], updateFontColor, "Schriftfarbe");

  //Animation1
  let canvas = createCanvas(600, 500);
  canvas.position(windowWidth / 2, windowHeight / 2 -200);
  pg = createGraphics(500, 1000);
  
  fontsizeKlein = 100;
  fontsizeMittel = 200;
  fontsizeGroß = 300;
  selectedFontsize = fontsizeMittel;

  fontcolorRed = color(255, 64, 64);
  fontcolorBlue = color(0, 0, 255);
  fontcolorWhite = color(255);
  fontcolorPurple = color(135, 134, 218);
  selectedFontcolor = fontcolorWhite;

  gif = new GIF({
    workers: 2,
    quality: 10,
  });

  capturer = new CCapture({
    format: 'gif',
    framerate: 60,
    verbose: true,
    name: "foobar",     // videos will be named foobar-#.mp4, untitled if not set.
    extension: ".gif",
    workersPath: window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
    //workersPath: "node_modules/ccapture.js/src/gif.worker.js"  // extension for file. default = ".mp4"
    //codec: "mpeg4",     // this is an valid ffmpeg codec "mpeg4", "libx264", "flv1", etc...
                        // if not set ffmpeg guesses based on extension.
  });
  
}

function draw() {
  background(135, 134, 218);


  pg.background(135, 134, 218);
  pg.fill(selectedFontcolor);
  pg.textFont(selectedFont);
  pg.textSize(selectedFontsize);
  pg.push();
  pg.translate(width / 2, height / 2);
  pg.textAlign(CENTER, CENTER);
  pg.text(inputField.value(), 0, 0);
  pg.pop();

  let tilesX = 20;
  let tilesY = 20;

  let tileW = int(width / tilesX);
  let tileH = int(height / tilesY);

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      let wave = int(sin(frameCount * 0.0001 * (x * y)) * 30);

      let sx = x * tileW + wave;
      let sy = y * tileH;
      let sw = tileW;
      let sh = tileH;

      let dx = x * tileW;
      let dy = y * tileH;
      let dw = tileW;
      let dh = tileH;

      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }

  if (recording) {
    gif.addFrame(canvas, { delay: 1000 / 60 });
  }

   // Überprüfe, ob die Aufnahme gestartet wurde
   if (recording) {
    // Kopiere nur den Ausschnitt, den du exportieren möchtest
    let capturedCanvas = get(50, 50, 200, 150);

    // Füge jeden Frame dem Capturer hinzu
    capturer.capture(capturedCanvas.canvas);

    // Überprüfe, ob 10 Sekunden vergangen sind und stoppe die Aufnahme
    if (millis() - startTime > 1000) {
      stopRecording();
      // convertWebMtoMP4();
    }
  }
}

function setupDropdown(dropdown, posX, posY, width, height, options, changeCallback, placeholder) {
  dropdown.position(posX, posY);
  dropdown.size(width, height);
  dropdown.changed(changeCallback);

  if (placeholder) {
    dropdown.option(placeholder, ''); // empty value for placeholder
    dropdown.selected(placeholder);
  }

  for (let option of options) {
    dropdown.option(option);
  }
}

function updateFontColor() {
  let selectedFontcolorIndex = cp5FontColor.value();
  switch (selectedFontcolorIndex) {
    case 'Weiß':
      selectedFontcolor = fontcolorWhite;
      break;
    case 'Rot':
      selectedFontcolor = fontcolorRed;
      break;
    case 'Blau':
      selectedFontcolor = fontcolorBlue;
      break;
    case 'Lila':
      selectedFontcolor = fontcolorPurple;
      break;
    default:
      selectedFontcolor = fontcolorWhite;
  }
}

function updateFont() {
  let selectedIndex = cp5Font.value();
  switch (selectedIndex) {
    case 'Roboto':
      selectedFont = fontRoboto;
      break;
    case 'Helvetica Neue':
      selectedFont = fontHelvetica;
      break;
    case 'Pilowlava':
      selectedFont = fontPilowlava;
      break;
    default:
      selectedFont = fontRoboto;
  }
}

function updateFontSize() {
  let selectedFontsizeIndex = cp5FontSize.value();
  switch (selectedFontsizeIndex) {
    case 'klein':
      selectedFontsize = fontsizeKlein;
      break;
    case 'mittel':
      selectedFontsize = fontsizeMittel;
      break;
    case 'groß':
      selectedFontsize = fontsizeGroß;
      break;
    default:
      selectedFontsize = fontsizeGroß;
  }
}

function updateInputText() {
  pg.background(0);
  pg.fill(selectedFontcolor);
  pg.textFont(selectedFont);
  pg.textSize(selectedFontsize);
  pg.push();
  pg.translate(width / 2, height / 2);
  pg.textAlign(CENTER, CENTER);
  pg.text(inputField.value(), 0, 0);
  pg.pop();
}


function startRecording() {
  capturer = new CCapture({
    format: 'gif',     // Du kannst 'mp4', 'webm' oder andere unterstützte Formate verwenden
    framerate: 60,
    verbose: true,
  });

  capturer.start();
  recording = true;
  startTime = millis();
}

function stopRecording() {
  // Stoppe die Aufnahme und speichere die Datei
  capturer.stop();
  capturer.save();
  recording = false;
}