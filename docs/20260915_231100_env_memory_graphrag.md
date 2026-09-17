# Environment update for Phase 6 memory and GraphRAG G0 defaults

**Date:** 2026-09-15 23:11 IST  
**Work:** Update local `.env` and `.env.example` so Phase 6 hybrid RAG and GraphRAG G0 flags are present at the documented safe defaults.

## Why

The local `.env` only had Phase 3 voice, database, Redis, and JWT settings. It was missing STT, LLM, and Phase 6 memory settings that `.env.example` already defined. GraphRAG G0 flags from `GRAPHRAG_AND_FIXES_IMPLEMENTATION_PLAN.md` were also absent.

## Files edited

- `.env`
- `.env.example`

## What changed

Preserved existing local values: `DATABASE_URL`, `REDIS_URL`, JWT settings, host/port, and voice protocol limits.

Added from the current `.env.example` contract:

- Phase 4 STT remote/Windows/Whisper settings
- Phase 5 LLM settings
- `VOICE_DEFAULT_TIMEZONE=Asia/Kolkata`
- Phase 6 `EMBEDDING_API_URL`, `RERANK_API_URL`, `MEMORY_RETRIEVAL_MODE=off`, `MEMORY_WRITE_ENABLED=false`
- Commented optional embedding/rerank HTTP bounds

Added GraphRAG G0 defaults from the implementation plan, kept dark:

- `MEMORY_GRAPH_RETRIEVAL_MODE=off`
- `MEMORY_GRAPH_WRITE_ENABLED=false`
- `MEMORY_GRAPH_MAX_QUERY_ENTITIES=3`
- `MEMORY_GRAPH_MAX_EDGES_PER_ENTITY=10`
- `MEMORY_GRAPH_MAX_TRAVERSAL_DEPTH=2`
- `MEMORY_GRAPH_MAX_PATHS=20`
- `MEMORY_GRAPH_MAX_SOURCE_MEMORIES=10`
- `MEMORY_GRAPH_TIMEOUT_MS=50` (starting hypothesis; must be calibrated from PostgreSQL evidence)

`MEMORY_RETRIEVAL_MODE=off` remains the master retrieval-off switch. Embedding and rerank continue to reuse `STT_API_KEY`; no separate embedding/rerank keys were added.

## Notes

- `STT_API_KEY` and `LLM_API_KEY` are placeholders. Replace them with rotated local secrets before live STT/LLM/memory work.
- GraphRAG variables are present for the G0 contract. `backend/app/core/config.py` currently ignores unknown env keys, so these graph flags are inert until G0 settings are implemented in code.
