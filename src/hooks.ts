import { useState } from "react"

export function useRememberedState<T = any>(
  key: string,
  initialValue: T | (() => T)
): [T, (t: T | ((t: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)

      if (item == null) {
        const newValue =
          initialValue instanceof Function ? initialValue() : initialValue

        localStorage.setItem(key, JSON.stringify(newValue))

        return newValue
      }

      return item ? JSON.parse(item) : item
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((t: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value

    setStoredValue(valueToStore)
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue]
}
