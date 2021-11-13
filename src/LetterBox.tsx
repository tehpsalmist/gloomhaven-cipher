import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { DrawLetter } from "./DrawLetter"
import { valueSpecs } from "./valueSpecs"

const allowableValueRegex = /[0-9A-Z]/

export const LetterBox = ({
  letter,
  character,
  onChange,
  onFixLetter,
  onUnFixLetter,
  fixed
}: {
  character?: number
  letter: string
  onChange(e: string): void
  onFixLetter(letter: string, character: number): void
  onUnFixLetter(letter: string, character: number): void
  fixed: boolean
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
      <div className="text-indigo-700 flex flex-col h-full items-center">
        <input
          autoComplete="autocomplete_off_hack_xfr4!k"
          className="border-0 focus:border-0 focus:outline-none my-1 w-6 text-center"
          onChange={(e) => {
            const val = e.target.value.toUpperCase()

            if (!val.length) {
              onUnFixLetter(letter, character)
              onChange(val)
            }

            if (val.length === 1 && allowableValueRegex.test(val)) {
              onUnFixLetter(val, character)
              onChange(val)
            }
          }}
          value={letter || ""}
        />
        <button
          type="button"
          disabled={!letter}
          className={`rounded-full bg-gray-200 hover:bg-green-400 text-white h-6 w-6 ${
            fixed ? "bg-green-500" : ""
          }`}
          onClick={(e) =>
            fixed
              ? onUnFixLetter(letter, character)
              : onFixLetter(letter, character)
          }
        >
          <FontAwesomeIcon icon={faCheck} size="xs" />
        </button>
      </div>
    </div>
  )
}
