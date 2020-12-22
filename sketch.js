
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var obstacles, bananas;
var bananaGroup, obstacleGroup
var score = 0;
var ground;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var survivalTime = 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  
 
}



function setup() {
  
  createCanvas(400,400);
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
 monkey=createSprite(80,305,20,20);
 monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocity=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
 
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
}


function draw() {
  
  background(221);
  
  
  
  fill("black");
  text("SURVIVAL TIME: "+score, 250, 20);
  
  if (gameState === PLAY){
  
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
   
  if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
  }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0; 
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);    
    bananaGroup.setVelocityXEach(0); 
    obstacleGroup.setLifetimeEach(-1); 
    bananaGroup.setLifetimeEach(-1);
  }
  
  if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
  }
     
  
 
  drawSprites()
  
}  

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.y = random(120,200);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
  }
 
  }

  function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(500,310,50,50);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }



}