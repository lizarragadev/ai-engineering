# Technical Notes & Troubleshooting - Video 2

## Common Errors

- **Empty results**: no chunks returned. Fix: confirm index path or reload the index.
- **Dimension mismatch**: exception "Index dimension does not match vectors." Fix: regenerate embeddings or use a matching index.
- **Missing provenance fields**: returned dict lacks metadata. Fix: ensure ingestion process preserved provenance mapping.
