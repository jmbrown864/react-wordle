// Wordle Game Logic

import { useState } from "react";

const useWordle = (solution) => {
    const [currentGuess, setCurrentGuess] = useState('') // track value of current user input
    const [turn, setTurn] = useState(0) // track the turn (5 turns, 6 total guesses)
    const [history, setHistory] = useState([]) // track the history so users can't guess the same word again
    const [guesses, setGuesses] = useState([...Array(6)]) // track the formatted guesses to display the game board
    const [isCorrect, setIsCorrect] = useState(false) // track whether or not the user has won
    const [usedKeys, setUsedKeys] = useState({}) // {a: 'green', b: 'yellow'}

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

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}

            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key]
                
                if (letter.color === 'green') {
                    newKeys[letter.key] = 'green'
                    return
                }

                if (letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow'
                    return
                }

                if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey'
                    return
                }
            })

            return newKeys
        })

        setCurrentGuess('')
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
            addNewGuess(formatted)
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

    const handleKeypadClick = ({ target }) => {
        if (currentGuess.length < 5) {
            setCurrentGuess((prevGuess) => {
                return prevGuess + target.innerHTML
            })
        }
    }

    return { currentGuess, turn, guesses, isCorrect, usedKeys, handleKeyup, handleKeypadClick }
}

export default useWordle