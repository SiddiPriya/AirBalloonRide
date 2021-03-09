var balloon,background;
var database;
var position;

function preload(){
  backgroundImg=loadImage("images/1.png");
  balloonImage1=loadAnimation("images/2.png")
  balloonImage2=loadAnimation("images/3.png","images/4.png")

}

function setup() {
  database=firebase.database()
  createCanvas(1500,700);
  balloon=createSprite(250,650,150,150)
  balloon.addAnimation("HotAirBalloon",balloonImage1)
  balloon.scale=0.5
  var balloonPosition=database.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(backgroundImg); 

  if(position!==undefined){
  
  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-10
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10
  }
}
  drawSprites();
}
function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}
function readPosition(data){
  position=data.val()
  balloon.x=position.x
  balloon.y=position.y
}
function writePosition(x,y){
database.ref('balloon/position').set({
  "x":position.x+x,
  "y":position.y+y
})
}
function showError(){
console.log("Error in writing to the database")
}