$("body").click( function (event) {
    if ($(event.target).hasClass("btn") && gamePattern.length != 0) {
            validation(event.target.id);
    } else  if (gamePattern.length == 0) {
        nextSequence();
    }
});

var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    var randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);
    new Audio("sounds/"+randomChosenColour+".mp3").play();
    $("#"+randomChosenColour).fadeOut(150).fadeIn(150);
    $("h1").text("Level " + gamePattern.length)
    console.log("game pattern is " + gamePattern);
}


// $("h1").text("Level "+gamePattern.length);
// $(".btn").click(validation);

// var userChosenColour = function (){
//     $("body").click(function (event){
//         if ($(this).hasClass("btn")){
//             let userChosenColour = this.id;
//             new Audio("sounds/"+(this.id)+".mp3").play();
//             $("#"+this.id).addClass("flash");
//             setTimeout(() => $("#"+this.id).removeClass("flash"), 150);
//             let validation = true
//             for(let i=0; validation; i++){
//                 if(userChosenColour != gamePattern[i]){
//                     validation = false;
//                 }
                
//             }
//         }
//     }
// }

function validation(colour) {
    // console.log(colour);
    new Audio("sounds/" + colour + ".mp3").play();
    $("#"+colour).addClass("flash");
    setTimeout(() => $("#"+colour).removeClass("flash"), 150);
    userClickedPattern.push(colour);
    console.log("user pattern is " + userClickedPattern)
    if (userClickedPattern.length < gamePattern.length) {
        checkUserClick();
    } else {
        if(checkUserClick()){
            userClickedPattern = []
            setTimeout(nextSequence, 700);
        }       
    }   
}

function checkUserClick () {
    if (userClickedPattern[userClickedPattern.length-1] != gamePattern[userClickedPattern.length-1]){
        $("h1").text("Game Over! Click Anywhere to Restart");
        new Audio("sounds/wrong.mp3").play();
        gamePattern = [];
        userClickedPattern = [];
        return false
    } else {
        return true
    }
}

$(".add").click(nextSequence);
