//Remove start button and load question
$("#start").on("click", function(){
	$("#start").remove();
	loadQuestion();
})

//Creating on click function for selecting answer
$(document).on("click", ".answerButton", function(event) {
	clicked(event);
});

//Creating on click function to reset game
$(document).on("click", "#reset", function() {
	reset();
})


// Create questions and answers
var questions = [{

	question: "Which of these is not a main character?",
	answers: ["Leonard", "Sheldon", "Howard", "Stuart"],
	correctAnswer: "Stuart"

}, {

	question: "What is the name of Raj's dog?",
	answers: ["Cinnamon", "Nutmeg", "Saffron", "Ginger"],
	correctAnswer: "Cinnamon"

}, {

	question: "What band sings the themesong?",
	answers: ["The Rolling Stones", "Maroon 5", "The Barenaked Ladies", "Fallout Boy"],
	correctAnswer: "The Barenaked Ladies"

}, {

	question: "Who has the catchphrase 'Bazinga'?",
	answers: ["Howard", "Sheldon", "Raj", "Leonard"],
	correctAnswer: "Sheldon"

}, {

	question: "Who does Leonard marry in Season 9?",
	answers: ["Amy", "Leslie", "Bernadette", "Penny"],
	correctAnswer: "Penny"

}, {

	question: "What happened to the elevator?",
	answers: ["Nothing, it works fine", "Leonard blew it up", "Howard tried to 'improve' it but ended up breaking it", "The broken elevator is never explained"],
	correctAnswer: "Leonard blew it up"

}, {

	question: "Where does Penny work as a waitress?",
	answers: ["Cheesecake Factory", "Bob Evans", "Chili's", "P.F. Changs"],
	correctAnswer: "Cheesecake Factory"

}, {

	question: "With which former Star Trek actor did Sheldon have a long standing fued?",
	answers: ["Patrick Stewart", "Lavar Burton", "Leonard Nimoy", "Wil Wheaton"],
	correctAnswer: "Wil Wheaton"

}, {

	question: "Which of the four main male characters is the only one who does not hold a doctorate in his field?",
	answers: ["Sheldon", "Howard", "Raj", "Leonard"],
	correctAnswer: "Howard"

}, {

	question: "Which character has a twin sister?",
	answers: ["Sheldon", "Penny", "Bernadette", "Raj"],
	correctAnswer: "Sheldon"

}];

// Create variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var counter = 30;
var currentQuestion = 0;

// Create functions
countdown = function() {
	counter--;
    $("#counter").html("Time Remaining: " + counter + " Seconds");
	if (counter <=0) {
		timeUp();
	}
}

loadQuestion = function() {
    $("#counter").html("Time Remaining: " + counter + " Seconds");
	timer = setInterval(countdown, 1000);
    $("#questions").empty();

    $("#questions").html("<h2>" + questions[currentQuestion].question + "</h2>");

    // Looping through the array of questions
    for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
	// Then dynamicaly generating buttons for each answer in the array.
      var a = $("<button>");
      // Adding a class
      a.addClass("answerButton");
      // Adding a data-attribute with a value of the answer at index i
      a.attr("data-name", questions[currentQuestion].answers[i]);
      // Providing the button's text with a value of the answers at index i
      a.text(questions[currentQuestion].answers[i]);
      // Adding the button to the HTML
      $("#questions").append(a);
    }
}

timeUp = function() {
	clearInterval(timer);
	unanswered++;
	$("#questions").html("<h2> You ran out of time! </h2>");
	$("#questions").prepend("<img src = 'assets/images/wrong.jpg'>");
	$("#questions").append("<h2> The correct answer was: " + questions[currentQuestion].correctAnswer + "</h3>");
	if (currentQuestion==questions.length -1) {
		setTimeout(results, 3000);
	} else {
		setTimeout(nextQuestion, 3000);
	}

}

clicked = function(event) {
	clearInterval(timer);
	if ($(event.target).data("name")==questions[currentQuestion].correctAnswer) {
		answeredCorrectly();
	} else {
		answeredIncorrectly();
	}
}

answeredCorrectly = function() {
	console.log("RIGHT");
	clearInterval(timer);
	correct++;
	$("#questions").html("<h2> You got it right! </h2>");
	$("#questions").prepend("<img src = 'assets/images/bazinga.jpg'>");
	if (currentQuestion==questions.length -1) {
		setTimeout(results, 3000);
	} else {
		setTimeout(nextQuestion, 3000);
	}
}

answeredIncorrectly = function() {
	console.log("WRONG");
	clearInterval(timer);
	incorrect++;
	$("#questions").html("<h2> You got it wrong! </h2>");
	$("#questions").prepend("<img src = 'assets/images/wrong.jpg'>");
	$("#questions").append("<h2> The correct answer was: " + questions[currentQuestion].correctAnswer + "</h3>");
	if (currentQuestion==questions.length -1) {
		setTimeout(results, 3000);
	} else {
		setTimeout(nextQuestion, 3000);
	}
}

nextQuestion = function() {
	counter = 30;
	$("#counter").html(counter);
	currentQuestion++;
	loadQuestion();
}

results = function() {
	clearInterval(timer);
	$("#questions").html("ALL DONE");
	$("#questions").html("<p> Correct: " + correct + "</p>" + "<p> Incorrect: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>");
	// $("#questions").append("Incorrect: " + incorrect);
	// $("#questions").append("Unanswered: " + unanswered);
	$("#questions").append("<button id='reset'>Reset Game</button>");

}

reset = function() {
	currentQuestion = 0;
	counter = 30;
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	loadQuestion();

}

