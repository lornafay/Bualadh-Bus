import traceback
import pandas as pd
import requests
import json

class API:
    def __init__(self, credentials, name):
        """Initializes api url , file name as instance variables"""
        self.credentials = credentials
        self.name=name

    def API_Tester(self):
        """scrapes data from dublin bike api and convert it into json and load it in to bike.text file"""
        URL = self.credentials
        API_data = requests.get(URL)
        D_API = json.loads(API_data.text)
        df=pd.json_normalize(D_API)
        file_name=self.name +'.csv'
        try:
            with open(file_name,'a') as fd:
                df.to_csv(fd)
        except:
            print(traceback.format_exc())

credentials= input('Enter URL: ')
name = input('Enter file Name: ')
a = API(credentials , name)
a.API_Tester()

