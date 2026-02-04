export interface VectorItem {
  id: string;
  vector: number[];
}

/**
 * Índice de vectores simple en memoria.
 * Usa búsqueda por fuerza bruta (calcula similitud con todos los vectores).
 */
export class InMemoryVectorIndex {
  private items: VectorItem[] = [];

  /**
   * Agrega un vector al índice.
   */
  add(item: VectorItem): void {
    // TODO: Agregar el elemento al array
    if (!item.id || !item.vector) {
      throw new Error('Invalid item');
    }
    if (this.items.some(existing => existing.id === item.id)) {
      throw new Error(`Item already exists with ID ${item.id}`);
    }
    if (item.vector.length === 0) {
      throw new Error("Vector can't be empty.");
    }
    this.items.push(item);
  }

  /**
   * Busca los k vectores más similares al vector de consulta.
   * @param query Vector de búsqueda
   * @param k Número de resultados a devolver
   * @returns Array con los k vectores más similares
   */
  search(query: number[], k: number): VectorItem[] {
    // TODO: Implementar búsqueda
    // 1. Calcular similitud del coseno con cada vector
    // 2. Ordenar por similitud (de mayor a menor)
    // 3. Devolver los primeros k resultados
    if (k <= 0) {
      throw new Error("k debe ser mayor que 0");
    }

    // 1. Calcular similitud del coseno con cada vector
    const results: Array<{ item: VectorItem; similarity: number }> = [];
    for (const item of this.items) {
      const similarity = cosineSimilarity(query, item.vector);
      results.push({ item, similarity });
    }

    // 2. Ordenar por similitud (de mayor a menor)
    results.sort((a, b) => b.similarity - a.similarity);

    // 3. Devolver los primeros k resultados
    const topK = results.slice(0, k);
    return topK.map(result => result.item);
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Ejemplo de uso
// @ts-ignore - Verificación de runtime de Node.js
if (typeof require !== 'undefined' && require.main === module) {
  const index = new InMemoryVectorIndex();

  index.add({
    id: 'doc-1',
    vector: [0.8, 0.2, 0.1, 0.9]
  });

  index.add({
    id: 'doc-2',
    vector: [0.1, 0.9, 0.8, 0.2]
  });

  index.add({
    id: 'doc-3',
    vector: [0.7, 0.3, 0.2, 0.8]
  });

  const queryVector = [0.75, 0.25, 0.15, 0.85];
  const results = index.search(queryVector, 2);

  console.log(results);
}
