# Video 2: El framework de prompting ReAct — Notas de grabacion

## Tiempos sugeridos y puntos clave
- **0:00–1:00:** Definir el framework ReAct y su motivacion
- **1:00–2:00:** Ilustrar el ciclo de trabajo (Pensar → Actuar → Observar → Repetir)
- **2:00–3:00:** Anotar la arquitectura del prompt
- **3:00–6:30:** Recorrido de la implementacion del agente ReAct
- **6:30–8:00:** Demo en vivo con entrada de muestra
- **8:00–8:45:** Discutir buenas practicas y errores comunes
- **8:45–9:00:** Resumen y transicion a herramientas personalizadas

## Notas de grabacion
- Resaltar secciones del prompt con llamadas de atencion
- Mostrar codigo y salidas en paralelo
- Agregar subtitulos para la salida del terminal
- Mantener un ritmo moderado para la comprension

## Puntos de verificacion
- El agente alterna pasos de razonamiento y accion con salidas intermedias
- La respuesta final coincide con el resultado esperado para una consulta de varios pasos

## Errores comunes y soluciones
- **El agente no alterna razonamiento/accion:** Verificar el formato del prompt
- **La herramienta no se invoca durante el paso de accion:** Confirmar el registro de la herramienta en el codigo
- **Salidas inesperadas o alucinadas:** Refinar la claridad y especificidad del prompt

