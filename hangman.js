/**
* Hangman Javascript class
* Author: @jelofsson
**/
function Hangman(element) {
    this.reset();
}

Hangman.prototype.reset = function() {
    $('#hangm > div').fadeOut();
    this.STOPPED        = false;
    this.MISTAKES       = 0;
    this.GUESSES        = [];
    this.WORD           = "CODENINJA"; // https://www.wordnik.com/signup
}

Hangman.prototype.guess = function(guess) {
    
    var guess = guess.toUpperCase();
    
    if(this.STOPPED || $.inArray(guess, this.GUESSES) > -1) 
    {   //  Game stopped or allready guessed on that letter
        return;
    }
    
    // Update the word & guesses
    this.GUESSES.push(guess); 
    $("#hangm > #word").html(this.GetGuessedfWord()).fadeIn();
    $("#hangm > #guesses").html(this.GUESSES).fadeIn();

    if($.inArray(guess, this.WORD) < 0) 
    { // Incorrect guess
        this.MISTAKES++;
        $("#hangm > #hangm_"+this.MISTAKES).fadeIn();
        
        if(this.MISTAKES == 7)  
        { // Game Over
            $("#hangm > #gameover").fadeIn();
            this.STOPPED = true;
            return;
        } 
    }
    else if((this.WORD.indexOf(this.GetGuessedfWord()) != -1) ? true : false) 
    { // Victory
        $("#hangm > #victory").fadeIn();
        return;
    }
    
}

Hangman.prototype.GetGuessedfWord = function() {
    var result = "";
    for(var i=0; i<this.WORD.length; i++)
    { // Word characters
        if($.inArray(this.WORD[i],this.GUESSES) > -1) {
            result += this.WORD[i];
        } else {
            result += "_";
        }
    }
    return result;    
}