# Technical Notes & Troubleshooting - Video 3

## Common Errors

- **Inconsistent token counts**: ensure using the same model/tokenizer as the target LLM.
- **Over-truncation**: implement a provenance-only fallback to recover minimal grounding.
- **Literal placeholders**: check that `.format()` keys match the template placeholders.
