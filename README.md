# Prerequisits using the fork

1. Have docker running on your device
2. Have python installed in your computer (for py commmands)
3. Download the data model (hf-cache) 20min - 2hrs depending on your internet speed. In a terminal:
```
    cd zephyr-server
    py -m pip install huggingface_hub
    py -c "from huggingface_hub import snapshot_download; snapshot_download(repo_id='HuggingFaceH4/zephyr-7b-beta', local_dir='hf-cache/zephyr', local_dir_use_symlinks=False)"
```
4. Check if ``` zephyr-server\hf-cache\zephyr\model-00001-of-00008.safetensors ``` exists.

# Running from zipfile 
1. Have docker running on your computer
2. At the root of this project call
    For running through your GPU call ```docker compose up --build --profile api-gpu chatbot```
    Or run through your CPU call      ```docker compose up --build --profile api chatbot```


# PowerShell:
