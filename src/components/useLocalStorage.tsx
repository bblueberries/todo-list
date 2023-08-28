import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(key);

      if (jsonValue === null) {
        // check if any data from this key in local storage
        if (typeof initialValue === "function") {
          // check if it is a function
          return (initialValue as () => T)(); //then return its function
        } else {
          return initialValue; // if it not a function then set initial value of useState to initialValue
        }
      } else {
        return JSON.parse(jsonValue); // return data inside key
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); // set localStorage item whenever value or key change
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
