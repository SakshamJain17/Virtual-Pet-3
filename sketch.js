//Create variables here
var dogImg, dog1Img, database, foodS, foodStock;
var dog, feedFood, addFood, fedTime, lastFed, foodObj, food, addFoods; 
var readState, changeState;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  dog1Img = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();

	createCanvas(1000, 600);
  dog = createSprite(750,350,150,150);
  dog.addImage(dogImg);
  dog.scale= 0.6;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

  feedFood = createButton("Feed The Dog");
  feedFood.position(700, 95);
  feedFood.mousePressed(feedFood);

  addFood = createButton("Add Food");
  addFood.position(810, 95);
  addFood.mousePressed(addFood);

  foodObj= new Food();
}


      function draw() {  
         background(46, 139, 87);
    foodObj.deductFood();
    foodObj.display();

        fedTime= database.ref('Feed Time');
        fedTime.on("value", function(data){
            lastFed = data.val();
        });

        fill(255, 255, 254);
        textSize(45);
        if(lastFed>=12){
          text("Last Feed: "+ lastFed%12 + "PM", 250, 50); 
        } else if(lastFed==0){
          text("Last Feed : 12 AM", 250, 50);
        } else{
          text("Last Feed : "+ lastFed + " AM", 250, 50);
        }


  drawSprites();
  //add styles here

}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}
    function addfood(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
  
    function feedDog(){
    
      if(feedFood.mousePressed){
        dog.addImage(dog1Img);

        foodObj.updateFoodStock(foodObj.getFoodStock()-1);
        database.ref('/').update({
          Food: foodObj.getFoodStock(),
          fedTime: hour()
        })
      }
    
  }

    


