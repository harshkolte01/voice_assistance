# Phase 2/3 testing and verification evidence

**Date:** 2026-08-31  
**Plan:** `PHASE_2_3_TESTING_AND_VERIFICATION_PLAN.md`  
**Commit tested:** `fba6b024b8b3edffcf6be20db4fe74e88c27b1a6` plus local uncommitted verification changes  
**Environment:** Windows, Python 3.12.2, PostgreSQL 17.4 + pgvector 0.8.2, Redis 8.10.1, native services (no Docker build)  
**Live API:** `http://127.0.0.1:8000` via uvicorn `--host 127.0.0.1 --port 8000` from `backend/`

## Files changed during verification

- `backend/app/websocket/gateway.py` — wait for cancelled gateway tasks; shield shutdown so a dropped socket can persist `disconnected` and allow reconnect.
- `backend/app/db/session.py` — explicit close on readiness ping connections.
- `backend/pyproject.toml` — `soak` pytest marker.
- Tests: `test_phase2_integration.py`, `test_phase2_resources_integration.py`, `test_phase3_acceptance.py`, `test_phase3_soak.py`, `voice_helpers.py`, `conftest.py`, `test_voice_gateway_integration.py`.

No React Native, Android, or container images were built.

## Stage A — Preflight

| Check | Result |
|---|---|
| `alembic current` | `0004_phase2_user_resources` (head) |
| Tables | `users`, `devices`, `auth_sessions`, `audit_logs`, `memories`, `tasks`, `voice_sessions`, `conversation_turns`, `alembic_version` |
| PK/FK/unique/check + indexes | Present for all Phase 2/3 tables |
| Live `GET /health` | 200 `{"status":"ok"}` |
| Live `GET /ready` | 200 postgres ok, redis ok |
| Stop native PostgreSQL/Redis for 503 branch | **NOT RUN** — this host’s PostgreSQL 17 also serves other local databases. Unit stubs in `test_api.py` cover `/health` 200 and `/ready` 503 for postgres-only and redis-only failures. |

## Automated results

| Suite | Result |
|---|---|
| `ruff check` / `ruff format --check` | Pass |
| `pytest tests -m "not integration"` | 18 passed |
| Integration (infra + Phase 2 + voice gateway + new acceptance) | 32 passed |
| Soak `RUN_SOAK_TESTS=1` | 1 passed in 14.76s (warm 10 + 200 turns + 50 connect/disconnect, run twice) |

Starlette TestClient `httpx` deprecation warning is present and tracked. SQLAlchemy non-checked-in connection `SAWarning` still appears on some TestClient WebSocket tests (`missing_or_invalid_credentials`, `logout_during_voice_session`). It did **not** appear in the soak run.

## Stage C/D — Phase 2

Automated coverage now includes the previous lifecycle/isolation suite plus:

- Concurrent refresh replay: exactly one 200 and one 401.
- Sibling session survives revoking another owned session.
- Foreign vs unknown IDs share `404` `RESOURCE_NOT_FOUND` on memories, tasks, sessions, device revoke, and auth-session revoke.
- Unauthenticated collection access is 401.

Live HTTP smoke (no tokens printed): register two users, login, `/auth/me`, memory create, cross-user GET 404.

**Phase 2 result: PASS** for backend HTTP/WebSocket identity isolation. Android secure-storage acceptance remains out of this plan’s scope.

## Stage E–H — Phase 3

Automated TestClient coverage added/verified:

- 100 sequential turns with unique turn/response IDs and matching persisted totals.
- Duplicate sequence close 1002.
- Truncated binary frame and unsupported protocol version close 1002.
- Turn-before-session and unknown control type.
- Inactive cancel does not complete-steal the current turn.
- Logout while `/v1/voice` is connected → `authentication_expired_or_revoked`, close 1008.
- Idle timeout and session timeout.
- Second connection to the same active session → `active_voice_connection_exists`, close 1008.
- Completed session and unknown `resume_session_id` → `session_not_available`, close 1008.
- Existing one-frame persist, gap, cancel, heartbeat, Redis TTL/owner cleanup.

Live uvicorn wire check (not TestClient):

- After a real socket drop, `GET /sessions` showed `disconnected`.
- Same-owner `resume_session_id` returned `server.session.ready` with `reconnect=true` and turn number 2.
- Starlette TestClient still cancels the WebSocket task on context exit, which can skip persistence; that path is **not** used as the reconnect acceptance evidence.

Not executed as automated tests:

- Ingress queue overflow (1013) with a deliberately slowed processor.
- Isolated maximum-turn-duration timeout (idle and session timeouts were tested).
- Stopping shared PostgreSQL/Redis under the live process.

## Stage I — Soak

Two passes in one process: 10 warm-up turns, 200 committed turns with periodic pings, 50 connect/disconnect cycles each pass. After each pass, no listed session remained `active`; the soaked session totals were 210 turns/frames. Soak did not emit the SQLAlchemy pool warning.

RSS / event-loop task charts were not sampled; this is a functional soak, not a full profiler run.

## Open defects

1. TestClient WebSocket teardown can cancel asyncpg pool close (`SAWarning` / `CancelledError`) — environment/test-client interaction, not reproduced on the live uvicorn reconnect path.
2. Queue overflow and isolated turn-duration timeout still lack dedicated tests.
3. Redis `dump.rdb` appeared in the repo root from the local Redis process; it is untracked and should stay untracked.

## Sign-off

| Field | Value |
|---|---|
| Phase 2 result | **PASS** |
| Phase 3 result | **CONDITIONAL PASS** |
| Commit tested | `fba6b024` + local verification changes |
| Test environment | Native PostgreSQL 17.4, Redis 8.10.1, Python 3.12.2, uvicorn `:8000` |
| Automated result | ruff pass; 18 unit; 32 integration; 1 soak pass |
| Soak result | PASS (functional repeated-turn + connect/disconnect; no RSS instrumentation) |
| Open defects | TestClient pool warning; queue overflow test; turn-duration-only test; no live postgres/redis kill |
| Evidence location | this file |
| Verified by/date | local verification 2026-08-31 |
