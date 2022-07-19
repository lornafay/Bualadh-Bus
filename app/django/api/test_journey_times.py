from cgitb import reset
from time import time
import unittest
from unittest import result
import journey_times as jt
import pandas as pd
import numpy as np

class TestQuery(unittest.TestCase):

    def test_total_jt_df(self):

        journey = jt.JourneyTimes()
        result = journey.predict_total_journey_time()

        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'result'])
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['result'].unique()[0]) == np.int64)


    def test_user_jt(self):
        
        journey = jt.JourneyTimes()
        result = journey.get_user_journey_time()
 
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'result'])
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['result'].unique()[0]) == np.int64)

        
    def test_parse_routeID_lineID(self):

        journey = jt.JourneyTimes()
        result = journey.parse_routeID_lineID()
        
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['LINEID', 'ROUTEID', 'result'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['result'].unique()[0]) == np.int64)


    def test_normalise_routeID_weights(self):

        journey = jt.JourneyTimes()
        result = journey.normalise_routeID_weights()
        
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['LINEID', 'ROUTEID', 'result', 'normalised_weight'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['result'].unique()[0]) == np.int64)
        self.assertTrue(type(result['normalised_weight'].unique()[0]) == np.float64)


    def test_get_user_jt_lineID(self):
        
        journey = jt.JourneyTimes()
        result = journey.get_user_journey_time_lineID()
 
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['LINEID', 'result'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['result'].unique()[0]) == np.int64)


    def test_return_user_jt_lineID(self):

        journey = jt.JourneyTimes()
        result = journey.return_user_journey_time_lineID()
 
        self.assertTrue(type(result) == dict)
        self.assertTrue(list(result.keys()) == ['77A', '42'])
        self.assertTrue(type(result['77A']) == str)
        self.assertTrue(type(result['42']) == str)


if __name__== '__main__':
    unittest.main()
