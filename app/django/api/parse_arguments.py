# from .query import Query
import pandas as pd

class Parse_arguments():
    def __init__(self, date_time, beginningstop, endingstop):
        self.date_time = date_time
        self.beginningstop = beginningstop
        self.endingstop = endingstop

    def parse_date(self):
        # parse time into standard Dublin time
        # df = pd.DataFrame({'date_time': [self.date_time]}) 
        # df.date_time = pd.to_datetime(df.date_time)
        # df.date_time = df.date_time.dt.tz_convert('Europe/Dublin')
        # return df.date_time

        # dummy value
        dummy_value = pd.to_datetime('2022-07-23T12:00:00.000Z')
        return dummy_value
    
    def extract_day_of_week(self):
        # dummy value
        dummy_value = str('Saturday')
        return dummy_value
    
    def transform_to_forecast_date(self):
        # dummy value
        dummy_value = pd.to_datetime('2022-07-23T06:00:00.000Z')
        return dummy_value
        
    def get_beginningstop(self):
        # dummy value
        dummy_value = str('395')
        return dummy_value

    def get_endingstop(self):
        # dummy value
        dummy_value = str('4662')
        return dummy_value
    
    def get_lineid(self):
        # dummy value
        # There are 77A and 27, but only return 77A
        dummy_value = str('77A')
        return dummy_value

    