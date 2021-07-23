var dog,sadDog,happyDog;
var food
var fedTime,feed,lastFed,addFood;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database;
  createCanvas(1000,400);
  
food=new Food();

fedStock=database.ref('FeedTime')
fedStock.on("value",readStock)


feed=createButton("Feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog);


addFood=createButton("Add Food")
addFood.position(800,95)
addFood.mousePressed(addFoods);




  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background(46,139,87);
  
  text("HELLO MY NAME IS ShAGGY",850,250,20,20)
  food.display();
  
  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val()
})
  
  if(lastFed>=12){
text("last Feed : "+ lastFed%12 + "PM",350,30)
  }else if(lastFed===0){
text("last Feed : 12 AM",350,30);
  }else{
    text("last Feed : "+lastFed+"AM",350,30);
  }
  
  
  
  
  
  
  drawSprites();
}

//function to read food Stock
function feedDog(){
dog.addImage(happyDog);

if(food.getFoodStock()<=0){
  food.updateFoodStock(food.getFoodStock()*0)
}else{
  food.updateFoodStock(food.getFoodStock()-1)
}
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })


}

//function to add food in stock
function addFoods(){

  foodS++
  database.ref('/').update({
    Food:foodS
  })
}