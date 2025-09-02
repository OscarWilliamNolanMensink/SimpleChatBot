# Prerequisits using the fork

# Prerequisites (using the fork)

1. Install **Python** on your computer (needed for `py` commands).
2. Download the model weights (this may take **20 minutes – 2 hours**, depending on your internet speed). In a terminal, run:
   ```bash
   cd zephyr-server
   py -m pip install huggingface_hub
   py -c "from huggingface_hub import snapshot_download; snapshot_download(repo_id='HuggingFaceH4/zephyr-7b-beta', local_dir='hf-cache/zephyr', local_dir_use_symlinks=False)"
3. Verify that the file exists: "zephyr-server/hf-cache/zephyr/model-00001-of-00008.safetensors" (There should be more than this one as well).
4. Follow the steps for running from the zip file.


# Running from zipfile 
1. Unpack the zipfile
2. Make sure you have **Docker** running on your computer.
3. At the root of this project, run one of the following:

   - **Using GPU**:  
     ```bash
     docker compose up --build --profile api-gpu chatbot
     ```

   - **Using CPU**:  
     ```bash
     docker compose up --build --profile api chatbot
     ```

