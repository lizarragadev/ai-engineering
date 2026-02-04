"""
Módulo de recuperación simulado para la demo de caché.
"""

def retrieve(query, k):
    results = []
    texts = ['dup text', 'dup text', 'unique text'] + [f'Sample {i}' for i in range(3, k)]
    for i, text in enumerate(texts[:k]):
        results.append({
            'source_id': f'doc{i}',
            'chunk_id': i,
            'score': 1.0/(i+1),
            'text': text
        })
    return results
