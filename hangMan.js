/**
 * TODO:
 * 1. do this
 * 2. do that
 * FIXME:
 * 1. fix this issue
 * 2. fix that issue
 */

(function () {
  "use strict";

  // Nodejs references
  const randomWords = require("random-words");
  const figlet = require("figlet");
  const readlineSync = require("readline-sync");

  const fullWord = randomWords(); // full randomized word
  const arrCh = fullWord.split(""); // Makes array of characters from randomWord
  let arrCorAns = []; // Array of user's correct guesses
  let arrShow = []; // Show this array to the user
  let guessesNum = 10; // 10 attempts to guess the word - count down if wrong guess
  let userGuess = ""; // Saves the current user's guess

  // Checks the title and shows it if there is no Error + start the game
  figlet("Hang Man Game", function (err, data) {
    if (err) {
      console.dir(err);
      console.log("something went wrong...");
    } else {
      console.log(data);
      gameFunc();
    }
  });

  function gameFunc() {
    // Bonus: if i wanted to allow the user to guess the entire word i would write code like this: while(true)
    // but for this game the limit is 10 guesses
    while (guessesNum > 0) {
      // Looping through the characters of the random word
      for (let i = 0; i < arrCh.length; i++) {
        arrShow[i] = "*";
        for (const corAns of arrCorAns) // Looping through all user's correct guesses
          if (arrCh[i] === corAns) arrShow[i] = corAns; // if the letter is equal to any of the correct answers
      }

      // Checks if the user wins the game
      if (!arrShow.includes("*")) {
        console.log("\nWow you are good!!!\nThe word is: " + fullWord);
        return;
      }

      // Shows the result to the user
      console.log(
        "\nyou have " +
          guessesNum +
          " guesses \nThe word is: \n" +
          arrShow.join("")
      );

      // Waits for user's guess and checks it's integrity
      userGuess = readlineSync.question("What is you guess? ").toLowerCase();
      if (userGuess.length !== 1 || !/[a-z]/i.test(userGuess)) {
        console.log("\nplease enter only one character");
        gameFunc();
        return;
      }

      // Saves user's correct answer to the array - if incorrect the user will lose a guess
      if (arrCh.includes(userGuess)) arrCorAns.push(userGuess);
      else guessesNum--;
    }
    // if guessesNum <= 0 so you must be out ot guesses - shows msg
    console.log("\nYou are out of guesses \nThe word was: " + fullWord);
  }
})();
