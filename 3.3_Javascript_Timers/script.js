// Write a function called countdown that accepts a number as 
// a parameter and every 1000 milliseconds decrements the value 
// and console.logs it. Once the value is 0 it should log
// “DONE!” and stop.

// ATTEMPT 1...
// function countdown (sec) {
//     let logStuff = function (sec) {
//         for (let i = sec; i >= 0; i--) {
//             setInterval(console.log(sec),1000);
//             sec--;
//         }
//     }
//     setInterval(logStuff(sec)), 1000);
//     console.log("DONE!")
// }
// FAILED...

// TRYING AGAIN...
function countdown (sec) {
    let logStuff = setInterval (function() {
        if (sec <= 0) {
            clearInterval(logStuff);
            console.log('DONE!');
        }
        else {
            console.log(sec);
        }
        sec--;
    }, 1000)
}
// SUCCESS ;)


// Write a function called randomGame that selects a random number
// between 0 and 1 every 1000 milliseconds and each time that a 
// random number is picked, add 1 to a counter. If the number is 
// greater than .75, stop the timer and console.log the number 
// of tries it took before we found a number greater than .75.

function randomGame () {
    let counter = 1;
    let randNum = setInterval (function() {
        let randFloat = Math.random();
        if (randFloat > .75) {
            clearInterval(randNum);
            console.log (`FINAL RANDOM NUMBER: ${randFloat}`)
            console.log (counter);
        }
        else (
            console.log (`ATTEMPT ${counter}: ${randFloat}`)
        )
        counter++;
    }, 1000)
}