# Video 1: Inicio rápido de entorno y repositorio base: configuración, dependencias e índice de ejemplo

**Duración estimada:** 12 min

**Objetivo:**
Tener un entorno local y un repositorio base funcionando: instalar dependencias, configurar claves API (o elegir sandbox) y cargar el índice FAISS de ejemplo para que un comando básico de recuperación devuelva resultados.

## Requisitos previos

- Python 3.8+ y pip
- git
- Acceso a terminal
- Repositorio base y índice FAISS de ejemplo proporcionados por el instructor (o stub LLM en sandbox)

## Pasos (lista reproducible)

1. Clona el repositorio base y comprueba que ves el README del proyecto:
   ```bash
   git clone <starter-repo-url>
   cd <repo-root>
   ls
   ```
2. Crea un entorno virtual e instala las dependencias:
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # En Windows: .venv\\Scripts\\activate
   pip install -r requirements.txt
   ```
3. Configura las variables de entorno: API_KEY o modo sandbox:
   ```bash
   export API_KEY=<tu_api_key>
   # o
   export RAG_LLM_MODE=sandbox
   ```
4. Carga el índice FAISS de ejemplo:
   ```bash
   python scripts/load_sample_index.py
   ```
5. Ejecuta una prueba rápida de recuperación:
   ```bash
   python scripts/query_index.py --query "test" --k 3
   ```

## Errores frecuentes y solución de problemas

- **Dependencia faltante** → fallo en pip install: prueba instalando `faiss-cpu` o verifica tu entorno Python.
- **Variables de entorno no detectadas** → API key en blanco: exporta las variables y vuelve a cargar tu shell (re-source).
- **Incompatibilidad de dimensiones del índice** → verifica los metadatos del índice o regenera el índice con dimensiones coincidentes.

## Materiales

- `scripts/`: `load_sample_index.py` y `query_index.py`
- `requirements.txt`
- `notebooks/`: Cuaderno de ejemplo para la configuración
- `assets/`: Diapositivas y capturas de terminal
- `verification_artifacts/`: Salida esperada de la CLI
