from .query import Query
import pandas as pd
import pytz

class Parse_arguments(Query):
    def __init__(self, lst):
        Query.__init__(self)
        time = lst[0]
        start = lst[1]
        end = lst[2]
        self.date_time = time
        self.beginningstop = start
        self.endingstop = end

    def __set_date_time__(self, date_time):
        self.date_time = date_time
    
    def __set_beginningstop__(self, a):
        self.beginningstop = a
    
    def __set_endingstop__(self, endingstop):
        self.endingstop = endingstop
        
    def parse_date(self):
        return pd.to_datetime(self.date_time)
    
    def extract_day_of_week(self):
        # call parse_date to get datetime
        date = self.parse_date()
        # save to series
        s = pd.Series([date])
        # only 1 value in the series, so return the item in index 0
        return s.dt.day_name()[0]
    
    def transform_to_forecast_date(self):
        # connect to database and query
        engine = self.get_engine(schema='DBus')
        with engine.connect() as connection:
            result = connection.execute(f"SELECT time FROM DBus.weather_forecast")
            result = result.fetchall()
        # load forecast times to list
        forecast_times = [pd.to_datetime(i['time']) for i in result]
        # Dublin timezone
        dublin = pytz.timezone('Europe/Dublin')
        # calculate the closet time
        time_deltas = [abs(pd.Timedelta(self.parse_date().replace(tzinfo=dublin) - forecast_times[i].replace(tzinfo=dublin)).total_seconds()) for i in range(len(forecast_times))]
        # find the closet index
        close_index = time_deltas.index(min(time_deltas))
        return forecast_times[close_index]
        
    def get_beginningstop(self):
        return str(self.beginningstop)

    def get_endingstop(self):
        return str(self.endingstop)
    
    def get_lineid(self, lineid):
        return lineid