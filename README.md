# Prerequisits

1. Have docker running on your device




# PowerShell:
docker run --rm -p 8000:8000 `
  -e LOCAL_ONLY=true `
  -e LOCAL_MODEL_DIR=/app/hf-cache/mistral `
  -v "$PWD\hf-cache:/app/hf-cache" `
  mistral-server