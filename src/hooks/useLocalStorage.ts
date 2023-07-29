import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T>(() => {
    const localStorageElement = localStorage.getItem(key);
    if (localStorageElement) {
      return JSON.parse(localStorageElement);
    }
    return initialValue;
  });

  function handleStateChange(newValue: T) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, handleStateChange] as const;
}
