/*
// Created: July 13, 2017 3:15 PM
// Author: Jonathan Gryn
// Revisions: Jon (7/13/17) - Added JS
//			  Jon (7/15/17) - Added Star Wars ?s, choices, and images
*/

$(document).ready(function() {

// Creat a function that creates the start button and initial screen

  function initialScreen() {
  	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
  	$(".mainArea").html(startScreen);
  }

  initialScreen();

  // Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

  $("body").on("click", ".start-button", function(event){

  	// Added line to test issue on GitHub viewer
  	event.preventDefault();
  	clickSound.play();
  	generateHTML();

  	timerWrapper();

  // Closes start-button click
  });
  

  $("body").on("click", ".answer", function(event) {

  	//answeredQuestion = true;
  	clickSound.play();
  	selectedAnswer = $(this).text();
  	if(selectedAnswer === correctAnswers[questionCounter]) {

  	  // Alert("correct");

  	  clearInterval(theClock);
  	  generateWin();
  	}
  	else {

  	  // Alert("wrong answer!");
  	  clearInterval(theClock);
  	  generateLoss();
  	}

  // Close .answer click	
  }); 
  
  // Reset-Button
  $("body").on("click", ".reset-button", function(event) {
  	clickSound.play();
  	resetGame();

  // Closes reset-button	
  });
  
  // Closes jQuery wrapper
  });

  function generateLossDueToTimeOut() {
  	unansweredTally++;
  	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time! The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/img/x.png'>";
  	$(".mainArea").html(gameHTML);

  	// Change to 4000 or other amount
  	setTimeout(wait, 4000);
  }

  function generateWin() {
  	correctTally++;
  	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
  	$(".mainArea").html(gameHTML);

  	// Change to 4000 or other amount
  	setTimeout(wait, 4000);  
  }

  function generateLoss() {
  	incorrectTally++;
  	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/x.png?raw=true'>";
  	$(".mainArea").html(gameHTML);

  	// Change to 4000 or other amount
  	setTimeout(wait, 4000);
  }

  function generateHTML() {
  	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3]+"</p>";
  	$(".mainArea").html(gameHTML);
  }

  function wait() {
  	if (questionCounter < 24) {
  	  questionCounter++;
  	  generateHTML();
  	  counter = 20;
  	  timerWrapper();
  	}
  	else {
  	  finalScreen();
  	}
  }

  function timerWrapper() {
  	theClock = setInterval(thirtySeconds, 1000);
  	function thirtySeconds() {
      if (counter === 0) {
      	clearInterval(theClock);
      	generateLossDueToTimeOut();
      }
      if (counter > 0) {
      	counter--;
      }
      $(".timer").html(counter);
  	}
  }

  function finalScreen() {
  	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  	$(".mainArea").html(gameHTML);
  }

  function resetGame() {
  	questionCounter = 0;
  	correctTally = 0;
  	incorrectTally = 0;
  	unansweredTally = 0;
  	counter = 20;
  	generateHTML();
  	timerWrapper();
  }

  var startScreen;
  var gameHTML;
  var counter = 20;
  var questionArray = ["Which fellow director helped George Lucas edit the open crawl of Star Wars?", "At the beginning of Episode IV: A New Hope, Princess Leia and her ship are carrying what?", "Which two actors have appeared in all the Star Wars films to date (2015)?", "Complete the classic line: 'That’s no moon; it’s a...'", "In the very opening scene of Episode IV: A New Hope, how many engines does the ship carrying Princess Leia have?", 
  					   "As far as we know, what is the main crop of Uncle Owen’s farm?", "What’s on the menu for breakfast with Luke’s Aunt Beru?", "In the 1997 special edition, a scene featuring Jabba the Hutt was added to Episode IV. Which bounty hunter also appears in that scene?", "Which two characters in A New Hope say the line “I have a bad feeling about this”, or a variation on it?", "When the Millenium Falcon arrives on the Death Star, Han and Luke steal Stormtrooper uniforms. Whose does Luke’s belong to?", 
  					   "During the attack on the first Death Star, what is Luke’s call sign?", "What does the acronym in TIE fighter stand for?", "Which Captain receives a battlefield promotion to Admiral when Vader Force-chokes his boss before the Battle of Hoth?", "How does C-3PO interrupt Han and Leia’s first kiss?", "Lando’s Cloud City hangs in the atmosphere above which world?", "Who is the lead singer of Jabba the Hutt’s house band?", "When Princess Leia dresses as a bounty hunter to rescue Han in Return Of The Jedi, what name does she use?", 
  					   "What do the Ewoks threaten to do to Han Solo?", "On what planet does Jabba the Hutt live?", "Which Steven Spielberg character appears in the Imperial Senate in Phantom Menace?", "What is the correct spelling of the name of the Wookiee home planet?", "What is the Emperor’s name?", "How did Han Solo first acquire the Millennium Falcon?", "Which of these thrilling phrases does NOT appear in the Phantom Menace opening crawl?", "What species is Jar Jar Binks?"];
  var answerArray = [["Brian De Palma", "Francis Ford Coppola", "Steven Spielberg", "Martin Scoresese"], ["Escaped prisoners from the Empire", "The main council of the Rebel Alliance", "The secret plants to the Death Star", "Untaxed death sticks"], ["Peter Mayhew and Anthony Daniels", "Frank Oz and Harrison Ford", "Anthony Daniels and Kenny Baker", "Mark Hamill and Carrie Fisher"], ["Droid", "Time machine", "Spaceship", "Space station"], ["Fourteen", "Twelve", "Eleven", "Ten"], 
  					["Funnel flowers", "Molo seeds", "Water", "Razor moss"], ["Red butter", "Blue milk", "Purple cereal", "Green toast"], ["Bossk", "Boba Fett", "Boushh", "IG-88"], ["Obi-Wan and Luke", "Han and Obi-Wan", "Luke and Leia", "Han and Luke"], ["TD-4388", "DLT-19", "TK-421", "THX-1138"], ["Red Nine", "Red Five", "Rogue One", "Red Leader"], ["Twin Ion Engine", "Total Imperial Evil", "The Imperial Engine", "Total Imperial Evil"], ["Piett", "Rieekan", "Veers", "Ozzel"], 
  					["Excuse me sir, but might I inquire as to what's going on?", "If I may say so, sir, I noticed earlier the hyperdrive motivator has been damaged. It's impossible to go to lightspeed!", "Sir! Sir! I've isolated the reverse power flux coupling!", "Sir, I don't know where your ship learned to communicate, but it has the most peculiar dialect."], ["Endor", "Bespin", "Yavin", "Tattooine"], ["Sy Snootles", "Joh Yowza", "Max Reebo", "Droopy McCool"], ["Bossk", "Boushh", "IG-88", "Boba Fett"], 
  					["Burn him at the stake", "Roast him over a pit", "Hang him upside down over a scorpion pit", "Crush him under a log"], ["Tattooine", "Bespin", "Coruscant", "Alderaan"], ["Indiana Jones", "E.T.", "A velociraptor", "The shark from Jaws"], ["Kashhyyk", "Kashyyyk", "Kyshahk", "Kashhykk"], ["Dooku", "palpatine", "Nero", "Grevious"], ["He stole it from the Empire", "He assembled it from scrap", "He salvaged a derelict", "He won it in a card game"], 
  					["...the Congress of the Republic endlessly debates", "...the greedy Trade Federation", "...economic sanctions are imposed...", "...the taxation of trade routes..."], ["Neimoidian", "Naboo", "Toydarian", "Gungan"]];
  var imageArray = ["<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question1.jpg?raw=true'>", 
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question2.jpg?raw=true'>", 
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question3.jpg?raw=true'>", 
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question4.jpg?raw=true'>", 
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question5.jpg?raw=true'>", 
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question6.jpg?raw=true'>", 
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question7.jpg?raw=true'>", 
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question8.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question9.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question10.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question11.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question12.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question13.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question14.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question15.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question16.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question17.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question18.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question19.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question20.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question21.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question22.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question23.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question24.jpg?raw=true'>",
  					"<img class='center-block img-right' src='https://github.com/jongryn/TriviaGame/blob/master/assets/images/question25.jpg?raw=true'>"];
  var correctAnswers = ["A. Brian De Palma", "C. The secret plans to the Death Star", "C. Anthony Daniels and Kenny Baker", "D. Space station", "C. Eleven", "C. Water", "B. Blue milk", "B. Boba Fett", "D. Han and Luke", "C. TK-421", "B. Red Five", "A. Twin Ion Engine", "A. Piett", "C. Sir! Sir! I've isolated the reverse power flux coupling!", "B. Bespin", "A. Sy Snootles", "B. Boushh", "B. Roast him over a pit", "A. Tattooine", "B. E.T.", "B. Kashyyyk", "B. Palpatine", "D. He won it in a card game", "C. ...economic sanctions are imposed...", "D. Gungan"];
  var questionCounter = 0;
  var selecterAnswer;
  var theClock;
  var correctTally = 0;
  var incorrectTally = 0;
  var unansweredTally = 0;
  var clickSound = new Audio("assets/sound/button-click.mp3")
