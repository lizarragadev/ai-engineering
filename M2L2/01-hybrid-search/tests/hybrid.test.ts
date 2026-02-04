// Jest type declarations
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: <T>(actual: T) => {
  toBe: (expected: T) => void;
  toHaveLength: (length: number) => void;
  toEqual: (expected: T) => void;
  [key: string]: any;
};

import { hybridSearch, ItemWithMetadata } from '../src/hybrid-search';

describe('hybridSearch', () => {
  const items: ItemWithMetadata[] = [
    {
      id: 'x',
      vector: [1, 0, 0],
      metadata: { tag: 'keep' }
    },
    {
      id: 'y',
      vector: [0, 1, 0],
      metadata: { tag: 'remove' }
    },
    {
      id: 'z',
      vector: [0, 0, 1],
      metadata: { tag: 'keep' }
    }
  ];

  it('filters by metadata and returns top k', () => {
    const result = hybridSearch(
      items,
      [1, 0, 0],
      m => m.tag === 'keep',
      2
    );
    expect(result.every(r => r.metadata.tag === 'keep')).toBe(true);
    expect(result).toHaveLength(2);
  });
});
