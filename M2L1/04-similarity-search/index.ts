#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';

interface Chunk { chunk_id: number; source: string; text: string; start: number; end: number; }

function splitSentences(text: string): string[] {
  return text.match(/[^\.\!\?]+[\.\!\?]+/g) || [text];
}

function chunkText(text: string, size: number, overlap: number, preserve: boolean): Chunk[] {
  const units = preserve ? splitSentences(text) : text.split(/\s+/);
  const chunks: Chunk[] = [];
  let chunkId = 0;

  if (!preserve) {
    for (let i = 0; i < units.length;) {
      const endIdx = Math.min(i + size, units.length);
      const unitSlice = units.slice(i, endIdx);
      chunks.push({ chunk_id: chunkId++, source: 'sample_corpus.txt', text: unitSlice.join(' '), start: i, end: endIdx });
      i = endIdx - overlap;
      if (i < 0) i = 0;
    }
  } else {
    let i = 0;
    while (i < units.length) {
      let j = i;
      let count = 0;
      while (j < units.length && count + units[j].split(/\s+/).length <= size) {
        count += units[j].split(/\s+/).length;
        j++;
      }
      if (j === i) j = i + 1;
      const slice = units.slice(i, j);
      chunks.push({ chunk_id: chunkId++, source: 'sample_corpus.txt', text: slice.join(' '), start: i, end: j });
      i = j - overlap;
      if (i < 0) i = 0;
    }
  }

  return chunks;
}

function averageWords(chunks: Chunk[]): number {
  const total = chunks.reduce((sum, c) => sum + c.text.split(/\s+/).length, 0);
  return total / chunks.length;
}

async function main() {
  const root = path.resolve(__dirname, '..');
  const text = fs.readFileSync(path.resolve(root, 'sample_corpus.txt'), 'utf-8');

  const fixed = chunkText(text, 400, 50, false);
  fs.writeFileSync('chunks_fixed.jsonl', fixed.map(c => JSON.stringify(c)).join('\n'));
  console.log(`Fixed chunks: ${fixed.length}`);

  const boundary = chunkText(text, 400, 50, true);
  fs.writeFileSync('chunks_boundary.jsonl', boundary.map(c => JSON.stringify(c)).join('\n'));
  console.log(`Boundary-aware chunks: ${boundary.length}`);

  const summary = [
    { strategy: 'fixed', chunk_count: fixed.length, avg_words: averageWords(fixed) },
    { strategy: 'boundary', chunk_count: boundary.length, avg_words: averageWords(boundary) },
  ];
  fs.writeFileSync('comparison_summary.json', JSON.stringify(summary, null, 2));
  console.log('Written comparison_summary.json');
}

main();
