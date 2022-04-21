// Getting the length of all drum class buttons
var numOfButton = document.querySelectorAll(".drum").length;

// Iterating to all the drums button [0-6] total 7
for (var i = 0; i < numOfButton; i++) {
  // Detecting click(i.e., event) to perform(or Listen) some task
  // Here this addEventListener(event, anonymousFunction) is a Higher Order Function and its 2nd parameter anonymous function passed
  // is called Callback Function
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    // Inside Anonymous Function - Used as 2nd Parameter
    // whatever query is being selected if we want to select its text element than use "this" keyword as this.innerHTML
    var buttonInnerHTML = this.innerHTML;
    // calling makeSound function to detect each key associated sound
    makeSound(buttonInnerHTML);
    // calling animation function in order to perform some animation when a key is press or click
    buttonAnimation(buttonInnerHTML);
  });
  // for loops end
}

// Detecting keyboard buttons by using directly document.addEventList.... so that whole webpage will detect pressing of key
document.addEventListener("keydown", function(event) {
  // Inside Anonymous Function - Used as 2nd parameter
  makeSound(event.key);
  buttonAnimation(event.key);
});

// play sound corresponding to any key press or click
function makeSound(key) {
  switch (key) {
    case "w":
      // Audio is a inbuilt Constructor that take sound file pathLocation as input
      // while creating customize Constructor the firstLetter should be in Capital letter
      var tom1 = new Audio("sounds/tom-1.mp3");
      // method called by Audio object
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default:
      console.log(buttonInnerHTML);
  }
}

function buttonAnimation(currentkey) {
  // adding pressed class to each button class object

  // Getting each button based upon its class from querySelector
  var activeButton = document.querySelector("." + currentkey);
  // Now adding the pressed class to that button class
  activeButton.classList.add("pressed");

  setTimeout(function() {
    // Inside Anonymous Function - 1st Parameter of setTimeout(function, timeInMiliSecond)
    activeButton.classList.remove("pressed");
  }, 100)
}
