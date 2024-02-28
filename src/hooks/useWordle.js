// Wordle Game Logic

import { useState } from "react";

const useWordle = (solution) => {
    const [currentGuess, setCurrentGuess] = useState('')
    const [turn, setTurn] = useState(0)
    const [history, setHistory] = useState([]) // each guess is a string

    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow'}]
    // color corresponds to the letter's existence in the solution word:
    // gray = not in solution, yellow = in solution but wrong position, green = in solution correct position
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter) => {
            return { key: letter, color: 'grey'}
        })

        // check if letters from guess match solution & update color
        // find any green letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // find any yellow letters
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    // handle keyup event to keep track of the guess
    // if the user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        // submit the guess
        if (key === 'Enter') {
            // only add the guess if turn < 5
            if (turn > 5) {
                console.log('All guesses have been used')
                return
            }

            // do not allow duplicate words as guess
            if (history.includes(currentGuess)) {
                console.log('You already tried that word')
                return
            }

            // guess must be 5 chars long
            if (currentGuess.length !== 5) {
                console.log('Word must be 5 letters')
                return
            }

            // format an acceptable guess to add to history
            const formatted = formatGuess()
            console.log(formatted)
        }

        // remove letters from guess
        if (key === 'Backspace') {
            setCurrentGuess((prevGuess) => {
                return prevGuess.slice(0, -1)
            })
            return
        }

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