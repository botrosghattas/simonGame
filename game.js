$("body").click( function (event) {
    if ($(event.target).hasClass("button") && gamePattern.length != 0) {
            validation(event.target.id);
    } else  if (gamePattern.length == 0 && !$(event.target).is("#instructions") && !$(".modal").is(":visible")){
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
    $(".heading").text("Level " + gamePattern.length)
}

function validation(colour) {
    $("#"+colour).addClass("flash");
    setTimeout(() => $("#"+colour).removeClass("flash"), 150);
    userClickedPattern.push(colour);
    if (userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]) {
        new Audio("sounds/" + colour + ".mp3").play();
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence, 700);
            userClickedPattern = [];
        }
    } else {
        $(".heading").text("Game Over! Click Anywhere to Restart");
        new Audio("sounds/wrong.mp3").play();
        gamePattern = [];
        userClickedPattern = [];
    }   
}
// $(".btn-primary").click(()=>{
//     console.log($(".modal").is(":invisible"))
// });

// $(".modal-header").click(()=>{
//     console.log(!$(".modal").is(":visible"))
// });