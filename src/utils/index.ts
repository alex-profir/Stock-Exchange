export function isFunction<TData>(p: any): p is (...args: any[]) => TData {
  return typeof p === "function";
}
