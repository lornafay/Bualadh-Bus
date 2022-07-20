from cgitb import reset
from time import time
import unittest
from parse_arguments import Parse_arguments
import pandas as pd

class TestQuery(unittest.TestCase):

    def test_parse_date(self):

        parse_arguments = Parse_arguments('2022-07-19T23:00:00.000Z', '4359', '4360')
        result = parse_arguments.parse_date()

        self.assertTrue(type(result) == pd.core.series.Series)
        self.assertTrue(type(result[0]) == pd._libs.tslibs.timestamps.Timestamp)


    def test_extract_day_of_week(self):
        
        parse_arguments = Parse_arguments('2022-07-19T23:00:00.000Z', '4359', '4360')
        result = parse_arguments.extract_day_of_week()

        self.assertTrue(type(result) == str)

        
    def test_transform_to_forecast_date(self):

        parse_arguments = Parse_arguments('2022-07-19T23:00:00.000Z', '4359', '4360')
        result = parse_arguments.transform_to_forecast_date()
        
        self.assertTrue(type(result) == pd.core.series.Series)
        self.assertTrue(type(result[0]) == pd._libs.tslibs.timestamps.Timestamp)


    def test_get_beginningstop(self):

        parse_arguments = Parse_arguments('2022-07-19T23:00:00.000Z', '4359', '4360')
        result = parse_arguments.get_beginningstop()
        
        self.assertTrue(type(result) == str)


    def test_get_endingstop(self):
        
        parse_arguments = Parse_arguments('2022-07-19T23:00:00.000Z', '4359', '4360')
        result = parse_arguments.get_endingstop()
        
        self.assertTrue(type(result) == str)


    def test_get_lineid(self):

        parse_arguments = Parse_arguments('2022-07-19T23:00:00.000Z', '4359', '4360')
        result = parse_arguments.get_lineid()

        self.assertTrue(type(result) == str)

if __name__== '__main__':
    unittest.main()