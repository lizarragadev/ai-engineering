// Jest type declarations
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: <T>(actual: T) => {
  toBe: (expected: T) => void;
  toHaveLength: (length: number) => void;
  toEqual: (expected: T) => void;
  [key: string]: any;
};

// TODO: Add tests
