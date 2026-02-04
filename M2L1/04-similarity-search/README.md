# Similarity Search & Retrieval Demo

Este script implementa una búsqueda de similitud de coseno para recuperar los fragmentos más relevantes (top-k) para las consultas.

## Prerrequisitos

1. **Archivo de embeddings:** `embeddings_openai.json` o `embeddings_local.json` de los scripts de incrustaciones.
2. **Archivo de fragmentos:** `chunks.json` de los scripts de fragmentación.
3. **API Key de OpenAI:** Configurar `OPENAI_API_KEY` en el archivo `.env` para generar embeddings de consultas.

## Uso

1. **Configurar variables de entorno:**
   ```bash
   # Crear archivo .env y agregar tu API key de OpenAI
   echo "OPENAI_API_KEY=tu_api_key_aqui" > .env
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar demo de recuperación:**
   ```bash
   npm run retrieve
   # o
   tsx retrieval_demo.ts
   ```

## Configuración

Editar constantes en `retrieval_demo.ts`:

- **EMBEDDINGS_FILE:** Ruta al archivo JSON de embeddings
- **CHUNKS_FILE:** Ruta al archivo JSON de fragmentos
- **OUTPUT_FILE:** Ruta para guardar el JSON de resultados
- **TOP_K:** Número de resultados principales a recuperar (por defecto: 5)
- **QUERIES:** Array de consultas de prueba

## Formato de Salida

`retrieval_results.json` contiene:

```json
{
  "retrieval_date": "2025-01-15T...",
  "top_k": 5,
  "queries": [
    {
      "query": "¿Qué es la inteligencia artificial?",
      "top_k": [
        {
          "chunk_id": "sample_corpus_chunk_0",
          "score": 0.8234,
          "snippet": "La inteligencia artificial ha revolucionado...",
          "provenance": {
            "source_doc_id": "sample_corpus",
            "chunk_index": 0
          }
        }
      ]
    }
  ]
}
```

## Resolución de Problemas

### Desajuste de Dimensiones

Si ves el error `Dimension mismatch: X vs Y`, significa que los embeddings de las consultas tienen una dimensión diferente a los embeddings almacenados.

**Solución:** Asegúrate de usar el mismo modelo para generar los embeddings de las consultas que el usado para generar los embeddings almacenados. Por defecto, el script usa `text-embedding-3-large` (3072 dimensiones) que coincide con los embeddings de OpenAI.

Si tus embeddings fueron generados con un modelo diferente, modifica el parámetro `modelName` en la función `generateQueryEmbedding()` en `retrieval_demo.ts`.

### Error: OPENAI_API_KEY not set

Si ves este error, necesitas configurar tu API key de OpenAI en el archivo `.env`:

```bash
OPENAI_API_KEY=sk-tu_api_key_aqui
```
