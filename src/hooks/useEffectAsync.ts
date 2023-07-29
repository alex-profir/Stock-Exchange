import { useEffect } from "react";

// simple async effect
export function useEffectAsync(
  fn: () => Promise<void>,
  deps?: any[],
  cleanupHandler?: () => void
) {
  useEffect(() => {
    fn().catch((err) => console.warn("useEffectAsync error:", err));
    return () => {
      if (cleanupHandler) {
        cleanupHandler();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
