#!/usr/bin/env ts-node

/**
 * This allows semantic searches: finding related texts by meaning,
 * not just by matching words.
 */

import OpenAI from 'openai';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const _dirname = __dirname;

// CONFIGURATION
const CHUNKS_FILE = join(_dirname, 'chunks.json');
const OUTPUT_FILE = join(_dirname, 'embeddings_openai.json');
const BATCH_SIZE = 32;
const MODEL = 'text-embedding-3-large';

// TYPES
interface ChunkMetadata {
  chunk_id: string;
  source_doc_id: string;
  chunk_text: string;
  start_offset: number;
  end_offset: number;
  chunk_index: number;
}

interface EmbeddingRecord {
  chunk_id: string;
  embedding: number[];
  metadata: {
    source_doc_id: string;
    chunk_index: number;
    model: string;
    dimensions: number;
  };
}

// UTILITY FUNCTIONS
async function checkApiKey(): Promise<boolean> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY not found');
    console.error('   Set it with: export OPENAI_API_KEY=sk_xxx');
    console.error('   Or use a .env file with dotenv');
    return false;
  }
  const masked = apiKey.length > 11
    ? `${apiKey.substring(0, 7)} ... ${apiKey.substring(apiKey.length - 4)}`
    : '***';
  console.log(`✅ OpenAI API key found: ${masked}`);
  return true;
}

async function loadChunks(filePath: string): Promise<ChunkMetadata[]> {
  const content = await readFile(filePath, 'utf-8');
  const chunks = JSON.parse(content);
  return chunks;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateEmbeddingsBatch(
  client: OpenAI,
  texts: string[],
  batchNum: number,
  totalBatches: number
): Promise<number[][]> {
  try {
    const response = await client.embeddings.create({
      model: MODEL,
      input: texts,
    });
    const embeddings = response.data.map(item => item.embedding);
    console.log(` Batch ${batchNum + 1}/${totalBatches} completed`);
    await sleep(100);
    return embeddings;
  } catch (error: any) {
    if (error.status === 429) {
      console.log(` Rate limit. Waiting...`);
      await sleep(2000);
      return generateEmbeddingsBatch(client, texts, batchNum, totalBatches);
    }
    throw error;
  }
}

async function saveEmbeddingsToJSON(
  embeddings: EmbeddingRecord[],
  outputPath: string
): Promise<void> {
  const jsonContent = JSON.stringify(embeddings, null, 2);
  await writeFile(outputPath, jsonContent, 'utf-8');
}

//
// MAIN EXECUTION
//
async function main() {
  try {
    console.log('👾 OpenAI Embeddings Generator\n');

    if (!(await checkApiKey())) {
      console.log('ℹ️ Use local transformers as an alternative\n');
      process.exit(0);
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log(`📂 Loading chunks from: ${CHUNKS_FILE}`);
    const chunks = await loadChunks(CHUNKS_FILE);
    console.log(`✅ Loaded ${chunks.length} chunks\n`);

    if (chunks.length === 0) {
      console.log('⚠️ No chunks to process');
      return;
    }

    const totalBatches = Math.ceil(chunks.length / BATCH_SIZE);
    console.log(`🚀 Generating embeddings with model: ${MODEL}`);
    console.log(`📦 Processing ${chunks.length} chunks in ${totalBatches} batches\n`);

    const embeddingRecords: EmbeddingRecord[] = [];

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE);
      const texts = batch.map(chunk => chunk.chunk_text);

      const embeddings = await generateEmbeddingsBatch(
        client,
        texts,
        batchNum,
        totalBatches
      );

      for (let j = 0; j < batch.length; j++) {
        const chunk = batch[j];
        const embedding = embeddings[j];
        
        embeddingRecords.push({
          chunk_id: chunk.chunk_id,
          embedding: embedding,
          metadata: {
            source_doc_id: chunk.source_doc_id,
            chunk_index: chunk.chunk_index,
            model: MODEL,
            dimensions: embedding.length
          }
        });
      }
    }

    console.log(`\n💾 Saving embeddings to: ${OUTPUT_FILE}`);
    await saveEmbeddingsToJSON(embeddingRecords, OUTPUT_FILE);
    console.log(`✅ Successfully saved ${embeddingRecords.length} embeddings\n`);

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    process.exit(1);
  }
}

main();
