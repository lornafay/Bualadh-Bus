# libs for mysql connect
from sqlalchemy import create_engine
import json
import os


class Query:
    def __init__(self):
        # create string of path to credentials file (in Bualadh-Bus/ directory)
        home_path=os.path.normpath(os.getcwd() + os.sep + os.pardir)
        path_to_credentails= home_path+"\\BUALADH-BUS\\app\\django\\core\\"

        # open credentials.json with path just created
        with open(f'{path_to_credentails}credentials.json', 'r', encoding="utf8") as credentials_file:
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
