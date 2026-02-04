"""
Capa de caché simple basada en archivos con TTL usando almacenamiento JSON.
"""
import os, json, time

class Cache:
    def __init__(self, path='cache_store.json', ttl=3600):
        self.path = path
        self.ttl = ttl
        self.store = {}
        if os.path.exists(path):
            with open(path, 'r') as f:
                self.store = json.load(f)

    def get(self, key):
        entry = self.store.get(key)
        if entry and time.time() - entry['ts'] < self.ttl:
            print('cache hit')
            return entry['value']
        print('cache miss')
        return None

    def set(self, key, value):
        self.store[key] = {'ts': time.time(), 'value': value}
        with open(self.path, 'w') as f:
            json.dump(self.store, f)
