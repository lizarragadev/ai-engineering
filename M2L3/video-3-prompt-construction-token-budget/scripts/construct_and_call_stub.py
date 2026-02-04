#!/usr/bin/env python3
"""
Construct a prompt and simulate an LLM stub call.
"""
import argparse
from prompt_constructor import construct_prompt

def call_stub(prompt):
    return "[LLM-STUB RESPONSE] Simulated stub result based on the prompt."

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Construct prompt and call LLM stub')
    parser.add_argument('--query', required=True, help='Query text')
    parser.add_argument('--k', type=int, default=5, help='Number of chunks to include')
    parser.add_argument('--budget', type=int, default=2048, help='Token budget')
    parser.add_argument('--template', required=True, help='Path to the prompt template file')
    args = parser.parse_args()
    chunks = [{'source_id': f'doc{i}', 'chunk_id': i, 'text': f'Sample chunk text {i}'} for i in range(args.k)]
    prompt, total, truncated, k_used = construct_prompt(
        args.query, chunks, args.budget, args.template
    )
    print("Constructed Prompt:\n", prompt)
    response = call_stub(prompt)
    print("LLM Stub Response:\n", response)
