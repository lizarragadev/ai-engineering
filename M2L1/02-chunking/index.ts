#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';

interface Chunk { chunk_id: number; source: string; text: string; start: number; end: number; }

function splitIntoSentences(text: string): string[] {
  return text.match(/[^\.\!\?]+[\.\!\?]+/g) || [text];
}

function chunkText(text: string, size: number, overlap: number, preserve: boolean): Chunk[] {
  const units = preserve ? splitIntoSentences(text) : text.split(/\s+/);
  const chunks: Chunk[] = [];
  let chunkId = 0;

  if (!preserve) {
    for (let i = 0; i < units.length;) {
      const endIdx = Math.min(i + size, units.length);
      const chunkUnits = units.slice(i, endIdx);
      chunks.push({ chunk_id: chunkId++, source: 'sample_corpus.txt', text: chunkUnits.join(' '), start: i, end: endIdx });
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
      const chunkUnits = units.slice(i, j);
      chunks.push({ chunk_id: chunkId++, source: 'sample_corpus.txt', text: chunkUnits.join(' '), start: i, end: j });
      i = j - overlap;
      if (i < 0) i = 0;
    }
  }

  return chunks;
}

function main() {
  const args = process.argv.slice(2);
  const chunkSize = parseInt(args[0] || '400', 10);
  const overlap = parseInt(args[1] || '50', 10);
  const preserve = args[2] === 'true';
  const input = fs.readFileSync(path.resolve(__dirname, '..', 'sample_corpus.txt'), 'utf-8');
  const chunks = chunkText(input, chunkSize, overlap, preserve);
  const outPath = 'chunks.jsonl';
  fs.writeFileSync(outPath, chunks.map(c => JSON.stringify(c)).join('\n'));
  console.log(`Written ${chunks.length} chunks to ${outPath}`);
}

main();
