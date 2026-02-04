# Technical Notes & Troubleshooting - Video 1

## Common Errors

- **Missing dependency**: pip install error for faiss-cpu. Fix: install the compatible `faiss-cpu` wheel.
- **Environment variables not detected**: empty API key. Fix: export variables and re-source your shell.
- **Index dimension mismatch**: "dimension mismatch" error. Fix: verify index metadata or regenerate the index with matching dimensions.
