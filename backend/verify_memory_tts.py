"""Verify memory and TTS configuration"""
import os

# Clear environment variables
for var in ["MEMORY_RETRIEVAL_MODE", "MEMORY_WRITE_ENABLED", "TTS_API_URL"]:
    if var in os.environ:
        del os.environ[var]

from app.core.config import Settings

settings = Settings()

print("=" * 70)
print("Memory and TTS Configuration")
print("=" * 70)
print()
print(f"MEMORY_RETRIEVAL_MODE: {settings.memory_retrieval_mode}")
print(f"MEMORY_WRITE_ENABLED: {settings.memory_write_enabled}")
print()
if hasattr(settings, "tts_api_url") and settings.tts_api_url:
    print(f"TTS_API_URL: {settings.tts_api_url}")
else:
    print("TTS_API_URL: Not configured")
print()
print("=" * 70)
