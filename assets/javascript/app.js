// I had some help to finish this and make it really pretty. 
$(document).ready(function () {
    var options = [
        {
            question: "Who are the creators of the ninja turtles?", 
            choice: ["Eastman and Laird", "Lee and Kirby", "Kane and Finger", "Liefeld and McFarlane"],
            answer: 0,
            photo: "assets/images/eastmanandlaird.jpg"
         },
         {
            question: "What color were all 4 turtle's masks in the orgininal comic series?", 
            choice: ["Blue", "Purple", "Orange", "Red"],
            answer: 3,
            photo: "assets/images/redmasks.jpg"
         }, 
         {
             question: "What is the name of the hockey-mask-wearing vigilante friend of the turtles?", 
            choice: ["Casey Kasum", "Casey Jones", "Jim Jones", "Jason Vorhees" ],
            answer: 1,
            photo: "assets/images/caseyjones.jpg"
        }, 
        {
            question: "What is the real name of the turtles arch-nemesis, the Shredder?", 
            choice: ["Steve Rogers", "Stan Sakai", "Oroku Saki", "Usagi Yojimbo" ],
            answer: 2,
            photo: "assets/images/shredder.jpg"
        }, 
        {
            question: "What Marvel superhero was given super-abilities by the same ooze that mutated the turtles?", 
            choice: ["Daredevil", "Spider-Man", "Nightcrawler", "Beast" ],
            answer: 0,
            photo: "assets/images/ddturtles.jpg"
        }, 
        {
            question: "Finish the lyric from the theme song: Raphael is cool but...?", 
            choice: ["Crude", "Rude", "Sarcastic", "Blue" ],
            answer: 1,
            photo: "assets/images/raph.jpg"
        }, 
        {
            question: "The turtles once traveled back in times to ancient....?", 
            choice: ["Greece", "Japan", "Rome", "Spain" ],
            answer: 1,
            photo: "assets/images/samurairaph.jpg"
        }, 
        {
            question: "Which infamous rapper had a song called 'Ninja Rap' in TMNT II: The Secret of the Ooze?", 
            choice: ["Vanilla Ice", "Ice Cube", "Ice-T", "Lil Yachty" ],
            answer: 0,
            photo: "assets/images/vanillatmnt.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //this will start the game 
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //runs the times (thanks google)
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stops timer when it runs out and triggers a message
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Bummer! Time's up, the right answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //stops the timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    
    //this picks a question from the above and displays the answer choices
    function displayQuestion() {
        
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //makes sure the game chooses questions not already shown in the game (had help on this one)
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //checking answers here
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //if else for choosing answers and the results
    $(".answerchoice").on("click", function () {
        
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Cowabunga!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Mondo wrong-o. You should've picked: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1); //had some help here too
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //shows the score if all questions are answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 5000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })