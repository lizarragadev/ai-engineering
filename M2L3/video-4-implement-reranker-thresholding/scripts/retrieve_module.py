"""
Módulo de recuperación simulado para fines de demo.
"""

def retrieve(query, k):
    results = []
    for i in range(k):
        results.append({
            'source_id': f'doc{i}',
            'chunk_id': i,
            'score': round(1.0/(i+1), 4),
            'custom_feature': round(0.1 * i, 4),
            'text': f'Sample chunk text {i}'
        })
    return results
