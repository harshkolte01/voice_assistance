# Completed-turn latency summary

Date: 2026-09-14 23:58 IST

## Work done

Implemented a completed-turn latency report in the format requested:

- STT, Embedding, Rerank, RAG total, LLM TTFT, LLM total, TTS, TOTAL
- `n/a` when a stage did not run (for example memory retrieval off)
- `Largest:` top three stage contributors
- Live print in the uvicorn JSON log (`event=voice.turn.latency.summary`)
- Live append-only files `logs/latency_summary.txt` and `logs/latency_summary.jsonl`

This is written after each terminal turn (completed, failed, or cancelled), not as partial dated transcript lines.

## Files edited

- `backend/app/services/latency_summary.py` (added)
- `backend/app/services/conversation_logging.py` — `embedding`, `rerank`, `rag_total` on `latency_ms`
- `backend/app/websocket/gateway.py` — capture RAG stage times, print/write summary, add `duration_ms` on completion traces
- `backend/tests/test_latency_summary.py` (added)
- `backend/tests/test_conversation_timing.py`
- `.gitignore` — ignore summary files

## How to view it

Start the backend from `backend\`, speak one turn, then open:

- Terminal: look for `voice.turn.latency.summary`
- File: `C:\Coding\voice_assistance\backend\logs\latency_summary.txt`

Event-level JSONL remains at `logs/latency_trace.jsonl`. Conversation diary files under `conversation_logs\` now also receive the extra `latency_ms` fields when conversation logging is enabled.
