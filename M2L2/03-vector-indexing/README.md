# Indexación de Vectores - KNN Index

## Objetivo

Implementar un índice para búsqueda de vecinos más cercanos (KNN - K Nearest Neighbors) que permita realizar búsquedas eficientes en espacios vectoriales de alta dimensionalidad.

## Descripción

Este proyecto implementa un índice KNN que permite:

- Almacenar vectores de manera eficiente
- Realizar búsquedas rápidas de los k vecinos más cercanos
- Optimizar consultas en grandes colecciones de vectores

## Estructura de Archivos

- `src/knn-index.ts`: Implementación del índice KNN
- `tests/knn-index.test.ts`: Tests para el índice KNN

## Requisitos Previos

- Node.js instalado
- TypeScript instalado globalmente o a través de npm
- ts-node para ejecutar archivos TypeScript directamente (opcional)

## Instrucciones de Ejecución

### Opción 1: Ejecutar con ts-node

```bash
npx ts-node src/knn-index.ts
```

### Opción 2: Compilar y ejecutar con Node.js

1. Compilar el código TypeScript:
```bash
tsc src/knn-index.ts --outDir dist --module commonjs --target es2020 --moduleResolution node --esModuleInterop
```

2. Ejecutar el archivo compilado:
```bash
node dist/knn-index.js
```

### Opción 3: Usar tsx

```bash
npx tsx src/knn-index.ts
```

## Ejecutar Tests

Para ejecutar los tests:

```bash
npx jest tests/knn-index.test.ts
```

O con ts-jest:

```bash
npx ts-jest tests/knn-index.test.ts
```

## Notas

- Este proyecto está en desarrollo
- La implementación del índice KNN está pendiente
