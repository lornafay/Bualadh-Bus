from cgitb import reset
from time import time
import unittest
from unittest import result
import api.journey_times as jt
import pandas as pd
import numpy as np

class TestQuery(unittest.TestCase):

    

    def test_total_jt_df(self):

        lst = ["2022-07-30T12:00:00.000Z", "395", "4662"]
        journey = jt.JourneyTimes(lst)
        result = journey.predict_total_journey_time()

        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'TOTAL_TIME_PREDICTION'])
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['TOTAL_TIME_PREDICTION'].unique()[0]) == np.float64)
        self.assertTrue("77A_29" in result['ROUTEID'].unique())
        self.assertTrue("77A_30" in result['ROUTEID'].unique())


    def test_user_jt(self):
        
        lst = ["2022-07-30T12:00:00.000Z", "395", "4662"]
        journey = jt.JourneyTimes(lst)
        result = journey.get_user_journey_time()
 
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'USER_JOURNEY_TIME'])
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['USER_JOURNEY_TIME'].unique()[0]) == np.int64)

        
    def test_parse_routeID_lineID(self):

        lst = ["2022-07-30T12:00:00.000Z", "395", "4662"]
        journey = jt.JourneyTimes(lst)
        result = journey.parse_routeID_lineID()
        
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'USER_JOURNEY_TIME', 'LINEID'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['USER_JOURNEY_TIME'].unique()[0]) == np.int64)
        self.assertTrue("77A" in result['LINEID'].unique())


    def test_normalise_routeID_weights(self):

        lst = ["2022-07-30T12:00:00.000Z", "395", "4662"]
        journey = jt.JourneyTimes(lst)
        result = journey.normalise_routeID_weights()
        
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['ROUTEID', 'USER_JOURNEY_TIME', 'LINEID', 'normalised_weight'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['ROUTEID'].unique()[0]) == str)
        self.assertTrue(type(result['USER_JOURNEY_TIME'].unique()[0]) == np.int64)
        self.assertTrue(type(result['normalised_weight'].unique()[0]) == np.float64)


    def test_get_user_jt_lineID(self):
        
        lst = ["2022-07-30T12:00:00.000Z", "395", "4662"]
        journey = jt.JourneyTimes(lst)
        result = journey.get_user_journey_time_lineID()
 
        self.assertTrue(type(result) == pd.core.frame.DataFrame)
        self.assertTrue(list(result.keys()) == ['LINEID', 'weighted_time'])
        self.assertTrue(type(result['LINEID'].unique()[0]) == str)
        self.assertTrue(type(result['weighted_time'].unique()[0]) == np.float64)


    def test_return_user_jt_lineID(self):

        lst = ["2022-07-30T12:00:00.000Z", "395", "4662"]
        journey = jt.JourneyTimes(lst)
        result = journey.return_user_journey_time_lineID()
        lineID = list(result.keys())[0]

        self.assertTrue(type(result) == dict)
        self.assertTrue(type(list(result.keys())[0]) == str)
        self.assertTrue(list(result[lineID].keys()) == ['hours', 'mins'])
        self.assertTrue(type(result[lineID]['hours']) == int)
        self.assertTrue(type(result[lineID]['mins']) == int)



if __name__== '__main__':
    unittest.main()
