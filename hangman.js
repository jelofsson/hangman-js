/**
* Hangman Javascript class
* Author: @jelofsson
**/
function Hangman(element) {
    this.element = '#'+$(element).attr('id');
    this.reset();
}

Hangman.prototype.reset = function() {
    $(this.element+' .h').fadeOut();
    this.STOPPED        = false;
    this.MISTAKES       = 0;
    this.GUESSES        = [];
    var that            = this;
    $.get( "http://jelofsson.se/hangman/get_word.php", function( data ) {
        that.WORD = data;
        $(that.element+"_word").html(that.GetGuessedfWord()).fadeIn();
    });
}

Hangman.prototype.guess = function(guess) {
    
    var guess = guess.charAt(0).toUpperCase();
    
    if(this.STOPPED || $.inArray(guess, this.GUESSES) > -1) 
    {   //  Game stopped or allready guessed on that letter
        return;
    }
    
    // Update the word & guesses
    this.GUESSES.push(guess); 
    $(this.element+"_word").html(this.GetGuessedfWord()).fadeIn();
    $(this.element+"_guesses").html(this.GUESSES).fadeIn();

    if($.inArray(guess, this.WORD) < 0) 
    { // Incorrect guess
        this.MISTAKES++;
        $(this.element+"_"+this.MISTAKES).fadeIn();
        
        if(this.MISTAKES == 6)  
        { // Game Over
            $(this.element+"_gameover").fadeIn();
            this.STOPPED = true;
            return;
        } 
    }
    else if((this.WORD.indexOf(this.GetGuessedfWord()) != -1) ? true : false) 
    { // Victory
        $(this.element+"_victory").fadeIn();
        this.STOPPED = true;
        return;
    }
    
}

Hangman.prototype.GetGuessedfWord = function() {
    var result = "";
    for(var i=0; i<this.WORD.length; i++)
    { // Word characters
        result += ($.inArray(this.WORD[i],this.GUESSES) > -1) ?
            this.WORD[i] : "_";
    }
    return result;    
}