/**
 * La similitud del coseno se calcula como:
 * cos(θ) = (A · B) / (||A|| × ||B||)
 * @param a Primer vector
 * @param b Segundo vector
 * @returns Similitud del coseno (entre -1 y 1)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must be of same length');
  }
  console.log(`[Cosine Similarity] Calculating similarity between vectors of dimension ${a.length}`);

  // 1. Calcular el producto punto (A · B)
  let dot = 0;
  // 2. Calcular las normas de cada vector (||A|| y ||B||)
  let normA = 0;
  let normB = 0;

  // 3. Dividir el producto punto por el producto de las normas
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  // 4. Manejar caso especial: si alguna norma es 0, devolver 0
  if (normA === 0 || normB === 0) {
    console.log(`[Cosine Similarity] Result: 0 (one of the vectors is zero)`);
    return 0;
  }

  const similarity = dot / (Math.sqrt(normA) * Math.sqrt(normB));
  console.log(`[Cosine Similarity] Result: ${similarity.toFixed(4)}`);
  return similarity;
}

// Ejemplo de uso
// Caso 1: Vectores idénticos
//console.log(cosineSimilarity([1, 2, 3], [1, 2, 3]));

// Caso 2: Vectores ortogonales
//console.log(cosineSimilarity([1, 0], [0, 1]));

// Caso 3: Vector cero
//console.log(cosineSimilarity([0, 0], [1, 2]));

// Caso 4: Vectores intermedios
//console.log(cosineSimilarity([1, 2, 3], [4, 5, 6]));

// Caso 5: Vectores opuestos
console.log(cosineSimilarity([1, 2, 3], [-1, -2, -3]));
