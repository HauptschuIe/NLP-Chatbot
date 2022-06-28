# NLP-Chatbot

## In bot1 directory:

### install dependencies

    $ virtualenv <env_name>

    $ source <env_name>/bin/activate

    (<env_name>)$ pip install -r path/to/requirements.txt

### rasa installation

    .\venv\Scripts\activate

    pip install -U --user pip

    pip install rasa

    rasa init

### train model
    rasa train

### communication in CLI
    rasa shell

### running rasa endpoints:
    
    rasa run actions
    
    rasa run --cors "*" --enable-api
    
    
## in bot1ui directory:

### install dependencies
    npm i
    
### run on localhost
    npm start
