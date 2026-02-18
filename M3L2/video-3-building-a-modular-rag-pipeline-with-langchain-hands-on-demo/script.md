# Script: Construcción de un Pipeline RAG Modular con LangChain — Demo Práctica

1. Configurar entorno Python e instalar LangChain.
2. Instanciar un cliente LLM usando claves API de OpenAI.
3. Crear un PromptTemplate para consultas de recuperación.
4. Construir un Chain combinando el LLM y el Prompt para procesamiento multi-paso.
5. Añadir un Índice vectorial (ej., FAISS) para recuperación de documentos.
6. Integrar un Agente que habilite el uso de herramientas dinámicas (búsqueda, calculadora).
7. Ensamblar el pipeline RAG completo: recuperación → prompt → LLM → agente.
8. Probar el pipeline con una consulta de muestra y observar la salida.
9. Explicar brevemente la intercambiabilidad y extensibilidad de componentes.

**Puntos de Verificación:**
- Si tu pipeline devuelve respuestas relevantes a las consultas, tu configuración funciona.
- Si el código separa claramente los componentes de manera modular, seguiste las mejores prácticas.
