import React, { useEffect, useState } from 'react'

export default function Keypad({ usedKeys, onKeypadClick }) {
    const [letters, setLetters] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/letters')
            .then(response => response.json())
            .then(json => {
                setLetters(json)
            })
    }, [])

    return (
        <div className="keypad">
            {letters && letters.map((letter, i) => {
                const color = usedKeys[letter.key]

                return (
                    <div key={letter.key} className={color} onClick={onKeypadClick}>{letter.key}</div>
                )
            })}
        </div>
    )
}
