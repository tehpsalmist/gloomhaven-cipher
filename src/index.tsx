import React, { useState } from "react"
import { render } from "react-dom"
import {
  generateValuesFromMessage,
  longMessage,
  shortMessage
} from "./alphabet"
import { useRememberedState } from "./hooks"
import { LetterBox } from "./LetterBox"
import { invertObject } from "./utils"

export const App = () => {
  // const [tolerance, setTolerance] = useState(0)
  const [values, setValues] = useRememberedState<Record<number, string>>(
    "values",
    {}
  )

  const [fixedValues, setFixedValues] = useRememberedState<
    Record<string, number>
  >("fixedValues", {})

  const updateValues = (character: number) => (val: string) =>
    setValues((vals) => {
      const newVals = { ...vals }

      Object.keys(newVals).forEach((k) => {
        if (newVals[k] === val) newVals[k] = ""
      })

      newVals[character] = val

      return newVals
    })

  return (
    <main className="min-h-screen flex items-center flex-col justify-evenly font-mono p-2 sm:p-4">
      <h2 className="text-2xl text-center my-6">
        Long Message from Envelope A:
      </h2>
      <div className="flex-center flex-wrap mb-12">
        {longMessage.map((word, index) => (
          <div key={index} className="flex-center mt-4">
            {word.map((character, i) => (
              <LetterBox
                key={i}
                character={character}
                letter={values[character]}
                onChange={updateValues(character)}
                onFixLetter={(ltr, char) => {
                  setFixedValues((vals) => ({ ...vals, [ltr]: char }))
                }}
                onUnFixLetter={(ltr) => {
                  setFixedValues(({ [ltr]: removed, ...vals }) => ({
                    ...vals
                  }))
                }}
                fixed={!!fixedValues[values[character]]}
              />
            ))}
            <div className="w-8"></div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl text-center my-6">
        Short Message from Town Records:
      </h2>
      <div className="flex-center flex-wrap mb-12">
        {shortMessage.map((word, index) => (
          <div key={index} className="flex-center mt-4">
            {word.map((character, i) => (
              <LetterBox
                key={i}
                character={character}
                letter={values[character]}
                onChange={updateValues(character)}
                onFixLetter={(ltr, char) => {
                  setFixedValues((vals) => ({ ...vals, [ltr]: char }))
                }}
                onUnFixLetter={(ltr) => {
                  setFixedValues(({ [ltr]: removed, ...vals }) => ({
                    ...vals
                  }))
                }}
                fixed={!!fixedValues[values[character]]}
              />
            ))}
            <div className="w-8"></div>
          </div>
        ))}
      </div>
      <div className="flex-center space-x-2 flex-wrap">
        <button
          disabled={!Object.keys(values).length}
          onClick={(e) => {
            setValues(invertObject(fixedValues))
          }}
          className="btn btn-primary"
        >
          Clear
        </button>
        <button
          disabled={!Object.keys(values).length}
          onClick={(e) => {
            setFixedValues({})
            setValues({})
          }}
          className="btn btn-primary"
        >
          Clear All
        </button>
      </div>
      <div className="flex-center flex-wrap space-x-2">
        <button
          onClick={(e) => {
            setValues(
              generateValuesFromMessage(
                longMessage.concat(shortMessage),
                fixedValues,
                0
              )
            )
          }}
          className="btn btn-primary"
        >
          Generate Frequency-Based Values
        </button>
        {/* <div className="flex flex-nowrap">
          <label htmlFor="tolerance" className="mr-2">
            Tolerance:
          </label>
          <input
            id="tolerance"
            type="number"
            min="0"
            max="26"
            value={tolerance}
            onChange={(e) => setTolerance(Number(e.target.value))}
          />
        </div> */}
      </div>
    </main>
  )
}

render(<App />, document.getElementById("app"))
