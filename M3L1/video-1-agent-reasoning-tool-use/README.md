# Video 1: Razonamiento del agente y uso de herramientas — Notas de grabacion

## Tiempos sugeridos y puntos clave
- **0:00–0:30:** Introducir pipelines estaticos vs razonamiento del agente
- **0:30–1:30:** Definir agentes de IA y comparar con pipelines LLM
- **1:30–2:30:** Explicar la importancia del razonamiento en agentes
- **2:30–3:30:** Demostrar invocacion de herramientas (calculadora)
- **3:30–5:00:** Recorrido de ejemplo real de multiples pasos
- **5:00–5:45:** Demo en vivo: razonamiento, accion, observacion, respuesta
- **5:45–6:00:** Resumen y transicion al framework ReAct

## Notas de grabacion
- Usar diagramas animados para la comparacion pipeline vs agente
- Hacer zoom en secciones criticas del codigo; mantener el puntero visible
- Resaltar salidas de codigo para claridad
- Mantener narracion estable y profesional
- Asegurar que los subtitulos sean precisos y esten sincronizados

## Puntos de verificacion
- El agente produce razonamiento intermedio e invoca la herramienta de calculadora
- La respuesta final calculada coincide con el resultado esperado

## Errores comunes y soluciones
- **ModuleNotFoundError: No module named 'openai'**: Instalar dependencias (`pip install openai`)
- **Tool function not found**: Verificar que la funcion `calculator` este definida e importada correctamente

