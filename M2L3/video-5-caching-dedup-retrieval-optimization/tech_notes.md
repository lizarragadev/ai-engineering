# Technical Notes & Troubleshooting - Video 5

## Common Errors

- Cache growing unbounded: configure TTL and prune policy.
- Deduplication failing on near-duplicates: normalize text before hashing.
- Stale data returned: include index version in cache fingerprint.
