//Song is by Mayday(五月天) called 《如烟》



var keyId = "key=Y2gmgTfVXqIMqKjlPNYx1gOQs66CnA5p";
var url = "http://www.mapquestapi.com/directions/v2/route?";
var from = "&from=";
var to = "&to="
var city1 = "Portland";
var state1 = "OR";
var city2 = "Princeton";
var state2 = "NJ";
var bits = "%2C+";
var end = "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false";
var avoidance = "&avoids=Toll+Road";
var money = false;
var request = url + keyId + from + city1 + bits + state1 + to + city2 + bits + state2;
var dataSet;
var song;
var repeats;
var playing = false;
var move = 3;
var a  =5;
var x = 50;
var xMove = 5;
//var eff;

function preload() {
  loadJSON(request, getData);
  song = loadSound('song.mp3');
}

function getData(data) {
  dataSet = data;
}

function setup() {
  createCanvas(800, 600);
  getCity1 = createInput();
  getState1 = createInput();
  getCity2 = createInput();
  getState2 = createInput();
  //gasE = createInput();
  button = createButton('Submit');
  button.mouseReleased(getInfo);
  button2 = createButton('No Tolls?');
  button2.mouseReleased(turnOnTolls);
  console.log(dataSet);
}

function draw() {
  ellipseMode(CENTER);
  rectMode(CENTER);
  background(0);
  textSize(20);
  noStroke();
  fill(255);
  text("Going from " + city1 + " ," + state1 + " to " + city2 + ", " + state2 + ".", 50, 50);
  var gas = dataSet.route.fuelUsed;
  var tolls = dataSet.route.hasTollRoad;
  var distance = dataSet.route.distance;
  var sec = dataSet.route.time;
  //var gasTank = floor(gas / eff);
  var m = floor((sec % 3600) / 60);
  var hr = floor(sec / 3600)
  if (tolls === true) {
    text("$$$", 50, 75);
  } else {
    text("No extra fees.", 50, 75);
  }
  text("Total Distance: " + distance + "mi", 50, 100);
  text("Total Time: " + hr + "hr " + m + "min", 50, 125);
  text("Gas Used- Gallons: " + gas + " Estimated Price: $"+gas*2.5,50,150);
  text("Input Format: City From- Two Letter State From- City To - Two Letter State To", 50, 550);
  repeats = floor(sec/314);
  noFill();
  stroke(255);
  ellipse(50,350,a,a);
  ellipse(750,350,a,a);
  var s = map(x,50,750,0,255);
  fill(0,0,s);
  rect(x,350,25,25);
  if(a > 100 || a <0){
    move = -move;
  }
  if(x< 50 || x > 750){
    xMove = -xMove;
  }
  x += xMove;
  a += move;
  if(playing === true){
    fill(0,255,0);
  }else{
    fill(255,0,0);
  }
  noStroke();
  text("You can listen to this song "+ repeats + " times on the trip.",50,175);
}  

function mouseReleased(){
  if(mouseX >= 50 && mouseX <= textWidth("You can listen to this song "+ repeats + " times on the trip.")+50){
    if(mouseY<= 175 && mouseY>= 160){
      song.play();
    playing = true
    }
  }else{
    song.stop();
    playing = false;
  }
}
function turnOnTolls() {
  if (money === false) {
    money = true;
  } else {
    money = false;
  }
}

function getInfo() {
  city1 = getCity1.value();
  city2 = getCity2.value();
  state1 = getState1.value();
  state2 = getState2.value();
  //eff = gasE.value();
  if (money === false) {
    request = url + keyId + from + city1 + bits + state1 + to + city2 + bits + state2 + end;
  } else {
    request = url + keyId + from + city1 + bits + state1 + to + city2 + bits + state2 + end + avoidance;
  }
  loadJSON(request, getData);
}
