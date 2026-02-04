# Búsqueda Híbrida - Similitud de Vectores + Filtrado por Metadatos en TypeScript

## Objetivo

Combinar la búsqueda por similitud de vectores con filtros de metadatos para devolver los k resultados principales que satisfacen los criterios de filtrado.

## Descripción

Este proyecto implementa una función de búsqueda híbrida que:
1. Filtra elementos por metadatos usando una función de filtro personalizada
2. Calcula la similitud del coseno entre el vector de consulta y los vectores de los elementos filtrados
3. Ordena los resultados por similitud (de mayor a menor)
4. Devuelve los k elementos más similares que pasan el filtro

## Estructura de Archivos

- `src/hybrid-search.ts`: Implementación de la búsqueda híbrida con función de ejemplo incluida
- `tests/hybrid.test.ts`: Tests básicos para la búsqueda híbrida

## Requisitos Previos

- Node.js instalado
- TypeScript instalado globalmente o a través de npm
- ts-node para ejecutar archivos TypeScript directamente (opcional)

## Instrucciones de Ejecución

### Opción 1: Ejecutar el ejemplo directamente con ts-node

Si tienes `ts-node` instalado globalmente:

```bash
npx ts-node src/hybrid-search.ts
```

O si está instalado localmente:

```bash
npm install -g ts-node
ts-node src/hybrid-search.ts
```

### Opción 2: Compilar y ejecutar con Node.js

1. Compilar el código TypeScript:
```bash
tsc src/hybrid-search.ts --outDir dist --module commonjs --target es2020 --moduleResolution node --esModuleInterop
```

2. Ejecutar el archivo compilado:
```bash
node dist/hybrid-search.js
```

### Opción 3: Usar tsx (alternativa moderna)

```bash
npx tsx src/hybrid-search.ts
```

## Ejemplo de Uso

El archivo `src/hybrid-search.ts` incluye un ejemplo que:

1. Define 5 documentos con vectores y metadatos (categorías: 'tech' y 'sports')
2. Crea un vector de consulta: `[0.75, 0.25, 0.15, 0.85]`
3. Define un filtro para buscar solo documentos de categoría 'tech'
4. Ejecuta la búsqueda híbrida solicitando los 2 resultados principales
5. Muestra los resultados en consola con sus scores de similitud

**Salida esperada:**
```
[Hybrid Search] Starting hybrid search on 5 items
[Hybrid Search] 3 items passed metadata filter
[Hybrid Search] Results (top 2): doc-1 (score: 0.xxxx), doc-3 (score: 0.xxxx)
[ { id: 'doc-1', vector: [...], metadata: {...} }, ... ]
```

## Ejecutar Tests

Para ejecutar los tests, necesitarás tener Jest configurado. Si tienes Jest instalado:

```bash
npm test
```

O con ts-jest:

```bash
npx jest tests/hybrid.test.ts
```

## API

### `hybridSearch(items, queryVector, filter, k)`

**Parámetros:**
- `items`: Array de elementos con vectores y metadatos (`ItemWithMetadata[]`)
- `queryVector`: Vector de búsqueda (`number[]`)
- `filter`: Función que devuelve `true` si el elemento pasa el filtro (`(metadata: Record<string, any>) => boolean`)
- `k`: Número de resultados a devolver (`number`)

**Retorna:**
- Array con los k elementos más similares que pasan el filtro (`ItemWithMetadata[]`)

### Interfaz `ItemWithMetadata`

```typescript
interface ItemWithMetadata {
  id: string;
  vector: number[];
  metadata: Record<string, any>;
}
```

## Notas

- La función calcula la similitud del coseno entre vectores
- Los resultados se ordenan de mayor a menor similitud
- Solo se devuelven los elementos que pasan el filtro de metadatos
- Si hay menos de k elementos que pasan el filtro, se devuelven todos los disponibles
