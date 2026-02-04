#!/usr/bin/env python3
"""
Count tokens of the constructed prompt and display totals and truncation info.
"""
import argparse
from prompt_constructor import construct_prompt

def main():
    parser = argparse.ArgumentParser(description='Count tokens of the constructed prompt')
    parser.add_argument('--query', required=True, help='Query text')
    parser.add_argument('--k', type=int, default=5, help='Number of chunks to include')
    parser.add_argument('--budget', type=int, default=2048, help='Token budget')
    parser.add_argument('--template', required=True, help='Path to the prompt template file')
    args = parser.parse_args()
    # Example chunks
    chunks = [{'source_id': f'doc{i}', 'chunk_id': i, 'text': f'Sample chunk text {i}'} for i in range(args.k)]
    prompt, total, truncated, k_used = construct_prompt(
        args.query, chunks, args.budget, args.template
    )
    print(f"Total tokens: {total}")
    if truncated:
        print(f"Truncated to {k_used} chunks to meet budget {args.budget}")
    print(prompt)

if __name__ == '__main__':
    main()
