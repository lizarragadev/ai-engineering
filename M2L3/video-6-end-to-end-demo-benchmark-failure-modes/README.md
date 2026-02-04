# Video 6: Demo de extremo a extremo, micro-benchmark y modos de fallo

**Duración estimada:** 15 min

**Objetivo:**
Ejecutar el pipeline RAG completo para 5 consultas de ejemplo, capturar resultados de micro-benchmark (latencias p50/p95) y reproducir modos de fallo con estrategias de mitigación.

## Requisitos previos

- Videos 1–5 completados
- Dependencias instaladas (`numpy`, `pandas`)

## Pasos (lista reproducible)

1. Ejecutar el benchmark:
   ```bash
   python scripts/benchmark.py --queries sample_queries.json --runs 5
   ```
2. Observar los logs por paso y el resumen p50/p95.
3. Reproducir un fallo de ventana de contexto (prompt demasiado grande) y aplicar mitigación por truncado.
4. Reproducir fallo de duplicación/alucinación y aplicar mitigación de deduplicación y anclaje.
5. Verificar que se generó `benchmark_results.json`.

## Errores frecuentes y solución de problemas

- Timeouts en llamadas al LLM: ajustar la configuración de timeout o usar el stub.
- p95 distorsionado por arranque en frío: ejecutar una consulta de calentamiento antes de medir.
- `benchmark_results.json` no se crea: revisar permisos de escritura.

## Materiales

- `scripts/benchmark.py`
- `sample_queries.json`
- `templates/`: plantilla del prompt
- `notebooks/`: cuaderno de análisis del benchmark
- `verification_artifacts/benchmark_results.json`
- `assets/`: gráficos de latencia y modos de fallo
