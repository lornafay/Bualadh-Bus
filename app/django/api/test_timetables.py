from cgitb import reset
from time import time
import unittest
from unittest import result
import timetables as tb
import pandas as pd
import numpy as np
from query import Query

class TestQuery(unittest.TestCase):

    def test_return_timetable(self):
        timetable = tb.DisplayTimetables()
        method = timetable.return_timetable('395', 'Saturday')
        
        query= Query()
        DBs = ("static_tables")
        retreive_DB = query.get_engine(DBs)

        stopID = '395'
        day = 'Saturday'
        df_request = pd.read_sql("SELECT ROUTEID, TIME_OF_DAY FROM static_tables.timetables Where STOPPOINTID = '{0}' and DAY_OF_WEEK = '{1}' order by ROUTEID, TIME_OF_DAY".format(stopID, day), retreive_DB);

        df_clean = df_request
        df_clean[['LINEID', 'ROUTEID']] = df_clean['ROUTEID'].str.split('_', expand=True)
        df_clean = df_request.drop('ROUTEID', axis=1)
        df_clean = df_clean.drop_duplicates(subset=['LINEID','TIME_OF_DAY'])
    
        self.assertTrue(type(df_request)) == pd.core.frame.DataFrame
        self.assertTrue(list(df_clean.keys()) == ['TIME_OF_DAY', 'LINEID'])
        self.assertTrue(type(method)) == dict

if __name__== '__main__':
    unittest.main()