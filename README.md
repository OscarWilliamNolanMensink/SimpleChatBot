# Project goal
Show that I can work front end and backend within a short span of time.

# Prerequisites

1. Install **Python** on your computer (needed for `py` commands).
2. Download the model weights (this may take **20 minutes – 2 hours**, depending on your internet speed). In a terminal, run:
   ```bash
   cd zephyr-server
   py -m pip install huggingface_hub
   py -c "from huggingface_hub import snapshot_download; snapshot_download(repo_id='HuggingFaceH4/zephyr-7b-beta', local_dir='hf-cache/zephyr', local_dir_use_symlinks=False)"
3. Verify that the file exists: "zephyr-server/hf-cache/zephyr/model-00001-of-00008.safetensors" (There should be more than this one as well).
4. Follow the steps for running from the zip file.

# Run project
1. Make sure you have **Docker** running on your computer.
2. At the root of this project, run one of the following:

   - **Using GPU**:  
     ```bash
     docker compose up --build --profile api-gpu chatbot
     ```

   - **Using CPU**:  
     ```bash
     docker compose up --build --profile api chatbot
     ```

# Running for FE development
1. Ensure the ai is running locally (Preferably GPU its way faster):
 - **Using GPU**:  
     ```bash
     docker compose up --build --profile api-gpu
     ```

   - **Using CPU**:  
     ```bash
     docker compose up --build --profile api
     ```
2. ```bash
      cd chatbot
      npm run dev
     ```

# Coder Rabble
## Pre-project notes
- Never worked with an AI before this should be fun.
- Love that a company asked me to do a task instead of an interview first.
- Dislike that I was given the details to create it at 12:00 on Friday and expected to deliver before 12:00 Monday. ( My weekend and monday is fully booked ).

## Post-project notes
- Finding a publicly available ai took 4 hours as I could not find out how to tell if one is public or not without first downloading them and waiting to see if I neeed to make a token or not. 4hrs lost. Maybe I am just dumb, but was happy when I finally found one.
- 4- 6hrs later we have this current version of the project
- I am probably going to continue improving this project over the next few days and try to host it through AWS, albeit the fear that it will be super slow without me paying a lot to run it on a better server with a graphics card, if that is even possible.
- I still have yet to find if there are other ways to interact with the ai other than chat. More research needed.

## Future goals
- Create similar front end in an Angular app.
- Create a better interface.
- Allow deletion of history.
- Create possibility to make standard statements that the ai must assume before answering new questions.
- Decide on a more formal structure for components incase this project decides to grow further.
- Alternatively create a model puller to store in a docker volume instead.
