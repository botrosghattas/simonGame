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

function validation(colour) {
    // console.log(colour);
    new Audio("sounds/" + colour + ".mp3").play();
    $("#"+colour).addClass("flash");
    setTimeout(() => $("#"+colour).removeClass("flash"), 150);
    userClickedPattern.push(colour);
    console.log("user pattern is " + userClickedPattern)
    if (userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]) {
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence, 700);
            userClickedPattern = [];
        }
    } else {
        $("h1").text("Game Over! Click Anywhere to Restart");
        new Audio("sounds/wrong.mp3").play();
        gamePattern = [];
        userClickedPattern = [];
    }   
}
