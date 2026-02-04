#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

interface Chunk { chunk_id: number; source: string; text: string; start: number; end: number; }

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Missing OPENAI_API_KEY in environment');
    process.exit(1);
  }
  const openai = new OpenAI({ apiKey });

  const chunks: Chunk[] = fs.readFileSync(
    path.resolve(__dirname, '..', 'video-2-chunking', 'chunks.jsonl'),
    'utf-8'
  )
    .split('\n')
    .filter(Boolean)
    .map(l => JSON.parse(l));

  const batchSize = 32;
  const results: { chunk_id: number; embedding: number[]; metadata: any }[] = [];

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const texts = batch.map(c => c.text);
    const resp = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: texts,
    });
    for (let j = 0; j < batch.length; j++) {
      results.push({
        chunk_id: batch[j].chunk_id,
        embedding: resp.data[j].embedding,
        metadata: {
          source: batch[j].source,
          start: batch[j].start,
          end: batch[j].end,
          text: batch[j].text
        },
      });
    }
    console.log(`Processed batch ${i / batchSize + 1}`);
  }

  const outPath = 'embeddings_openai.jsonl';
  fs.writeFileSync(outPath, results.map(r => JSON.stringify(r)).join('\n'));
  console.log(`Saved embeddings to ${outPath}`);
}

main();
