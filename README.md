# NLP-Chatbot

## In bot1 Ordern:

    $ virtualenv <env_name>

    $ source <env_name>/bin/activate

    (<env_name>)$ pip install -r path/to/requirements.txt

### Train Model
    rasa train

### Installation
    python -m venv ./venv

    .\venv\Scripts\activate

    pip install -U --user pip

    pip install rasa

    rasa init

### Communication in CLI
    rasa shell

### running Rasa endpoints:
    .\venv\Scripts\activate
    
    rasa run actions
    
    rasa run --cors "*" --enable-api
    
    
## In bot1ui Ordern:

### install dependencies
    npm i
    
### run on localhost
    npm start
