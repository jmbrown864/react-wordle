// Wordle Game Logic

import { useState } from "react";

const useWordle = (solution) => {
    const [currentGuess, setCurrentGuess] = useState('')

    // handle keyup event to keep track of the guess
    // if the user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        // make sure user input is a letter
        if (/^[A-Za-z]$/.test(key)) {
            // max length of a guess is 5 letters
            if (currentGuess.length < 5) {
                // update the current guess as the user types
                setCurrentGuess((prevGuess) => {
                    return prevGuess + key
                })
            }    
        }
    }

    return { currentGuess, handleKeyup}
}

export default useWordle;