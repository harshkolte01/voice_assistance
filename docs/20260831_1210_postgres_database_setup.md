# Local Postgres database setup

**Date:** 2026-08-31 ~12:10 IST

## What was done

Configured local PostgreSQL so the FastAPI backend can connect and migrate.

## Files edited

- `.env` — set `DATABASE_URL` to the local `postgres` user and `voice_assistance` database on `localhost:5432`. The password is stored only in this ignored file, not in git or this record.

## Database work

- Created PostgreSQL database `voice_assistance` on the existing native PostgreSQL 17.4 service.
- Compiled official pgvector `v0.8.2` from source and installed it into PostgreSQL 17 (`vector.dll` plus extension files). Enabled `CREATE EXTENSION vector` (version 0.8.2).
- Ran Alembic from `backend/` to head: `0004_phase2_user_resources`.

## Tables now present

`alembic_version`, `audit_logs`, `auth_sessions`, `conversation_turns`, `devices`, `memories`, `tasks`, `users`, `voice_sessions`.

## Not changed

No application source files were modified. `.env.example` was left as a placeholder file.
