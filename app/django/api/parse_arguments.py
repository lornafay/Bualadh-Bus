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
        df = pd.DataFrame()
        df['date_time'] = pd.to_datetime(pd.Series(['2022-07-19T23:00:00.000Z']))
        dummy_value = df.date_time
        return dummy_value
    
    def extract_day_of_week(self):
        # 0-Modnay 6-Sunday etc
        # return str(self.parse_date().dt.weekday[0])

        # dummy value
        dummy_value = str(1)
        return dummy_value
    
    def transform_to_forecast_date(self):
        # dummy value
        df = pd.DataFrame()
        df['date_time'] = pd.to_datetime(pd.Series(['2022-07-19T23:00:00.000Z']))
        dummy_value = df.date_time
        return dummy_value
        
    def get_beginningstop(self):
        # return str(self.beginningstop)

        # dummy value
        return str('4359')

    
    def get_endingstop(self):
        # return str(self.endingstop)

        # dummy value
        return str('4360')
    
    def get_lineid(self):
        # dummy value
        return str('1')

    