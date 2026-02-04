"""
Retrieval module with provenance.
"""

def retrieve(query, k):
    results = []
    for i in range(k):
        results.append({
            'source_id': f'doc{i}',
            'chunk_id': i,
            'score': round(1.0/(i+1), 4),
            'text': f'Sample chunk text {i} for query "{query}"'
        })
    return results
