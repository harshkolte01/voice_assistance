# Voice Assistance Backend Startup Script
# Ensures backend reads ALL configuration from .env file only

$ErrorActionPreference = "Stop"

# Navigate to backend directory
Set-Location C:\Coding\voice_assistance\backend

# Use Python wrapper that clears environment variables before starting
C:\Coding\voice_assistance\.venv\Scripts\python.exe run_backend.py
