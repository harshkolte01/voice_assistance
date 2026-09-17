"""
Backend startup wrapper that ensures clean environment.
Only .env file values are used, no inherited environment variables.
"""
import os
import sys

# List of environment variables that should NOT override .env file
ENV_VARS_TO_CLEAR = [
    "STT_API_URL",
    "STT_API_KEY",
    "EMBEDDING_API_URL",
    "RERANK_API_URL",
    "LLM_API_KEY",
    "DATABASE_URL",
    "REDIS_URL",
    "JWT_SECRET_KEY",
]

# Clear any existing environment variables that might override .env
cleared = []
for var in ENV_VARS_TO_CLEAR:
    if var in os.environ:
        del os.environ[var]
        cleared.append(var)

if cleared:
    print(f"✓ Cleared {len(cleared)} environment variable(s): {', '.join(cleared)}")
    print("  Backend will read these from .env file instead.")
    print()

print("=" * 60)
print("Starting Voice Assistance Backend")
print("=" * 60)
print(f"Configuration loaded from: .env file")
print(f"Working directory: {os.getcwd()}")
print("=" * 60)
print()

# Now start uvicorn with clean environment
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
