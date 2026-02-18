# Script: Refactorización de un Proyecto RAG Legacy con LangChain — Tutorial Guiado

1. Revisar la estructura del proyecto legacy; identificar puntos de dolor como código fuertemente acoplado y falta de modularidad.
2. Mapear componentes legacy a abstracciones de LangChain: LLM, Prompt, Chain, Index, Agent.
3. Refactorización paso a paso:
   - Extraer lógica de prompt en PromptTemplates.
   - Reemplazar llamadas directas al LLM con la interfaz LLM de LangChain.
   - Modularizar recuperación con Indexes.
   - Componer Chains para lógica multi-paso.
   - Integrar Agent para herramientas dinámicas.
4. Comparar organización y legibilidad del código antes y después.
5. Ejecutar pipeline refactorizado; validar salidas correctas.
6. Discutir mantenibilidad, extensibilidad y mejores prácticas.
7. Resumir dificultades típicas y cómo evitarlas.

**Puntos de Verificación:**
- Si el código refactorizado separa componentes y se ejecuta de extremo a extremo, la refactorización es exitosa.
- Si el README documenta claramente la arquitectura y decisiones, estás listo para producción.
