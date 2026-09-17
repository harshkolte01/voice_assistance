# Backend Environment Configuration Fix

**Date**: 2026-09-17 18:42
**Issue**: Backend was loading expired Cloudflare tunnel URLs from environment variables instead of `.env` file

## Root Cause

PowerShell environment variables (`$env:STT_API_URL`, etc.) were set with old values and taking precedence over `.env` file values. Pydantic Settings loads configuration in this priority order:

1. Environment variables (highest priority)
2. `.env` file
3. Default values (lowest priority)

## Solution

Created a Python wrapper script that:
1. Explicitly clears all configuration environment variables before loading settings
2. Ensures backend ONLY reads from `.env` file
3. Provides clean startup every time

## Files Modified

### 1. `backend/run_backend.py` (NEW)
Python wrapper that clears environment variables before starting uvicorn.

### 2. `scripts/start_backend.ps1` (UPDATED)  
Now uses the Python wrapper instead of directly calling uvicorn.

### 3. `backend/verify_config.py` (NEW)
Verification script to confirm backend is using correct `.env` values.

## How to Start Backend (Going Forward)

**Option 1: Using the startup script (Recommended)**
```powershell
.\scripts\start_backend.ps1
```

**Option 2: Using the Python wrapper directly**
```powershell
cd backend
..\\.venv\Scripts\python.exe run_backend.py
```

**Option 3: PowerShell new window**
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "C:\Coding\voice_assistance\scripts\start_backend.ps1"
```

## Verification

Run this to verify configuration:
```powershell
cd backend
..\\.venv\Scripts\python.exe verify_config.py
```

Expected output should show:
- `STT_API_URL: https://cleaning-trusts-campaign-headquarters.trycloudflare.com/v1/audio/transcriptions`
- `STT_API_KEY: stt_live_jgSoZf_VF9NP22uzycqds...`

## Environment Variables Cleared

The wrapper automatically clears these before starting:
- `STT_API_URL`
- `STT_API_KEY`
- `EMBEDDING_API_URL`
- `RERANK_API_URL`
- `LLM_API_KEY`
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET_KEY`

## Result

Backend now correctly:
- ✅ Loads all configuration from `.env` file
- ✅ Ignores inherited environment variables
- ✅ Uses current Cloudflare tunnel URL
- ✅ Uses correct STT API key
- ✅ No manual environment variable management needed
