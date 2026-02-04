"""
Módulo para reranking y filtrado por relevancia.
"""

def combine(score, feature=0.0, w_sim=0.8, w_feat=0.2):
    return w_sim * score + w_feat * feature

def rerank(results, weights=(0.8,0.2), threshold=None):
    w_sim, w_feat = weights
    ranked = []
    for r in results:
        feat = r.get('custom_feature', 0.0)
        combined = combine(r['score'], feat, w_sim, w_feat)
        r['combined_score'] = round(combined, 4)
        ranked.append(r)
    ranked.sort(key=lambda x: x['combined_score'], reverse=True)
    if threshold is not None:
        ranked = [r for r in ranked if r['combined_score'] >= threshold]
    return ranked
