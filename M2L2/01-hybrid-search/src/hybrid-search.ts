export interface ItemWithMetadata {
  id: string;
  vector: number[];
  metadata: Record<string, any>;
}

/**
 * Búsqueda híbrida: combina similitud de vectores con filtros de metadatos.
 * @param items Array de elementos con vectores y metadatos
 * @param queryVector Vector de búsqueda
 * @param filter Función que devuelve true si el elemento pasa el filtro
 * @param k Número de resultados a devolver
 * @returns Array con los k elementos más similares que pasan el filtro
 */
export function hybridSearch(
  items: ItemWithMetadata[],
  queryVector: number[],
  filter: (metadata: Record<string, any>) => boolean,
  k: number
): ItemWithMetadata[] {
  // 1. Filtrar elementos por metadatos usando la función de filtro
  console.log(`[Hybrid Search] Starting hybrid search on ${items.length} items`);
  const filtered = items.filter(item => filter(item.metadata));
  console.log(`[Hybrid Search] ${filtered.length} items passed metadata filter`);

  // 2. Calcular similitud del coseno con queryVector para cada elemento filtrado
  const itemsWithScores = filtered.map(item => ({
    item,
    score: cosine(queryVector, item.vector)
  }));

  // 3. Ordenar por similitud (de mayor a menor)
  itemsWithScores.sort((a, b) => b.score - a.score);

  // 4. Devolver los primeros k resultados
  const results = itemsWithScores.slice(0, k).map(({ item }) => item);
  console.log(`[Hybrid Search] Results (top ${k}): ${itemsWithScores.slice(0, k).map(({ item, score }) => `${item.id} (score: ${score.toFixed(4)})`).join(', ')}`);
  return results;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Ejemplo de uso
// @ts-ignore - Verificación de runtime de Node.js
if (typeof require !== 'undefined' && require.main === module) {
  const items: ItemWithMetadata[] = [
    {
      id: 'doc-1',
      vector: [0.8, 0.2, 0.1, 0.9],
      metadata: { category: 'tech', date: '2024-01-15', author: 'Alice' }
    },
    {
      id: 'doc-2',
      vector: [0.1, 0.9, 0.8, 0.2],
      metadata: { category: 'sports', date: '2024-02-10', author: 'Bob' }
    },
    {
      id: 'doc-3',
      vector: [0.7, 0.3, 0.2, 0.8],
      metadata: { category: 'tech', date: '2024-02-20', author: 'Alice' }
    },
    {
      id: 'doc-4',
      vector: [0.6, 0.4, 0.3, 0.7],
      metadata: { category: 'tech', date: '2023-06-15', author: 'Charlie' }
    },
    {
      id: 'doc-5',
      vector: [0.2, 0.8, 0.9, 0.1],
      metadata: { category: 'sports', date: '2024-01-05', author: 'Bob' }
    }
  ];

  const queryVector = [0.75, 0.25, 0.15, 0.85];
  //const techFilter = (metadata: Record<string, any>) => metadata.category === 'tech';
  const sportsFilter = (metadata: Record<string, any>) => metadata.category === 'sports';
  const results = hybridSearch(items, queryVector, sportsFilter, 2);

  console.log(results);
}