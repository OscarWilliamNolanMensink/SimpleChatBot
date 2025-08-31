FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

# local HF cache (speeds up restarts)
ENV HF_HOME=/app/hf-cache
ENV HUGGINGFACE_HUB_CACHE=/app/hf-cache

# ensure no tokens are used inside container
ENV HUGGINGFACE_HUB_TOKEN=
ENV HF_TOKEN=

ENV MODEL_ID=HuggingFaceH4/zephyr-7b-beta
ENV LOAD_IN_4BIT=false

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
