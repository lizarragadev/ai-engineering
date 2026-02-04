# Video 4: Implementar reranker de relevancia y umbralado

**Duración estimada:** 12 min

**Objetivo:**
Implementar y demostrar un reranker de relevancia sencillo que reordena los fragmentos top-K mediante una puntuación combinada de similitud + característica, aplica un umbral configurable para filtrar fragmentos de baja relevancia y observar los cambios en el prompt construido.

## Requisitos previos

- Video 2 completado
- Entorno con dependencias instaladas (`numpy`, `pandas`)

## Pasos (lista reproducible)

1. Abre `scripts/rerank_module.py` y revisa las funciones `combine(score, feature, w_sim, w_feat)` y `rerank`.
2. Ejecuta el reranker sobre resultados de recuperación simulados:
   ```bash
   python scripts/rerank.py --query "X" --k 10 --weights 0.8,0.2
   ```
3. Aplica un filtro por umbral:
   ```bash
   python scripts/rerank.py --query "X" --k 10 --weights 0.8,0.2 --threshold 0.35
   ```
4. Muestra la integración con el constructor de prompts y el efecto en el prompt final.
5. Experimenta cambiando el umbral y observa las diferencias en el orden de fragmentos y el contenido del prompt.

## Errores frecuentes y solución de problemas

- **NaN en combined_score**: sanitiza las entradas o usa valores por defecto.
- **El umbral filtra todos los fragmentos**: define un mínimo o usa como respaldo el fragmento top-1.
- **Incompatibilidad de esquema con el constructor de prompts**: asegura que las claves en los diccionarios de fragmentos sean correctas.

## Materiales

- `scripts/`: `rerank.py`, `rerank_module.py` y `retrieve_module.py`
- `requirements.txt`
- `notebooks/`: cuaderno de demo
- `assets/`: capturas y gráficos
- `verification_artifacts/`: salida esperada de la CLI
