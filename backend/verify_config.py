"""Quick script to verify backend configuration matches .env file"""
import os
import sys

# Clear environment variables like the backend does
env_vars_to_clear = [
    "STT_API_URL", "STT_API_KEY", "EMBEDDING_API_URL", 
    "RERANK_API_URL", "LLM_API_KEY"
]
for var in env_vars_to_clear:
    if var in os.environ:
        del os.environ[var]

# Now load settings - should come from .env only
from app.core.config import Settings

settings = Settings()

print("=" * 70)
print("Backend Configuration Verification")
print("=" * 70)
print()
print(f"STT_ENGINE: {settings.stt_engine}")
print(f"STT_API_URL: {settings.stt_api_url}")
if settings.stt_api_key:
    key_str = settings.stt_api_key.get_secret_value()
    print(f"STT_API_KEY: {key_str[:30]}...")
else:
    print("STT_API_KEY: Not set")
print()

# Extract just the hostname for clarity
from urllib.parse import urlsplit
url_host = urlsplit(settings.stt_api_url).netloc
print(f"STT Endpoint Host: {url_host}")
print()

expected_host = "cleaning-trusts-campaign-headquarters.trycloudflare.com"
if expected_host in url_host:
    print("✓ CORRECT: Using current Cloudflare tunnel URL")
elif "skin-technologies-strategies-membership" in url_host:
    print("✗ ERROR: Using EXPIRED Cloudflare tunnel URL")
    print("  Backend needs to be restarted with clean environment!")
else:
    print(f"? UNKNOWN: Unexpected hostname: {url_host}")

print("=" * 70)
