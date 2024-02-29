import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        // detach keyup event listener
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    useEffect(() => {
        console.log(guesses, turn, isCorrect)
    }, [guesses, turn, isCorrect])

    return (
        <>
        <div>Solution - {solution}</div>
        <div>Current Guess - {currentGuess}</div>
        </>
    )
}