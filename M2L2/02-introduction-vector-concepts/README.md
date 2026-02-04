# Introducción a Conceptos de Vectores - Similitud del Coseno

## Objetivo

Implementar y entender el cálculo de similitud del coseno entre dos vectores, una métrica fundamental en búsqueda semántica y machine learning.

## Descripción

Este proyecto implementa la función de similitud del coseno, que mide el ángulo entre dos vectores en un espacio multidimensional. La similitud del coseno es especialmente útil para:

- Comparar embeddings de texto
- Búsqueda semántica
- Sistemas de recomendación
- Clustering de datos

## Fórmula Matemática

La similitud del coseno se calcula como:

```
cos(θ) = (A · B) / (||A|| × ||B||)
```

Donde:
- `A · B` es el producto punto de los vectores A y B
- `||A||` y `||B||` son las normas (magnitudes) de los vectores A y B
- El resultado está entre -1 y 1

## Estructura de Archivos

- `src/cosine.ts`: Implementación de la función de similitud del coseno con ejemplos de uso
- `tests/`: Directorio para tests (pendiente de implementar)

## Requisitos Previos

- Node.js instalado
- TypeScript instalado globalmente o a través de npm
- ts-node para ejecutar archivos TypeScript directamente (opcional)

## Instrucciones de Ejecución

### Opción 1: Ejecutar el ejemplo directamente con ts-node

```bash
npx ts-node src/cosine.ts
```

O si está instalado globalmente:

```bash
ts-node src/cosine.ts
```

### Opción 2: Compilar y ejecutar con Node.js

1. Compilar el código TypeScript:
```bash
tsc src/cosine.ts --outDir dist --module commonjs --target es2020 --moduleResolution node --esModuleInterop
```

2. Ejecutar el archivo compilado:
```bash
node dist/cosine.js
```

### Opción 3: Usar tsx (alternativa moderna)

```bash
npx tsx src/cosine.ts
```

## Ejemplo de Uso

El archivo `src/cosine.ts` incluye varios ejemplos de uso comentados que puedes activar descomentando las líneas correspondientes:

1. **Case 1: Vectores idénticos** - Similitud = 1.0
   ```typescript
   console.log(cosineSimilarity([1, 2, 3], [1, 2, 3]));
   ```
   **Salida esperada:**
   ```
   [Cosine Similarity] Calculating similarity between vectors of dimension 3
   [Cosine Similarity] Result: 1.0000
   ```

2. **Case 2: Vectores ortogonales** - Similitud = 0.0
   ```typescript
   console.log(cosineSimilarity([1, 0], [0, 1]));
   ```
   **Salida esperada:**
   ```
   [Cosine Similarity] Calculating similarity between vectors of dimension 2
   [Cosine Similarity] Result: 0.0000
   ```

3. **Case 3: Vector cero** - Manejo especial, retorna 0
   ```typescript
   console.log(cosineSimilarity([0, 0], [1, 2]));
   ```
   **Salida esperada:**
   ```
   [Cosine Similarity] Calculating similarity between vectors of dimension 2
   [Cosine Similarity] Result: 0 (one of the vectors is zero)
   ```

4. **Case 4: Vectores intermedios** - Similitud entre 0 y 1
   ```typescript
   console.log(cosineSimilarity([1, 2, 3], [4, 5, 6]));
   ```
   **Salida esperada:**
   ```
   [Cosine Similarity] Calculating similarity between vectors of dimension 3
   [Cosine Similarity] Result: 0.9746
   ```

5. **Case 5: Vectores opuestos** - Similitud = -1.0
   ```typescript
   console.log(cosineSimilarity([1, 2, 3], [-1, -2, -3]));
   ```
   **Salida esperada:**
   ```
   [Cosine Similarity] Calculating similarity between vectors of dimension 3
   [Cosine Similarity] Result: -1.0000
   ```

**Para ejecutar un ejemplo:**
1. Abre el archivo `src/cosine.ts`
2. Descomenta la línea del ejemplo que deseas probar (elimina los `//` al inicio)
3. Ejecuta el archivo usando una de las opciones mencionadas arriba
4. Observa la salida en la consola

**Nota:** Por defecto, todos los ejemplos están comentados. Descomenta solo el que desees probar para evitar múltiples salidas en consola.

## API

### `cosineSimilarity(a, b)`

**Parámetros:**
- `a`: Primer vector (`number[]`)
- `b`: Segundo vector (`number[]`)

**Retorna:**
- Similitud del coseno entre -1 y 1 (`number`)

**Lanza:**
- `Error` si los vectores tienen longitudes diferentes

**Características:**
- Valida que ambos vectores tengan la misma longitud
- Maneja el caso especial de vectores cero (retorna 0)
- Calcula el producto punto y las normas de los vectores
- Retorna un valor entre -1 y 1

## Interpretación de Resultados

- **1.0**: Vectores idénticos (misma dirección)
- **0.0**: Vectores ortogonales (perpendiculares) o uno de los vectores es cero
- **-1.0**: Vectores opuestos (dirección completamente opuesta)
- **Valores entre 0 y 1**: Vectores con alguna similitud positiva
- **Valores entre -1 y 0**: Vectores con alguna similitud negativa

## Notas

- La función valida que ambos vectores tengan la misma dimensión
- Si alguno de los vectores es el vector cero, la función retorna 0 (evita división por cero)
- Los logs en consola muestran el progreso del cálculo y el resultado final
