# Video 3: Construcción de prompts y respeto del presupuesto de tokens

**Duración estimada:** 15 min

**Objetivo:**
Montar los fragmentos recuperados (top-K) en una plantilla de prompt anclada, medir los tokens con tiktoken (o la utilidad proporcionada) y aplicar estrategias de truncado o selección para mantenerse dentro de un presupuesto de tokens objetivo.

## Requisitos previos

- Videos 1 y 2 completados
- Dependencias instaladas (`tiktoken`)

## Pasos (lista reproducible)

1. Abre `templates/prompt_template.txt` y revisa los marcadores (`{user_query}`, `{retrieved_chunks}`, `{provenance}`).
2. Ejecuta el contador de tokens:
   ```bash
   python scripts/count_prompt_tokens.py --query "X" --k 5 --budget 2048 --template templates/prompt_template.txt
   ```
3. Observa el total de tokens y la contribución por fragmento.
4. Demuestra la estrategia de truncado e imprime "Truncated to 3 chunks to meet budget 2048".
5. Envía el prompt construido al stub del LLM:
   ```bash
   python scripts/construct_and_call_stub.py --query "X" --k 5 --template templates/prompt_template.txt
   ```

## Errores frecuentes y solución de problemas

- Conteos de tokens inconsistentes: asegúrate de usar el mismo tokenizador que el LLM objetivo.
- Truncado excesivo: implementa un fallback solo de procedencia cuando se descarten fragmentos.
- Marcadores literales en la salida: comprueba que las claves de `.format()` coincidan con la plantilla.

## Materiales

- `scripts/`: módulo constructor de prompts y scripts de conteo/llamada
- `templates/`: plantilla del prompt
- `notebooks/`: cuaderno de demo opcional
- `assets/`: diagramas y capturas
- `verification_artifacts/`: conteo de tokens esperado, truncado y salida del stub
