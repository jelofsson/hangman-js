/**
* Hangman Javascript class
* Author: @jelofsson
**/
function Hangman(element) {
    this.reset();
}

Hangman.prototype.reset = function() {
    $('#hangm > .h, #hangm > div > .h').fadeOut();
    this.STOPPED        = false;
    this.MISTAKES       = 0;
    this.GUESSES        = [];
    this.WORD           = "CODENINJA"; // https://www.wordnik.com/signup
    $("#hangm_word").html(this.GetGuessedfWord()).fadeIn();
}

Hangman.prototype.guess = function(guess) {
    
    var guess = guess.charAt(0).toUpperCase();
    
    if(this.STOPPED || $.inArray(guess, this.GUESSES) > -1) 
    {   //  Game stopped or allready guessed on that letter
        return;
    }
    
    // Update the word & guesses
    this.GUESSES.push(guess); 
    $("#hangm_word").html(this.GetGuessedfWord()).fadeIn();
    $("#hangm_guesses").html(this.GUESSES).fadeIn();

    if($.inArray(guess, this.WORD) < 0) 
    { // Incorrect guess
        this.MISTAKES++;
        $("#hangm_"+this.MISTAKES).fadeIn();
        
        if(this.MISTAKES == 6)  
        { // Game Over
            $("#hangm_gameover").fadeIn();
            this.STOPPED = true;
            return;
        } 
    }
    else if((this.WORD.indexOf(this.GetGuessedfWord()) != -1) ? true : false) 
    { // Victory
        $("#hangm_victory").fadeIn();
        this.STOPPED = true;
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