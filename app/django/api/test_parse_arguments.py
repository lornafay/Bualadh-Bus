from cgitb import reset
from time import time
import unittest
from parse_arguments import Parse_arguments
import pandas as pd

class TestQuery(unittest.TestCase):

    def test_parse_date(self):

        parse_arguments = Parse_arguments('2022-07-23T12:00:00.000Z', '395', '4662')
        result = parse_arguments.parse_date()

        self.assertTrue(type(result) == pd._libs.tslibs.timestamps.Timestamp)
        self.assertEquals(result, pd.to_datetime('2022-07-23T12:00:00.000Z'))


    def test_extract_day_of_week(self):
        
        parse_arguments = Parse_arguments('2022-07-23T12:00:00.000Z', '395', '4662')
        result = parse_arguments.extract_day_of_week()

        self.assertTrue(type(result) == str)
        self.assertEquals(result, 'Saturday')

        
    def test_transform_to_forecast_date(self):

        parse_arguments = Parse_arguments('2022-07-23T12:00:00.000Z', '395', '4662')
        result = parse_arguments.transform_to_forecast_date()
        
        self.assertTrue(type(result) == pd._libs.tslibs.timestamps.Timestamp)
        self.assertEquals(result, pd.to_datetime('2022-07-23 12:00:00'))


    def test_get_beginningstop(self):

        parse_arguments = Parse_arguments('2022-07-23T12:00:00.000Z', '395', '4662')
        result = parse_arguments.get_beginningstop()
        
        self.assertTrue(type(result) == str)
        self.assertEquals(result, '395')


    def test_get_endingstop(self):
        
        parse_arguments = Parse_arguments('2022-07-23T12:00:00.000Z', '395', '4662')
        result = parse_arguments.get_endingstop()
        
        self.assertTrue(type(result) == str)
        self.assertEquals(result, '4662')


    def test_get_lineid(self):

        parse_arguments = Parse_arguments('2022-07-23T12:00:00.000Z', '395', '4662')
        result = parse_arguments.get_lineid('77A')

        self.assertTrue(type(result) == str)
        self.assertEquals(result, '77A')

if __name__== '__main__':
    unittest.main()