const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let counter = 0;
  for (let color of colorArray) {
    
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // give the div an index
    newDiv.id = "div" + counter;
    counter++;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

const currentMatch = [];
let matchedSoFar = 0;
let currentClickedIndex = '';
let lastClickedIndex = '';

// TODO: Implement this function!
function handleCardClick(event) {

  // Check to see the user is cheating by just clicking the same card
  console.log(`currentIndex: ${currentClickedIndex}, eventId: ${event.target.id}, length: ${currentMatch.length}`);
  if (currentClickedIndex === event.target.id && currentMatch.length === 1) {
    return 0;
  }

  // if the user isn't clicking wildly all over the page...
  if (currentMatch.length < 2) {
  // ...set the background color to the class name...
    event.target.style.backgroundColor = event.target.className;
    // ...add the color to the currentMatch array...
    currentMatch.push(event.target.className);
  }

  // ...and don't do anything else until a match happens or
  // the two selected mismatched tiles flip over
  else {
    return 0;
  }
  
  // if currentMatch.length = 2, check to see if the colors match in current match
  if (currentMatch.length === 2) {
    lastClickedIndex = currentClickedIndex;
    // if they do match, keep them flipped over and add two to matchSoFar
    if (currentMatch[0] === currentMatch[1]) {
      matchedSoFar += 2;
      currentMatch.pop();
      currentMatch.pop();
    }

    // if they don't match, start a timer for 1 sec to give us enough time to
    // show them their mistake AND rub it in their face and then...
    else {
      window.setTimeout(function () {
        // ...flip them both back over
        event.target.style.backgroundColor = "white";
        document.getElementById(lastClickedIndex).style.backgroundColor = "white";
        currentMatch.pop();
        currentMatch.pop();
      }, 1000);
    }

    // if matchedSoFar = the count of children in gameContainer, show them that
    // they've won
    if (matchedSoFar === gameContainer.children.length) {
      alert("You've won!")
    }
  }
  // Remember what the user just clicked...
  currentClickedIndex = event.target.id;
}

// when the DOM loads
createDivsForColors(shuffledColors);
