import {useState, useEffect} from 'react'

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    //   Json value from localstorage
    const jsonValue = localStorage.getItem(key)
    // if value isn't == null then we have a value so return it
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === 'function') {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  //   Runs anytime to update key or value changes to update the local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
