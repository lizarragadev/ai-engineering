"""Pipeline RAG legacy basado en scripts."""

from typing import List


def load_documents(path: str) -> List[str]:
    # Cargar documentos desde archivos
    docs = []
    for filename in ['doc1.txt', 'doc2.txt']:
        with open(f'sample-data/{filename}', 'r') as f:
            docs.append(f.read())
    return docs


def simple_search(query: str, docs: List[str]) -> List[str]:
    # Recuperación básica basada en palabras clave
    return [doc for doc in docs if query.lower() in doc.lower()]


def legacy_rag(query: str):
    docs = load_documents('sample-data/')
    retrieved = simple_search(query, docs)
    # Marcador de posición para llamada LLM directa
    return f"Respuesta a '{query}' con contexto: {retrieved}"

if __name__ == '__main__':
    print(legacy_rag('¿Qué es LangChain?'))
