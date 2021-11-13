import React, { useState } from "react"
import { render } from "react-dom"
import {
  generateValuesFromMessage,
  longMessage,
  shortMessage
} from "./alphabet"
import { DrawLetter } from "./DrawLetter"
import { useRememberedState } from "./hooks"
import { valueSpecs } from "./valueSpecs"

export const App = () => {
  const [values, setValues] = useRememberedState("values", () =>
    generateValuesFromMessage(longMessage.concat(shortMessage))
  )

  const updateValues = (letter: number) => (val: string) =>
    setValues((vals) => {
      const newVals = { ...vals }

      Object.keys(newVals).forEach((k) => {
        if (newVals[k] === val) newVals[k] = ""
      })

      newVals[letter] = val

      return newVals
    })

  return (
    <main className="h-screen flex items-center flex-col justify-evenly font-mono">
      <div className="flex-center flex-wrap">
        {longMessage.map((word, index) => (
          <div key={index} className="flex-center">
            {word.map((letter, i) => (
              <LetterBox
                key={i}
                character={letter}
                letter={values[letter]}
                onChange={updateValues(letter)}
              />
            ))}
            <div className="w-8"></div>
          </div>
        ))}
      </div>
      <div className="flex-center flex-wrap">
        {shortMessage.map((word, index) => (
          <div key={index} className="flex-center">
            {word.map((letter, i) => (
              <LetterBox
                key={i}
                character={letter}
                letter={values[letter]}
                onChange={updateValues(letter)}
              />
            ))}
            <div className="w-8"></div>
          </div>
        ))}
      </div>
    </main>
  )
}

const allowableValueRegex = /[0-9A-Z]/

const LetterBox = ({
  letter,
  character,
  onChange
}: {
  character?: number
  letter: string
  onChange(e: string): void
}) => {
  return (
    <div className="flex flex-col items-center w-8 h-24">
      <div className="h-8 min-h-8 text-blue-400 flex-center">
        {valueSpecs[character] ? (
          <DrawLetter {...valueSpecs[character]} />
        ) : (
          character
        )}
      </div>
      <div className="text-indigo-700 flex-center h-full">
        <input
          className="border-0 h-full w-full text-center"
          onChange={(e) => {
            const val = e.target.value.toUpperCase()

            if (
              !val.length ||
              (val.length === 1 && allowableValueRegex.test(val))
            ) {
              onChange(val)
            }
          }}
          value={letter}
        />
      </div>
      {/* {character && (
        <div className="text-pink-500 flex-center h-full">
          {leftpad2(character)}
        </div>
      )} */}
    </div>
  )
}

function leftpad2(num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}

render(<App />, document.getElementById("app"))
