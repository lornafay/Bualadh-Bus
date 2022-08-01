from cgitb import reset
from time import time
import unittest
from unittest import result
import api.timetables as tb
import pandas as pd
import numpy as np
from api.query import Query

class TestQuery(unittest.TestCase):

    def test_return_timetable(self):
        timetable = tb.DisplayTimetables()
        method = timetable.return_timetable('395', 'Saturday')
        
        query= Query()
        DBs = ("static_tables")
        retreive_DB = query.get_engine(DBs)

        stopID = '395'
        day = 'Saturday'
        day = day.lower()
        df_request = pd.read_sql("SELECT ROUTEID, LINEID, TIME_OF_DAY, DIRECTION, last_stop FROM static_tables.{0}_timetable where STOPPOINTID = {1} order by LINEID, TIME_OF_DAY".format(day, stopID), retreive_DB);

        df_clean = df_request
        df_clean = df_clean.drop_duplicates(subset=['ROUTEID', 'LINEID','TIME_OF_DAY', 'DIRECTION', 'last_stop'])
    
        self.assertTrue(type(df_request)) == pd.core.frame.DataFrame
        self.assertTrue(list(df_clean.keys()) == ['ROUTEID', 'LINEID','TIME_OF_DAY', 'DIRECTION', 'last_stop'])
        self.assertTrue(type(method)) == dict

if __name__== '__main__':
    unittest.main()