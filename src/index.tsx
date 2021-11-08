import React, { useState } from "react"
import { render } from "react-dom"
import {
  generateValuesFromMessage,
  longMessage,
  shortMessage
} from "./alphabet"
import { DrawLetter } from "./DrawLetter"
import { valueSpecs } from "./valueSpecs"

export const App = (props) => {
  const [msg, setMsg] = useState(longMessage.concat(shortMessage))

  const values = generateValuesFromMessage(msg)

  return (
    <main className="h-screen flex-center font-mono">
      <p className="flex-center flex-wrap">
        {msg.map((word, index) => (
          <div className="flex-center">
            {word.map((letter) => (
              <LetterBox value={letter} letter={values[letter]} />
            ))}
            {index === msg.length - 1 ? (
              <LetterBox letter="." />
            ) : (
              <LetterBox letter=" " />
            )}
          </div>
        ))}
      </p>
    </main>
  )
}

const LetterBox = ({ letter, value }: { value?: number; letter: string }) => {
  return (
    <div className="flex flex-col items-center w-8 h-16">
      <div className="h-8 min-h-8 text-blue-400 flex-center">
        {valueSpecs[value] ? <DrawLetter {...valueSpecs[value]} /> : value}
      </div>
      <div className="text-indigo-700 flex-center h-full">{letter}</div>
    </div>
  )
}

render(<App />, document.getElementById("app"))
