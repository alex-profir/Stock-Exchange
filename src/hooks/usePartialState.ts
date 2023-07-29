import { Reducer, useReducer } from "react";
import { isFunction } from "../utils";

export function usePartialState<T = object>(initialData?: T | (() => T)) {
  const [state, setState] = useReducer<Reducer<T, Partial<T>>>(
    (currentState, newState) => {
      return { ...currentState, ...newState };
    },
    initialData
      ? isFunction(initialData)
        ? initialData()
        : initialData
      : undefined!
  );
  return [state, setState] as const;
}
