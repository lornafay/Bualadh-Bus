from cgitb import reset
from time import time
import unittest
from unittest import result
import timetables as tb
import pandas as pd
import numpy as np

class TestQuery(unittest.TestCase):

    def test_extract_route_ID(self):
        timetable = tb.DisplayTimetables()
        method = timetable.extract_route_ID()

        self.assertTrue(list(method.keys()) == ['ROUTEID', 'LINEID'])
        self.assertTrue(type(method)) == pd.core.frame.DataFrame
    
    def test_get_timetable(self):
        timetable = tb.DisplayTimetables()
        method = timetable.get_timetable()

        self.assertTrue(list(method.keys()) == ['ROUTEID', 'LINEID', 'DAY_OF_WEEK', 'PLANNED_DEP_R_M5'])
        self.assertTrue(type(method)) == pd.core.frame.DataFrame

    def test_return_timetable(self):
        timetable = tb.DisplayTimetables()
        method = timetable.return_timetable()

        self.assertTrue(list(method.keys()) == ['LINEID', 'PLANNED_DEP_R_M5'])
        self.assertTrue(type(method)) == pd.core.frame.DataFrame

if __name__== '__main__':
    unittest.main()