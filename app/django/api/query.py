# libs for mysql connect
from sqlalchemy import create_engine
import json
import os


class Query:
    def __init__(self):
        # create string of path to credentials file (in Bualadh-Bus/ directory)
        base = os.path.abspath('.')
        path_to_credentails=os.path.join(base ,"app","django","credentials.json")
        

        # open credentials.json with path just created
        with open(path_to_credentails, 'r', encoding="utf8") as credentials_file:
            credentials = json.load(credentials_file)

        # Connects to remote database
        self.user = 'admin'
        self.password = credentials["db"]["pwd"]
        self.host = credentials["db"]["host"]
        self.port = credentials["db"]["port"]

    def get_engine(self, schema):
        db = schema
        # Connection
        return create_engine(f"mysql+pymysql://{self.user}:{self.password}@{self.host}:{self.port}/{db}", echo=True)
