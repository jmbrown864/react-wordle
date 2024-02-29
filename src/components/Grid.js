import React from 'react'
import Row from './Row'

export default function Grid({ currentGuess, guesses, turn }) {
  return (
    <div>
        {guesses.map((guess, i) => {
            // show the users current guess
            if (turn === i) {
                return <Row key={i} currentGuess={currentGuess}/>
            }
            // show past guesses
            return <Row key={i} guess={guess}/>
        })}
    </div>
  )
}