import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, handleKeypadClick, highlight } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {

        }

        // detach keyup event listener
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect])

    return (
        <>
        <div>Solution - {solution}</div>
        <div>Current Guess - {currentGuess}</div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad usedKeys={usedKeys} onKeypadClick={handleKeypadClick} highlight={highlight}/>
        </>
    )
}
