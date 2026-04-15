/**
 * Rotates through a pool of log entries, returning a window of `windowSize` entries
 * starting at `startIndex`.
 */
export const getLogWindow = (pool: string[], startIndex: number, windowSize = 3): string[] =>
  Array.from({ length: windowSize }, (_, i) => pool[(startIndex + i) % pool.length]);
