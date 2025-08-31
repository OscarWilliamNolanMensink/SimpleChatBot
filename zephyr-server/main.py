import os
from typing import List, Literal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_ID = os.getenv("MODEL_ID", "HuggingFaceH4/zephyr-7b-beta")
LOAD_IN_4BIT = os.getenv("LOAD_IN_4BIT", "false").lower() == "true"

# Optional: offline controls
LOCAL_ONLY = os.getenv("LOCAL_ONLY", "false").lower() == "true"
LOCAL_MODEL_DIR = os.getenv("LOCAL_MODEL_DIR")  # e.g. "/app/hf-cache/zephyr"

app = FastAPI(title="Zephyr 7B Beta API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten later
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    max_new_tokens: int = 256
    temperature: float = 0.7
    top_p: float = 0.95

def resolve_model_source() -> str:
    if LOCAL_MODEL_DIR and os.path.isdir(LOCAL_MODEL_DIR):
        print(f"Loading model from LOCAL_MODEL_DIR={LOCAL_MODEL_DIR}")
        return LOCAL_MODEL_DIR
    print(f"Loading model from hub id: {MODEL_ID} (LOCAL_ONLY={LOCAL_ONLY}, 4bit={LOAD_IN_4BIT})")
    return MODEL_ID

load_kwargs = {}
if torch.cuda.is_available():
    if LOAD_IN_4BIT:
        load_kwargs.update(dict(
            load_in_4bit=True,          # requires bitsandbytes (GPU)
            device_map="auto",
            bnb_4bit_compute_dtype=torch.bfloat16,
        ))
    else:
        load_kwargs.update(dict(
            device_map="auto",
            torch_dtype=torch.bfloat16,
        ))
else:
    load_kwargs.update(dict(
        device_map={"": "cpu"},
        torch_dtype=torch.float32
    ))

common_from_pretrained_kwargs = {
    "token": None,              # force NO token usage
    "local_files_only": LOCAL_ONLY,
    "trust_remote_code": False,
}

model_src = resolve_model_source()
tokenizer = AutoTokenizer.from_pretrained(model_src, **common_from_pretrained_kwargs)
model = AutoModelForCausalLM.from_pretrained(model_src, **common_from_pretrained_kwargs, **load_kwargs)
EOS = tokenizer.eos_token_id

def render_chat(messages: List[ChatMessage]) -> str:
    msgs = [{"role": m.role, "content": m.content} for m in messages]
    return tokenizer.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True)

@app.post("/chat")
def chat(req: ChatRequest):
    prompt = render_chat(req.messages)
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    with torch.no_grad():
        out = model.generate(
            **inputs,
            max_new_tokens=req.max_new_tokens,
            temperature=req.temperature,
            top_p=req.top_p,
            do_sample=True,
            eos_token_id=EOS,
            pad_token_id=EOS,
        )
    gen_ids = out[0][inputs["input_ids"].shape[-1]:]
    text = tokenizer.decode(gen_ids, skip_special_tokens=True).strip()
    return {"reply": text}
