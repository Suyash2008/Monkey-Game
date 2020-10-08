var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var bananaGroup;
var survivaltime = 0;
var gamestate = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400,400) 
  
  obstacleGroup = new Group();
  bananaGroup = new Group();

  monkey = createSprite(80,315);
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(400,350,900,10);
  
  ground.x = ground.width/2;
  console.log(monkey.y)
   
}


function draw() {
  background("white")
  
  if(gamestate === "play"){
    
  
  
  monkey.y += 7;
  if(keyWentDown("space")&& monkey.y > 300){
    monkey.y = monkey.y - 250
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    
  }
    if(obstacleGroup.isTouching(monkey)){
    monkey.destroy();  
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    gamestate = "end";
    
  }
  
  spawnObstacle();
  spawnBanana()
  }
  
  if(gamestate === "end"){
    survivaltime = 0;
  }
  ground.velocityX = -4;
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  stroke("black");
  textSize(20);
  text("survivalTime "+survivaltime,150,50);
  survivaltime = Math.round(frameCount/frameRate());
  
  monkey.collide(ground);
  
  
  drawSprites();

  
   
}
function spawnObstacle(){
 if(frameCount % 300 === 0){
obstacle = createSprite(401,310);
obstacle.addImage(obstaceImage); 
obstacle.scale = 0.2   
obstacle.velocityX = -8;
obstacle.lifetime = 150; 
obstacleGroup.add(obstacle);   
 }   
}

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(401,Math.round(random(120,200)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 150;
    bananaGroup.add(banana);
  }

}



