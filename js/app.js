
$(document).ready(function(){
	/*--- New game on load ---*/
	newGame();

	/*--- Click listener to call newGame funciton ---*/
  	$(".new").click(function(e){
  		e.preventDefault();
  		newGame();
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Stores guess in variable / calls validate() / ---*/
 	$("#guessButton").on("click", function(e){
 		e.preventDefault();
 		var yourGuess = $("#userGuess").val();
 		validate(yourGuess);
	});
});

var secretNumber = 0;
var allGuess = [];
var difference = 0;
var newDiff = false;
var countGuess = 0;

/*--- Creates secret no. ---*/
function newGame (){
	secretNumber = Math.floor((Math.random()*100)+1);
	$("#userGuess").val("");
	$('#feedback').html("Make your Guess!");
	$("#guessList").val();
	alert(secretNumber);
}

/*--- Increments counter /validates that guess is int and 1-100 / clears input field / appends validated guess ---*/
function validate (yourGuess) {
	
	countGuess ++;

	$("#count").html(countGuess);

	if (yourGuess <= 0 || yourGuess > 100 || isNaN(yourGuess) || yourGuess % 1 != 0 )
	{
		$('#feedback').html("UH OH! Please enter a valid number!");	
	}
	else if (compareGuess (yourGuess))
	{
		$('#feedback').html("UH OH! You already entered that number!");
	}
	else 
	{
		$('#feedback').html("Make your Guess!");
		$("#guessList").append('<li>' +yourGuess+ '</li>');
		/*--- calls hotCold function ---*/
		hotCold(yourGuess);
	}

	$("#userGuess").val("");
}
/*--- function to check guess is not entered twice ---*/
function compareGuess (yourGuess) {

    for (var i = 0; i < allGuess.length; i++)
	{
		if (allGuess[i] == yourGuess) 
		{
			return true;
		}

	}
	allGuess.push(yourGuess);
	return false; 
}


/*--- function to check distance from secretNumber and alert user hot or cold ---*/
function hotCold (yourGuess){
	difference = Math.abs(yourGuess - secretNumber);
	alert(difference);


		if (difference >= 50)
		{
			$('#feedback').html("Ice Cold!");
		}
		else if (difference >= 30)
		{
			$('#feedback').html("Cold!");
		}
		else if (difference >= 20)
		{
			$('#feedback').html("Warm");
		}
		else if (difference >= 10) 
		{
			$('#feedback').html("HOT!!");
		}
		else if (difference >= 1) 
		{
			$('#feedback').html("VERY HOT!!");
		}
		else 
		{
			$('#feedback').html("You got it!!");
			return;
		}

	if (newDiff !== false)
	{
		warmerColder(difference);
	}

	newDiff = difference;

}

/*--- Checks if user is getting warmer or colder ---*/
function warmerColder (difference) {	

	 if (newDiff >= difference) 
	 {
	 	$('#feedback').html("COLDER!!");
	 }
	 else 
	 {
	 	$("#feedback").html("WARMER!");
	 }
}

