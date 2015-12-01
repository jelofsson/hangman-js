/**
* Hangman Javascript class
* Author: @jelofsson
**/
var Hangman = (function () {
    
    'use strict';
               
    function Hangman(element_id) {
        
        // Dom is ready
        this.element_id = element_id;
        this.element    = document.getElementById(element_id);
        this.words      = ['PROGRAMMER', 'BRAINSTORM', 'CREATIVE', 'LOLLIPOP', 'CULTURE', 'RAZORSHARP', 'SCREWDRIVER', 'TYPEWRITER'];
    }

    Hangman.prototype.reset = function () {
        
        // Reset variables
        this.STOPPED        = false;
        this.MISTAKES       = 0;
        this.GUESSES        = [];
        this.WORD           = this.words[Math.floor(Math.random() * this.words.length)];
        
        // Reset Elements
        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.element_id + "_guessbox", null);
        this.showElementByIdWithContent(this.element_id + "_word", this.getGuessedfWord());
    };

    Hangman.prototype.guess = function (guess) {

        // Uppercase the guessed letter
        guess = guess.charAt(0).toUpperCase();

        if (this.STOPPED || this.GUESSES.indexOf(guess) > -1) {
            // Game stopped or allready guessed on that letter
            return;
        }

        // Add the letter to array GUESSES
        this.GUESSES.push(guess);
        // Update the word hint
        this.showElementByIdWithContent(this.element_id + "_word", this.getGuessedfWord());
        // Update the guessed letter list
        this.showElementByIdWithContent(this.element_id + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(guess) < 0) {
            
            // Incorrect guess
            this.MISTAKES++;
            
            // Show next part of hangman character
            this.showElementByIdWithContent(this.element_id + "_" + this.MISTAKES, null);

            if (this.MISTAKES === 6) {
                // Game Over
                this.showElementByIdWithContent(this.element_id + "_end", "GAME OVER!<br/>The word was: " + this.WORD);
                this.STOPPED = true;
                return;
            }
            
        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            // Victory
            this.showElementByIdWithContent(this.element_id + "_end", "You made it!<br/>The word was: " + this.WORD);
            this.STOPPED = true;
            return;
        }

    };
    
    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };
    
    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    Hangman.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            // Word characters
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                    this.WORD[i] : "_";
        }
        return result;
    };
    
    return new Hangman('hangm');
    
}());