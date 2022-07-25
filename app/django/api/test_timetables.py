from cgitb import reset
from time import time
import unittest
from unittest import result
import timetables as tb
import pandas as pd
import numpy as np

class TestQuery(unittest.TestCase):

    def test_return_timetable(self):
        timetable = tb.DisplayTimetables()
        method = timetable.return_timetable('395', 'Saturday')

        line_route = {
            'LINEID' : ['77A', '77A', '77A', '1'],
            'ROUTEID' : ['77A_30', '77A_30', '77A_29', '1_40']
        }
        line_route = pd.DataFrame(line_route)

        self.assertTrue(list(line_route.keys()) == ['LINEID', 'ROUTEID'])
        self.assertTrue(type(method)) == dict

if __name__== '__main__':
    unittest.main()