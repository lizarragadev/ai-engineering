# Video 5: Caché, deduplicación y optimización simple de recuperación

**Duración estimada:** 12 min

**Objetivo:**
Implementar una capa de caché simple para resultados de recuperación, demostrar aciertos y fallos de caché, e implementar la supresión de fragmentos duplicados mediante deduplicación basada en hash.

## Requisitos previos

- Videos 1–4 completados
- Dependencias instaladas (`numpy`, `pandas`)

## Pasos (lista reproducible)

1. Revisar `utils/cache.py` y entender el formato de la clave de caché (huella de la consulta + k).
2. Ejecutar la primera consulta y observar un fallo de caché:
   ```bash
   python scripts/cached_query.py --query "X" --k 5
   ```
3. Ejecutar la misma consulta de nuevo y observar un acierto de caché:
   ```bash
   python scripts/cached_query.py --query "X" --k 5
   ```
4. Forzar la deduplicación usando textos duplicados:
   ```bash
   python scripts/cached_query.py --query "dup" --k 5
   ```
5. Demostrar la invalidación de caché al cambiar los pesos:
   ```bash
   python scripts/cached_query.py --query "X" --k 5 --weights 0.7,0.3
   ```

## Errores frecuentes y solución de problemas

- La caché crece sin límite: configurar TTL y política de expulsión.
- La deduplicación no detecta casi-duplicados: normalizar el texto (strip, minúsculas).
- Entradas de caché obsoletas tras actualizar el índice: incluir la versión del índice en la clave de caché.

## Materiales

- `utils/cache.py`: lógica de caché con TTL basada en archivos
- `scripts/`: script cached_query y módulo de recuperación simulado
- `notebooks/`: notebook de demo
- `assets/`: gráficos de latencia y diagramas de flujo de deduplicación
- `verification_artifacts/`: salida esperada de la CLI
