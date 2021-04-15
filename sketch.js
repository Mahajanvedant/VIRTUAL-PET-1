var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed;
var fedTime;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed the Dog");
  feed.position(900,95);
  feed.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  //write code to read fedtime value from the database
  fedTime = database.ref('hour');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  foodObj.display();
fill("black");
textSize(30);

  //write code to display text lastFed time here
 if(lastFed>=12){
text("Last Feed: "+ lastFed%12 + " PM", 350, 30);
 }else if(lastFed==0){
text("Last Feed: 12 AM", 350, 30);
 }else {
text("Last Feed : "+ lastFed +" AM", 350,30);
 }

 text("Food Available :" + foodS, 200,500);
  drawSprites();
  text(mouseX+","+mouseY ,mouseX,mouseY)
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//write code here to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    hour:hour()
  })


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}