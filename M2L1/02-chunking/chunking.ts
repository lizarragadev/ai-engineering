// Parámetros configurables:
// - chunkSize: Tamaño máximo de cada trozo en caracteres
// - overlap: Número de caracteres que se solapan entre trozos (para evitar pérdida de contexto)
// - preserveSentences: Si es true, intenta no cortar a mitad de una frase

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

// CONFIGURATION

interface ChunkingConfig {
  chunkSize: number;
  overlap: number;
  preserveSentences: boolean;
  inputFile: string;
  outputFile: string;
}

const config: ChunkingConfig = {
  chunkSize: 400,
  overlap: 50,
  preserveSentences: true,
  inputFile: join(_dirname, 'sample_corpus.txt'),
  outputFile: join(_dirname, 'chunks.json'),
};

// TYPES

interface ChunkMetadata {
  chunk_id: string;
  source_doc_id: string;
  chunk_text: string;
  start_offset: number;
  end_offset: number;
  chunk_index: number;
}

// UTILITY FUNCTIONS

function splitIntoSentences(text: string): string[] {
  const sentences = text
    .split(/([.!?]\s+)/)
    .reduce<string[]>((acc, curr, idx, arr) => {
      if (idx % 2 == 0) {
        acc.push(curr + (arr[idx + 1] || ''));
      }
      return acc;
    }, [])
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return sentences;
}

function chunkText(
  text: string,
  chunkSize: number,
  overlap: number,
  preserveSentences: boolean
): ChunkMetadata[] {
  const chunks: ChunkMetadata[] = [];
  const sourceDocId = 'sample_corpus';

  if (preserveSentences) {
    const sentences = splitIntoSentences(text);
    let currentChunk = '';
    let startOffset = 0;
    let chunkIndex = 0;
    let endOffset = 0;

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const potentialChunk = currentChunk + (currentChunk ? ' ' : '') + sentence;

      if (potentialChunk.length <= chunkSize) {
        currentChunk = potentialChunk;
      } else {
        if (currentChunk) {
          endOffset = startOffset + currentChunk.length;
          chunks.push({
            chunk_id: `${sourceDocId}_chunk_${chunkIndex}`,
            source_doc_id: sourceDocId,
            chunk_text: currentChunk,
            start_offset: startOffset,
            end_offset: endOffset,
            chunk_index: chunkIndex,
          });
          chunkIndex++;
        }

        startOffset = Math.max(0, endOffset - overlap);
        if (startOffset >= text.length) break;

        currentChunk = sentence;
        const sentenceStart = text.indexOf(sentence, startOffset);
        if (sentenceStart !== -1) {
          startOffset = sentenceStart;
        } else {
          startOffset = Math.max(0, text.length - sentence.length);
        }
      }
    }

    if (currentChunk) {
      endOffset = startOffset + currentChunk.length;
      chunks.push({
        chunk_id: `${sourceDocId}_chunk_${chunkIndex}`,
        source_doc_id: sourceDocId,
        chunk_text: currentChunk,
        start_offset: startOffset,
        end_offset: endOffset,
        chunk_index: chunkIndex,
      });
    }
  } else {
    let startOffset = 0;
    let chunkIndex = 0;

    while (startOffset < text.length) {
      const endOffset = Math.min(startOffset + chunkSize, text.length);
      const chunkText = text.slice(startOffset, endOffset);

      chunks.push({
        chunk_id: `${sourceDocId}_chunk_${chunkIndex}`,
        source_doc_id: sourceDocId,
        chunk_text: chunkText,
        start_offset: startOffset,
        end_offset: endOffset,
        chunk_index: chunkIndex,
      });
      chunkIndex++;

      startOffset = endOffset - overlap;
      if (startOffset >= text.length) break;
    }
  }

  return chunks;
}

async function saveChunksToJSON(
  chunks: ChunkMetadata[],
  outputPath: string
): Promise<void> {
  await writeFile(outputPath, JSON.stringify(chunks, null, 2), 'utf-8');
}

async function main() {
  try {
    console.log('📄 Text Chunking\n');

    const corpus = await readFile(config.inputFile, 'utf-8');
    console.log(`📖 Corpus loaded: ${corpus.length} characters`);

    const chunks = chunkText(
      corpus,
      config.chunkSize,
      config.overlap,
      config.preserveSentences
    );
    console.log(`✂️ Created ${chunks.length} chunks`);

    await saveChunksToJSON(chunks, config.outputFile);
    console.log('✅ Completed\n');
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.code === 'ENOENT') {
      console.error(`📄 File not found: ${error.path}`);
      console.error('Make sure sample_corpus.txt exists in the same directory.');
    }
    process.exit(1);
  }
}

main();
