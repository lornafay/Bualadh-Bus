from cgitb import reset
from time import time
import unittest
from api.parse_arguments import Parse_arguments
import pandas as pd
from datetime import datetime, timedelta
import calendar

class TestQuery(unittest.TestCase):

    def test_parse_date(self):
        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        parse_arguments = Parse_arguments(lst)
        result = parse_arguments.parse_date()

        self.assertTrue(type(result) == pd._libs.tslibs.timestamps.Timestamp)
        self.assertEquals(result, pd.to_datetime(today))


    def test_extract_day_of_week(self):
        
        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        parse_arguments = Parse_arguments(lst)
        result = parse_arguments.extract_day_of_week()

        self.assertTrue(type(result) == str)
        self.assertEquals(result, calendar.day_name[today.weekday()])

        
    '''def test_transform_to_forecast_date(self):

        tomorrow = datetime.now() + timedelta(days=1)
        lst = [str(tomorrow), '395', '4662']
        parse_arguments = Parse_arguments(lst)
        result = parse_arguments.transform_to_forecast_date()
        
        self.assertTrue(type(result) == pd._libs.tslibs.timestamps.Timestamp)
        self.assertEquals(result, tomorrow)'''


    def test_get_beginningstop(self):

        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        parse_arguments = Parse_arguments(lst)
        result = parse_arguments.get_beginningstop()
        
        self.assertTrue(type(result) == str)
        self.assertEquals(result, '395')


    def test_get_endingstop(self):
        
        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        parse_arguments = Parse_arguments(lst)
        result = parse_arguments.get_endingstop()
        
        self.assertTrue(type(result) == str)
        self.assertEquals(result, '4662')


    def test_get_lineid(self):

        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        parse_arguments = Parse_arguments(lst)
        result = parse_arguments.get_lineid('77A')

        self.assertTrue(type(result) == str)
        self.assertEquals(result, '77A')

if __name__== '__main__':
    unittest.main()