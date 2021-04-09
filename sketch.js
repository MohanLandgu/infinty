var boy,boyrunningimage;
var gb;
var invisible;
var choco,chimage;

var PLAY=1;
var END=0;
var gameState=1;

var score = 0;
var life=3;

var chGroup;
var crGroup;

var go,gameoverImage;
var re,restartImage;


function preload(){
  
 boyrunningimage=loadImage("muscle-marathon.jpg");
  gb=loadImage("MG_VH_CITY_ROAD_LOOP_PREW_500x300.jpg")
  chimage=loadImage("fc2f4ef3797db0ec50756a82d6d34f3c-chocolate-bar-cartoon-by-vexels.jpg");
                    
  crimage=loadImage("car_image-1.jpg");
  
  gameoverImage=loadImage("game-over (2).jpg");
  restartImage=loadImage("auto-restart (2).jpg");

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  boy=createSprite(100,height-30,40,40);
  boy.addImage("image",boyrunningimage);
  boy.scale=0.2
 
  invisible=createSprite(width/2,height-10,width,10)
  invisible.visible=false;
  
  go=createSprite(width/2,height/3);
  go.addImage("image",gameoverImage);
  go.scale=0.2;
  go.visible=false;
  
  re=createSprite(width/2,height/2);
  re.addImage("image",restartImage);
  re.scale=0.1
  re.visible=false;
 
 chGroup=new Group();
 crGroup=new Group();
}

function draw() {
  
  background(gb);
  
  if(gameState===PLAY){
    
     
  if((touches.length > 0||keyDown("space")) && boy.y>=height-80){
    
    boy.velocityY=-21
    touches=[]
  }
    
    if(crGroup.isTouching(boy)){
      
      life=life-1
      
    }
    
    if(chGroup.isTouching(boy)){

      chGroup[0].destroy();
      score=score+1
    
    }
    
    if(crGroup.isTouching(boy)){
      
      gameState=END
      
      
    }
    
  }else if(gameState===END){
    
    crGroup.destroyEach();
    chGroup.destroyEach();
    
    crGroup.setVelocityXEach(-1);
    chGroup.setVelocityXEach(-1);
    
    go.visible=true;
    re.visible=true;
    
   
    
    if(mousePressedOver(re)){
      
      reset();
    }
  }
  
 
  
  boy.velocityY=boy.velocityY+0.8
  
   boy.collide(invisible)
  spcar();
  spcho();
  
 drawSprites();
  fill("black")
  textSize(20)
  text("score : "+score,width/3,height/12);
  fill("black")

}



function spcar(){
  
  if(frameCount%200===0){
    car=createSprite(width+40,height+300,40,40);
    car.y=Math.round(random(340,340));
    car.setCollider('circle',0,0,350);
   // car.debug=false
    car.addImage("image",crimage);
    car.scale=0.1;
    car.velocityX=-(5 + 3*score/5)
   crGroup.add(car)
  }
 
}




function spcho(){
  
  if(frameCount%60===0){
     
  choco=createSprite(width+40,100,60,60);
  choco.y=Math.round(random(50,130))
  choco.addImage("image",chimage);
  choco.scale=0.1
  choco.velocityX=-(6+3*score/5)
     chGroup.add(choco)
  }
 
}


function reset(){
  
  gameState=PLAY
  
  re.visible=false;
  go.visible=false;
  
  score=0
  
}