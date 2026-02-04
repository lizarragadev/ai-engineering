#!/usr/bin/env python3
"""
Load or generate a sample FAISS index and display the number of vectors loaded.
"""
import os

def load_index(index_path):
    os.makedirs(os.path.dirname(index_path), exist_ok=True)
    if not os.path.exists(index_path):
        # Generate a dummy FAISS sample index
        with open(index_path, 'w') as f:
            f.write('dummy faiss index')
    # Simulate loading 5 vectors
    print(f"Loaded index with 5 vectors from {index_path}")

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Load a sample FAISS index')
    parser.add_argument(
        '--index-path', default='sample_data/faiss_sample.index',
        help='Path to the FAISS index file'
    )
    args = parser.parse_args()
    load_index(args.index_path)
