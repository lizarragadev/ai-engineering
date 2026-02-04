# Notas técnicas y solución de problemas - Video 4

## Errores frecuentes

- **NaN en combined_score**: sanitiza las entradas o usa como respaldo la puntuación de similitud.
- **El umbral elimina todo**: ajusta el umbral o usa como respaldo al menos un fragmento.
- **Incompatibilidad de esquema**: verifica que las claves del diccionario de fragmentos coincidan con lo que espera el constructor de prompts.
