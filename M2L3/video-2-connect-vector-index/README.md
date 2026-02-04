# Video 2: Conectar al índice vectorial y recuperar los K fragmentos principales con trazabilidad

**Duración estimada:** 12 min

**Objetivo:**
Demostrar el uso del módulo de recuperación para consultar un índice, inspeccionar los K fragmentos principales con metadatos de trazabilidad (source_id, chunk_id, score) y verificar la compatibilidad de dimensiones de los embeddings.

## Requisitos previos

- Video 1 completado con un índice cargado
- Entorno virtual activado con las dependencias instaladas

## Pasos (lista de comprobación reproducible)

1. Abrir el código del módulo de recuperación y revisar la firma de la función `retrieve(query, k)`; confirmar que devuelve `source_id`, `chunk_id`, `score` y `text`.
2. Ejecutar:
   ```bash
   python scripts/retrieve.py --query "How to rotate a key?" --k 5
   ```
3. Verificar que las dimensiones del embedding coincidan con el índice:
   ```bash
   python -c "from embeddings import get_dim; print(get_dim())"
   ```
4. Inspeccionar la trazabilidad de un fragmento devuelto (source_id y chunk_id).
5. Demostrar el manejo de errores consultando con una query mal formada o con el archivo de índice ausente.

## Errores frecuentes y solución de problemas

- Resultados vacíos → comprobar la ruta correcta del índice o recargar el índice.
- Incompatibilidad de dimensiones del embedding → regenerar los embeddings o usar un índice compatible.
- Campos de trazabilidad faltantes → verificar que el proceso de ingestión haya preservado los metadatos de trazabilidad.

## Materiales

- `scripts/`: `retrieve.py`, `retrieve_module.py` y `embeddings.py`
- `requirements.txt`
- `notebooks/`: cuaderno de demostración
- `assets/`: diagrama de arquitectura y captura de terminal
- `verification_artifacts/`: salida esperada de la CLI
- `sample_data/`: datos del corpus fragmentado y metadatos
