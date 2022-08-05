import unittest
import pandas as pd
from api.model_querries import ModelQuerries
import random
from random import randint
import datetime as dt
from datetime import datetime
import pytest


def param_check_set1():
    """function to set instance variables to test parameters and avoid code repeat"""
    lst=['2022-07-23T12:00:00.000Z','395','4662']
    m_q = ModelQuerries(lst)
    m_q.__set_beginning_stop__('395')
    m_q.__set_endingstop__('4662')
    m_q.__set_date__(pd.to_datetime('2022-07-23T12:00:00.000Z'))
    m_q.day_of_week = pd.to_datetime('2022-07-23T12:00:00.000Z').strftime('%A')
    m_q. __set_forecast_date__(pd.to_datetime('2022-07-23T12:00:00.000Z'))
    return m_q


class TestModelQueries(unittest.TestCase):
    """testing ModelQuerries class"""

    def test__get_beginning_stop__(self):
        """testing if get method of TestModel class gets beginning_stop value initialized"""
        lst=['2022-07-23T12:00:00.000Z','395','4662']
        m_q = ModelQuerries(lst)
        dresult = m_q.beginning_stop
        cresult = m_q.__get_beginning_stop__()
        self.assertEqual(dresult, cresult)

    def test__set_beginning_stop__(self):
        """testing if set method of TestModel class sets initialized beginning_stop value to a new value"""
        lst=['2022-07-23T12:00:00.000Z','395','4662']
        m_q = ModelQuerries(lst)
        set_value = str(random.randint(10, 4000))
        dresult = set_value
        m_q.__set_beginning_stop__(set_value)
        cresult = m_q.beginning_stop
        self.assertEqual(dresult, cresult)

    def test__get_ending_stop__(self):
        """testing if get method of TestModel class gets ending_stop value initialized"""
        lst=['2022-07-23T12:00:00.000Z','395','4662']
        m_q = ModelQuerries(lst)
        dresult = m_q.ending_stop
        cresult = m_q.__get_ending_stop__()
        self.assertEqual(dresult, cresult)

    def test__set_endingstop__(self):
        """testing if set method of TestModel class sets initialized ending_stop value to a new value"""
        lst=['2022-07-23T12:00:00.000Z','395','4662']
        m_q = ModelQuerries(lst)
        set_value = str(random.randint(10, 4000))
        dresult = set_value
        m_q.__set_endingstop__(set_value)
        cresult = m_q.ending_stop
        self.assertEqual(dresult, cresult)

    def test__get_date__(self):
        """testing if get method of TestModel class gets date value initialized"""
        lst=['2022-07-23T12:00:00.000Z','395','4662']
        m_q = ModelQuerries(lst)
        dresult = m_q.date
        cresult = m_q.__get_date__()
        self.assertEqual(dresult, cresult)

    def test__set_date__(self):
        """testing if set method of TestModel class sets initialized date value to a new value"""
        lst=['2022-07-23T12:00:00.000Z','395','4662']
        m_q = ModelQuerries(lst)
        today = datetime.now()
        testd = today + dt.timedelta(randint(1, 7))
        set_value = testd
        dresult = set_value
        m_q.__set_date__(set_value)
        cresult = m_q.date
        self.assertEqual(dresult, cresult)

    def test__get_forecast_date__(self):
        """testing if get method of TestModel class gets date value initialized"""
        lst=['2022-07-23T12:00:00.000Z','395','4662']
        m_q = ModelQuerries(lst)
        dresult = m_q.forecast_date
        cresult = m_q.__get_forecast_date__()
        self.assertEqual(dresult, cresult)

    def test__set_forecast_date__(self):
        """testing if set method of TestModel class sets initialized date value to a new value"""
        lst=['2022-07-23T12:00:00.000Z','395','4662']
        m_q = ModelQuerries(lst)
        today = datetime.now()
        testd = today + dt.timedelta(randint(1, 7))
        set_value = testd
        dresult = set_value
        m_q.__set_forecast_date__(set_value)
        cresult = m_q.forecast_date
        self.assertEqual(dresult, cresult)

    def test_set_route_id(self):
        """testing if set_route_id method of TestModel class gets correct list
         based on test params setted to instace variables """
        m_q = param_check_set1()
        cresult = m_q.set_route_id()

        dresult = ['77A_29', '77A_30']
        self.assertEqual(dresult, cresult)

    def test_get_pmodel_features(self):
        """testing if get_pmodel_features method of TestModel class gets correct values to dataframes 
        and appends to dictionary and also if dictionary keys are correct
         based on test params setted to instace variables"""
        features77A_29 = ['PLANNEDTIME_DEP', 'humidity', 'sin_hour_of_day', 'cos_hour_of_day',
                          'friday', 'saturday', 'sunday', 'thursday', 'tuesday', 'wednesday']
        features77A_30 = ['rain', 'sin_hour_of_day', 'cos_hour_of_day', 'friday', 'saturday',
                          'sunday', 'thursday', 'tuesday', 'wednesday']
        dresult = {'77A_29': features77A_29, '77A_30': features77A_30}

        m_q = param_check_set1()
        cresult = m_q.get_pmodel_features()

        self.assertEqual(list(cresult.keys()), list(dresult.keys()))

        for i in dresult.keys():
            with self.subTest("Message for this subset ", i=i):
                self.assertEqual(dresult.get(i),  cresult.get(i))


if __name__ == '__main__':
    unittest.main()
