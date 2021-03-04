const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var score=0
var box1, Lion1,Lion2;
var backgroundImg,platform;
var stone, slingshot;

var gameState = "onSling";

function preload() {
    backgroundImg = loadImage("bg.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    Lion1 = new Lion(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    Lion2 = new Lion(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    stone = new Stone(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(stone.body,{x:200, y:50});
}

function draw(){
    background(backgroundImg);

    noStroke();
    textSize(35);
    fill("white");
    text("score "+ score,width-300,50)

    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    Lion1.display();
    Lion1.score();

    log1.display();

    box3.display();
    box4.display();
    Lion2.display();
    Lion2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    stone.display();
    platform.display();
    //log6.display();
    slingshot.display();    
    getTime();
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       slingshot.attach(stone.body);
    }
}


async function getTime(){
    var  response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var responseJSON = await response.json();
    var dt = responseJSON.datetime;
    var hour = dt.slice(11,13);
    if (hour>=06 && hour<=19){
        bg = "bg.png"

    }
    else {
        bg = "bg2.jpg"
    }
    backgroundImg = loadImage(bg)
}