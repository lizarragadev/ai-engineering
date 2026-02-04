#!/usr/bin/env python3
"""
Ejecuta una consulta de recuperación con caché y deduplicación.
"""
import argparse, hashlib
from utils.cache import Cache
from retrieve_module import retrieve

CACHE = Cache()

def fingerprint(query, k, weights):
    s = f"{query}|{k}|{weights}"
    return hashlib.md5(s.encode()).hexdigest()

def dedupe(chunks):
    seen = set()
    unique = []
    for c in chunks:
        h = hashlib.md5(c['text'].strip().lower().encode()).hexdigest()
        if h not in seen:
            seen.add(h)
            unique.append(c)
    removed = len(chunks) - len(unique)
    print(f"Removed {removed} duplicate chunks")
    return unique

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Cached query with deduplication')
    parser.add_argument('--query', required=True, help='Query text')
    parser.add_argument('--k', type=int, default=5, help='Number of chunks to retrieve')
    parser.add_argument('--weights', default='0.8,0.2', help='Weights to invalidate cache')
    args = parser.parse_args()
    key = fingerprint(args.query, args.k, args.weights)
    result = CACHE.get(key)
    if result is None:
        chunks = retrieve(args.query, args.k)
        CACHE.set(key, chunks)
        data = chunks
    else:
        data = result
    # Deduplicar fragmentos duplicados
    data = dedupe(data)
    for c in data:
        print(c)
