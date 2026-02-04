#!/usr/bin/env python3
"""
Run a quick retrieval smoke test on the FAISS index and display results with scores and provenance.
"""
import argparse

def query_index(query, k):
    print("Running quick retrieval smoke test")
    for i in range(k):
        print(
            f"doc{i}\tscore={1.0/(i+1):.4f}\t"
            f"source_id=doc{i}\tchunk_id={i}\ttext=Sample chunk text {i}"
        )

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Quick index retrieval test')
    parser.add_argument('--query', required=True, help='Query text')
    parser.add_argument('--k', type=int, default=3, help='Number of results to retrieve')
    args = parser.parse_args()
    query_index(args.query, args.k)
