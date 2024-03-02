import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, handleKeypadClick, highlight } = useWordle(solution)
    const [ showModal, setShowModal ] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        // detach keyup event listener
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])

    return (
        <>
        <div>Solution - {solution}</div>
        <div>Current Guess - {currentGuess}</div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad usedKeys={usedKeys} onKeypadClick={handleKeypadClick} highlight={highlight}/>
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
        </>
    )
}
