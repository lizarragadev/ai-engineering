#!/usr/bin/env python3
"""
Script CLI para reranking y umbralado.
"""
import argparse
from rerank_module import rerank
from retrieve_module import retrieve

def main():
    parser = argparse.ArgumentParser(description='CLI del reranker de relevancia')
    parser.add_argument('--query', required=True, help='Texto de la consulta')
    parser.add_argument('--k', type=int, default=10, help='Número de fragmentos a recuperar')
    parser.add_argument('--weights', default='0.8,0.2', help='Pesos w_sim,w_feat')
    parser.add_argument('--threshold', type=float, default=None, help='Umbral de relevancia')
    args = parser.parse_args()
    w_sim, w_feat = map(float, args.weights.split(','))
    res = retrieve(args.query, args.k)
    ranked = rerank(res, weights=(w_sim, w_feat), threshold=args.threshold)
    print('Resultados rerankeados:')
    for r in ranked:
        print(r)

if __name__ == '__main__':
    main()
