# Generar Embeddings con OpenAI

Este script genera embeddings utilizando la API de OpenAI para fragmentos cargados desde un archivo JSON.

## Prerrequisitos

### 1. Clave de API de OpenAI

Configura tu clave de API de OpenAI como variable de entorno. Puedes hacerlo de dos formas:

**Opción 1: Usando un archivo `.env`** (recomendado)
```bash
# Crea o edita el archivo .env en la raíz del proyecto
echo "OPENAI_API_KEY=sk_xxx" > .env
```

**Opción 2: Exportar directamente en la terminal**
```bash
export OPENAI_API_KEY=sk_xxx
```

> **Nota:** Reemplaza `sk_xxx` con tu clave de API real de OpenAI. Puedes obtener una en [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 2. Archivo de Chunks

Necesitas un archivo `chunks.json` con los fragmentos de texto previamente segmentados. El script busca el archivo en el mismo directorio del proyecto.

El archivo debe tener el siguiente formato:

```json
[
  {
    "chunk_id": "sample_corpus_chunk_0",
    "source_doc_id": "sample_corpus",
    "chunk_text": "Texto del fragmento...",
    "start_offset": 0,
    "end_offset": 100,
    "chunk_index": 0
  }
]
```

## Uso

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar la generación de embeddings

```bash
npm run embeddings
```

O alternativamente:

```bash
npm start
```

## ¿Qué hace el script?

El script realiza las siguientes operaciones:

1. **Verifica la API key**: Comprueba que la clave de API de OpenAI esté configurada correctamente
2. **Carga los chunks**: Lee el archivo `chunks.json` desde el directorio del proyecto
3. **Procesa en lotes**: Divide los chunks en lotes de 32 para optimizar las llamadas a la API
4. **Genera embeddings**: Utiliza el modelo `text-embedding-3-large` de OpenAI para generar vectores de embeddings
5. **Maneja rate limits**: Implementa reintentos automáticos en caso de límites de tasa
6. **Guarda resultados**: Guarda los embeddings con sus metadatos en el archivo `embeddings_openai.json`

## Salida

El script genera un archivo `embeddings_openai.json` con el siguiente formato:

```json
[
  {
    "chunk_id": "sample_corpus_chunk_0",
    "embedding": [0.123, -0.456, ...],
    "metadata": {
      "source_doc_id": "sample_corpus",
      "chunk_index": 0,
      "model": "text-embedding-3-large",
      "dimensions": 3072
    }
  }
]
```

Cada objeto en el array contiene:
- `chunk_id`: Identificador único del chunk
- `embedding`: Vector de embeddings (3072 dimensiones para `text-embedding-3-large`)
- `metadata`: Información adicional del chunk (ID del documento fuente, índice, modelo utilizado y dimensiones)

## Verificar el resultado

Para verificar que los embeddings se generaron correctamente:

```bash
# Verificar que el archivo existe
ls -lh embeddings_openai.json

# Ver el primer objeto del archivo (requiere jq)
cat embeddings_openai.json | jq '.[0]'

# Contar el número de embeddings generados
cat embeddings_openai.json | jq 'length'
```

## Configuración

### Modelo de embeddings

Por defecto, el script utiliza `text-embedding-3-large`. Para cambiar el modelo, edita la constante `MODEL` en `embeddings_openai.ts`:

```typescript
const MODEL = 'text-embedding-3-large'; // Cambia aquí el modelo
```

Modelos disponibles:
- `text-embedding-3-large`: 3072 dimensiones (por defecto)
- `text-embedding-3-small`: 1536 dimensiones
- `text-embedding-ada-002`: 1536 dimensiones (legacy)

### Tamaño de lote

El tamaño de lote por defecto es 32. Puedes ajustarlo modificando la constante `BATCH_SIZE`:

```typescript
const BATCH_SIZE = 32; // Ajusta este valor según tus necesidades
```

### Rutas de archivos

Las rutas de los archivos de entrada y salida se configuran en las constantes:

```typescript
const CHUNKS_FILE = join(_dirname, 'chunks.json');
const OUTPUT_FILE = join(_dirname, 'embeddings_openai.json');
```

## Solución de problemas

### Error: Missing OPENAI_API_KEY

Asegúrate de que tu clave de API esté configurada correctamente en el archivo `.env` o como variable de entorno.

### Error: Cannot find module

Ejecuta `npm install` para instalar todas las dependencias necesarias.

### Error: File not found

Verifica que el archivo `chunks.json` exista en el directorio del proyecto.

### Error: Rate limit (429)

El script maneja automáticamente los límites de tasa con reintentos. Si el problema persiste, considera:
- Reducir el tamaño del lote (`BATCH_SIZE`)
- Aumentar el tiempo de espera entre lotes
- Verificar los límites de tu plan de OpenAI

## Dependencias

- `openai`: Cliente oficial de OpenAI para Node.js
- `dotenv`: Carga variables de entorno desde archivo `.env`
- `ts-node`: Ejecuta archivos TypeScript directamente

## Licencia

Este proyecto es parte del curso de AI Engineering.
