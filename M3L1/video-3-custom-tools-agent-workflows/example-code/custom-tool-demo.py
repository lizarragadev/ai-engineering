#!/usr/bin/env python3
"""
Demo: Diseñar e integrar una herramienta personalizada en un flujo de trabajo de agente.
"""
import json
import argparse
import os

# Obtener el directorio donde está este script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DATA_PATH = os.path.join(SCRIPT_DIR, "..", "sample-data", "mock-data.json")

def fetch_inventory(product_sku: str, filepath: str = None):
    """
    Herramienta personalizada: obtiene datos simulados por SKU desde un archivo JSON.

    NOTA: Esto es un mock/demo (no producción).
    """
    if filepath is None:
        filepath = DEFAULT_DATA_PATH
    
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        if product_sku not in data:
            return f"No se encontró una entrada para el SKU: {product_sku}"

        return data[product_sku]

    except Exception as e:
        return f"Error al obtener datos: {e}"


class AgentWithTool:
    def __init__(self, tools: dict):
        self.tools = tools

    def run(self, key: str):
        print("Pensamiento del agente: obteniendo datos para la clave:", key)

        result = self.tools["fetch_mock_data"](key)

        print("Acción del agente: fetch_mock_data ->", result)
        print("Respuesta final:", result)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Demo: flujo de agente con herramienta personalizada."
    )
    parser.add_argument(
        "--key",
        type=str,
        required=True,
        help="Clave o SKU a buscar en los datos simulados."
    )
    args = parser.parse_args()

    # Nota: mantenemos la key 'fetch_mock_data' para que el print salga como en tu captura
    tools = {"fetch_mock_data": fetch_inventory}

    agent = AgentWithTool(tools)
    agent.run(args.key)