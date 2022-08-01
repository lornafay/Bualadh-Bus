from cgitb import reset
from time import time
import unittest
from unittest import result
import api.journey_times as jt
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class TestQuery(unittest.TestCase):

    def test_total_jt_df(self):

        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        journey = jt.JourneyTimes(lst)
        result = journey.predict_total_journey_time()

        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'TOTAL_TIME_PREDICTION'])
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['TOTAL_TIME_PREDICTION'].unique()[0]) == np.float64)
        self.assertTrue("77A_29" in result['ROUTEID'].unique())
        self.assertTrue("77A_30" in result['ROUTEID'].unique())


    def test_user_jt(self):
        
        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        journey = jt.JourneyTimes(lst)
        result = journey.get_user_journey_time()
 
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'USER_JOURNEY_TIME'])
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['USER_JOURNEY_TIME'].unique()[0]) == np.int64)

        
    def test_parse_routeID_lineID(self):

        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        journey = jt.JourneyTimes(lst)
        result = journey.parse_routeID_lineID()
        
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'USER_JOURNEY_TIME', 'LINEID'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['USER_JOURNEY_TIME'].unique()[0]) == np.int64)
        self.assertTrue("77A" in result['LINEID'].unique())


    def test_normalise_routeID_weights(self):

        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        journey = jt.JourneyTimes(lst)
        result = journey.normalise_routeID_weights()
        
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'USER_JOURNEY_TIME', 'LINEID', 'normalised_weight'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['USER_JOURNEY_TIME'].unique()[0]) == np.int64)
        self.assertTrue(type(result['normalised_weight'].unique()[0]) == np.float64)


    def test_get_user_jt_lineID(self):
        
        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        journey = jt.JourneyTimes(lst)
        result = journey.get_user_journey_time_lineID()
 
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['LINEID', 'weighted_time'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['weighted_time'].unique()[0]) == np.float64)


    def test_return_user_jt_lineID(self):

        today = datetime.now() - timedelta(hours=5)
        lst = [str(today), '395', '4662']
        journey = jt.JourneyTimes(lst)
        result = journey.return_user_journey_time_lineID()
        lineID = result[0]['line']
        hours = result[0]['hours']
        mins = result[0]['mins']

        self.assertTrue(type(result) == list)
        self.assertTrue(type(result[0]) == dict)
        self.assertTrue(type(lineID) == str)
        self.assertTrue(list(result[0].keys()) == ['line', 'hours', 'mins'])
        self.assertTrue(type(hours) == int)
        self.assertTrue(type(mins) == int)



if __name__== '__main__':
    unittest.main()
