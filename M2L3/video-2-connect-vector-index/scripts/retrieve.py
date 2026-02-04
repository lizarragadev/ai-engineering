#!/usr/bin/env python3
"""
CLI script to display retrieval results with provenance.
"""
import argparse
from retrieve_module import retrieve

def main():
    parser = argparse.ArgumentParser(description='Retrieve chunks with provenance')
    parser.add_argument('--query', required=True, help='Query text')
    parser.add_argument('--k', type=int, default=5, help='Number of results')
    args = parser.parse_args()
    print("Retrieval results:")
    for r in retrieve(args.query, args.k):
        print(r)

if __name__ == '__main__':
    main()
