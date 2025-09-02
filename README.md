# Prerequisits using the fork

1. Have docker running on your device
2. Have python installed in your computer (for py commmands)
3. Download the data model (hf-cache) 20min - 2hrs depending on your internet speed.
```
    py -m pip install huggingface_hub
    py -c "from huggingface_hub import snapshot_download; snapshot_download(repo_id='HuggingFaceH4/zephyr-7b-beta', local_dir='hf-cache/zephyr', local_dir_use_symlinks=False)"
```
# Prerequisits using the Zip file

1. Have docker running on your computer
2. Call docker compose up


# PowerShell:
