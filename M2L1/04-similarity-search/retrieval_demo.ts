import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile, writeFile } from 'node:fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

// Función para cargar variables de entorno desde .env
async function loadEnv() {
  try {
    const envPath = join(_dirname, '.env');
    const envContent = await readFile(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    }
  } catch {
    // Ignorar si no existe .env
  }
}

//
// CONFIGURATION
//
const EMBEDDINGS_FILE = join(_dirname, 'embeddings_openai.json');
const CHUNKS_FILE = join(_dirname, 'chunks.json');
const OUTPUT_FILE = join(_dirname, 'retrieval_results.json');
const TOP_K = 5;

const QUERIES = [
  '¿Qué es la inteligencia artificial?',
  '¿Cómo funciona el aprendizaje automático?',
  '¿Cuáles son los beneficios del computo en la nube?'
];

//
// TYPES
//

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

interface ChunkMetadata {
  chunk_id: string;
  source_doc_id: string;
  chunk_text: string;
  start_offset: number;
  end_offset: number;
  chunk_index: number;
}

interface RetrievalResult {
  query: string;
  top_k: Array<{
    chunk_id: string;
    score: number;
    snippet: string;
    provenance: {
      source_doc_id: string;
      chunk_index: number;
    };
  }>;
}

interface OpenAIEmbeddingResponse {
  data: Array<{
    embedding: number[];
    index: number;
    object: string;
  }>;
  model: string;
  object: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

//
// UTILITY FUNCTIONS
//

async function loadEmbeddings(filePath: string): Promise<Map<string, EmbeddingRecord>> {
  const content = await readFile(filePath, 'utf-8').then(c => c.trim());
  
  if (!content || content === '[]') {
    console.warn('Embeddings file is empty or contains empty array');
    return new Map();
  }

  const embeddings = new Map<string, EmbeddingRecord>();
  
  // Intentar parsear como JSON array primero
  try {
    const records: any[] = JSON.parse(content);
    if (Array.isArray(records)) {
      let validCount = 0;
      let invalidCount = 0;
      
      for (const record of records) {
        if (!record || typeof record !== 'object') {
          invalidCount++;
          continue;
        }
        
        if (!record.chunk_id) {
          console.warn(`Skipping record without chunk_id at index ${invalidCount}`);
          invalidCount++;
          continue;
        }
        
        if (!record.embedding || !Array.isArray(record.embedding)) {
          console.warn(`Skipping record ${record.chunk_id}: embedding is missing or not an array`);
          invalidCount++;
          continue;
        }
        
        if (record.embedding.length === 0) {
          console.warn(`Skipping record ${record.chunk_id}: embedding is empty`);
          invalidCount++;
          continue;
        }
        
        embeddings.set(record.chunk_id, record as EmbeddingRecord);
        validCount++;
      }
      
      return embeddings;
    }
  } catch (error: any) {
    console.error(`Error parsing JSON array: ${error.message}`);
    // Si falla, intentar como JSONL (una línea por objeto)
  }

  // Parsear como JSONL
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.trim()) {
      try {
        const record: EmbeddingRecord = JSON.parse(line);
        
        // Validar estructura del registro
        if (!record.chunk_id) {
          console.warn(`Skipping record without chunk_id: ${line.substring(0, 50)}...`);
          continue;
        }
        
        if (!record.embedding || !Array.isArray(record.embedding)) {
          console.warn(`Skipping record ${record.chunk_id}: embedding is missing or not an array`);
          continue;
        }
        
        embeddings.set(record.chunk_id, record);
      } catch (error: any) {
        console.error(`Error parsing embedding line: ${error.message}`);
        continue;
      }
    }
  }

  return embeddings;
}

async function loadChunks(filePath: string): Promise<Map<string, ChunkMetadata>> {
  const content = await readFile(filePath, 'utf-8');
  const chunkList: ChunkMetadata[] = JSON.parse(content);

  const chunks = new Map<string, ChunkMetadata>();
  for (const chunk of chunkList) {
    chunks.set(chunk.chunk_id, chunk);
  }

  return chunks;
}

function cosineSimilarity(a: number[], b: number[]): number {
  // Validar que ambos parámetros son arrays válidos
  if (!a || !Array.isArray(a)) {
    throw new Error(`First parameter is not a valid array: ${typeof a}`);
  }
  if (!b || !Array.isArray(b)) {
    throw new Error(`Second parameter is not a valid array: ${typeof b}`);
  }
  
  if (a.length !== b.length) {
    throw new Error(`Dimension mismatch: ${a.length} vs ${b.length}`);
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}

async function generateQueryEmbedding(query: string, modelName: string = 'text-embedding-3-large'): Promise<number[]> {
  try {
    // Usar OpenAI API para generar embeddings (debe coincidir con los embeddings almacenados)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set. Please add it to your .env file.');
    }

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        input: query
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json() as OpenAIEmbeddingResponse;
    
    if (!data.data || !data.data[0] || !data.data[0].embedding) {
      throw new Error('Invalid response from OpenAI API');
    }

    return data.data[0].embedding;
  } catch (error: any) {
    console.error(`Error generating embedding:`, error.message);
    throw error;
  }
}

async function retrieveTopK(
  queryEmbedding: number[],
  embeddings: Map<string, EmbeddingRecord>,
  chunks: Map<string, ChunkMetadata>,
  topK: number
): Promise<RetrievalResult['top_k']> {
  const scores: Array<{ chunk_id: string; score: number }> = [];

  // Validar que queryEmbedding es válido
  if (!queryEmbedding || !Array.isArray(queryEmbedding) || queryEmbedding.length === 0) {
    throw new Error('Query embedding is invalid or empty');
  }

  for (const [chunkId, record] of embeddings.entries()) {
    try {
      // Validar chunkId
      if (!chunkId || chunkId === 'undefined') {
        console.error(`Skipping entry with invalid chunkId: ${chunkId}`);
        continue;
      }

      // Validar que el embedding existe y es un array
      if (!record || !record.embedding || !Array.isArray(record.embedding)) {
        console.error(`Invalid embedding for chunk ${chunkId}: embedding is missing or not an array`);
        continue;
      }

      if (record.embedding.length === 0) {
        console.error(`Empty embedding for chunk ${chunkId}`);
        continue;
      }

      const score = cosineSimilarity(queryEmbedding, record.embedding);
      scores.push({ chunk_id: chunkId, score });
    } catch (error: any) {
      console.error(`Error calculating similarity for chunk ${chunkId || 'unknown'}:`, error.message);
      if (error.stack) {
        console.error(error.stack);
      }
      continue;
    }
  }

  // Ordenar por score descendente y tomar top-k
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, topK);

  // Construir resultados con información completa
  const results: RetrievalResult['top_k'] = [];
  
  for (const { chunk_id, score } of topScores) {
    const chunk = chunks.get(chunk_id);
    if (!chunk) {
      console.warn(`Warning: Chunk ${chunk_id} not found in chunks map, skipping...`);
      continue;
    }

    // Crear snippet (primeros 200 caracteres del texto)
    const snippet = chunk.chunk_text.length > 200
      ? chunk.chunk_text.substring(0, 200) + '...'
      : chunk.chunk_text;

    results.push({
      chunk_id,
      score,
      snippet,
      provenance: {
        source_doc_id: chunk.source_doc_id,
        chunk_index: chunk.chunk_index
      }
    });
  }

  return results;
}

//
// MAIN
//

async function main() {
  // Cargar variables de entorno
  await loadEnv();
  
  console.log('Similarity Search\n');
  
  const embeddings = await loadEmbeddings(EMBEDDINGS_FILE);
  const chunks = await loadChunks(CHUNKS_FILE);

  // Obtener dimensiones del primer embedding
  const firstEmbedding = embeddings.values().next().value;
  const dimensions = firstEmbedding?.embedding?.length || 0;

  console.log(`${embeddings.size} indexed vectors (${dimensions} dimensions)\n`);

  if (embeddings.size === 0) {
    console.error('Error: No embeddings loaded. Please ensure embeddings_openai.json contains valid data.');
    return;
  }

  if (chunks.size === 0) {
    console.error('Error: No chunks loaded. Please ensure chunks.json contains valid data.');
    return;
  }

  // Verificar que todos los embeddings tengan chunks correspondientes
  const missingChunks: string[] = [];
  for (const chunkId of embeddings.keys()) {
    if (!chunks.has(chunkId)) {
      missingChunks.push(chunkId);
    }
  }

  if (missingChunks.length > 0) {
    console.warn(`Warning: ${missingChunks.length} chunks are missing from chunks.json:`);
    missingChunks.forEach(id => console.warn(`  - ${id}`));
    console.warn('These chunks will be skipped in the results.\n');
  }

  const results: Array<RetrievalResult> = [];

  for (let i = 0; i < QUERIES.length; i++) {
    const query = QUERIES[i];
    console.log(`Query ${i + 1}: '${query}'`);
    
    // Generar embedding para la consulta
    const queryEmbedding = await generateQueryEmbedding(query);

    // Recuperar top-k resultados
    const topKResults = await retrieveTopK(queryEmbedding, embeddings, chunks, TOP_K);
    
    results.push({
      query,
      top_k: topKResults
    });

    // Mostrar resultados formateados
    console.log(`Top ${TOP_K} results:`);
    topKResults.forEach((result, idx) => {
      console.log(`  ${idx + 1}. Score: ${result.score.toFixed(4)} | ${result.chunk_id}`);
    });
    console.log('');
  }

  // Guardar resultados
  const output = {
    retrieval_date: new Date().toISOString(),
    top_k: TOP_K,
    queries: results
  };

  await writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
}

main().catch(console.error);
