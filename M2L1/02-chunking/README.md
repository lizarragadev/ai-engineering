# Text Chunking Script

Esta carpeta contiene el script de segmentación que procesa texto de `sample_corpus.txt` y genera segmentos con metadatos.

## Visión general

El script `chunking.ts` segmenta texto con parámetros configurables:

- `chunkSize`: máximo de caracteres por segmento (por defecto: 400).
- `overlap`: número de caracteres a solapar entre segmentos (por defecto: 50).
- `preserveSentences`: intentar preservar los límites de las oraciones (por defecto: true).

## Uso

1. **Instala dependencias:**

   ```bash
   npm install
   ```

2. **Ejecuta el script de segmentación:**

   ```bash
   npm run chunk
   # or
   tsx chunking.ts
   ```

## Configuración

Edita el objeto `config` en `chunking.ts` para cambiar los parámetros:

```ts
const config: ChunkingConfig = {
  chunkSize: 400,        // Change this
  overlap: 50,           // Change this
  preserveSentences: true, // Change this
  inputFile: 'sample_corpus.txt',
  outputFile: 'chunks.json'
};
```

## Salida

Los segmentos se escriben en `chunks.json` (o en el archivo indicado en `outputFile`). Cada elemento tiene los campos `chunk_id`, `source`, `text`, `start` y `end`.
