import pandas as pd
from api.model_querries import ModelQuerries
import random
from random import randint
import datetime as dt
from datetime import datetime
from pandas.testing import assert_frame_equal


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


print('='*66)
print("TESTING get_time_percent_AT BEGINNING STOP")


def test_get_time_percent_bstop():
    """testing if get_time_percent_bstop method of TestModel class gets correct dataframe
        up to 6 figure precision based on test params setted to instace variables """
    m_q = param_check_set1()
    cresult = m_q.get_time_percent("Beginning_stop")

    data = [['77A_30', '395', 0.010810588674565217],
            ['77A_29', '395', 0.011934000463333328]]
    dresult = pd.DataFrame(
        data, columns=['ROUTEID', 'STOPPOINTID', 'TRIPS_TIME_PROPORTION_v2'])

    pd.testing.assert_frame_equal(dresult, cresult, check_less_precise=6)


# method call
print("test result time_percent_beginning_stop error: ",
      test_get_time_percent_bstop())

print('='*66)
print("TESTING get_time_percent_AT ENDING STOP")


def test_get_time_percent_estop():
    """testing if get_time_percent_estop method of TestModel class gets correct dataframe
    up to 6 figure precision based on test params setted to instace variables """
    m_q = param_check_set1()
    cresult2 = m_q.get_time_percent("Ending_stop")

    data_end = [['77A_30', '4662', 0.44614033923076934],
                ['77A_29', '4662', 0.4397005272340424]]
    dresult2 = pd.DataFrame(
        data_end, columns=['ROUTEID', 'STOPPOINTID', 'TRIPS_TIME_PROPORTION_v2'])

    pd.testing.assert_frame_equal(dresult2, cresult2, check_less_precise=6)


# method call
print("test result time_percent_ending_stop error: ",
      test_get_time_percent_estop())

print('='*66)
print("TESTING get_pmodel_values FOR DICTIONARY KEY EQUALITY")


def test_get_pmodel_values1():
    """testing if get_pmodel_values method of TestModel class gets keys of dictionary are 
    correct based on test params setted to instace variables """

    data_77A_29_feature_values = [
        [42807, 67.9, 1.2246467991473532e-16, -1, 0, 1, 0, 0, 0, 0]]
    df_ssp_77A_29_feature_values = pd.DataFrame(data_77A_29_feature_values, columns=['PLANNEDTIME_DEP',
                                                                                     'humidity', 'sin_hour_of_day',
                                                                                     'cos_hour_of_day', 'friday',
                                                                                     'saturday', 'sunday', 'thursday',
                                                                                     'tuesday', 'wednesday'])

    data_77A_30_feature_values = [
        [1, 1.2246467991473532e-16, -1, 0, 1, 0, 0, 0, 0]]
    df_ssp_77A_30_feature_values = pd.DataFrame(data_77A_30_feature_values, columns=['rain', 'sin_hour_of_day',
                                                                                     'cos_hour_of_day', 'friday',
                                                                                     'saturday', 'sunday', 'thursday',
                                                                                     'tuesday', 'wednesday'])

    dresult = {'77A_29': df_ssp_77A_29_feature_values,
               '77A_30': df_ssp_77A_30_feature_values}

    m_q = param_check_set1()
    cresult = m_q.get_pmodel_values()
    assert list(cresult.keys()) == list(dresult.keys())


# method call
print("test result for get_pmodel_values key equality error: ",
      test_get_pmodel_values1())

print('='*66)
print("TESTING get_pmodel_values FOR DICTIONARY VALUE(DATAFRAME) EQUALITY ")


def test_get_pmodel_values2():
    """testing if get_pmodel_values method of TestModel class gets correct dataframes
    up to 6 figure precision and add them to dictionary"""

    data_77A_29_feature_values = [
        [42807, 67.9, 1.2246467991473532e-16, -1.0, 0, 1, 0, 0, 0, 0]]
    df_ssp_77A_29_feature_values = pd.DataFrame(data_77A_29_feature_values, columns=['PLANNEDTIME_DEP',
                                                                                     'humidity', 'sin_hour_of_day',
                                                                                     'cos_hour_of_day', 'friday',
                                                                                     'saturday', 'sunday', 'thursday',
                                                                                     'tuesday', 'wednesday'])

    data_77A_30_feature_values = [
        [0.5, 1.2246467991473532e-16, -1.0, 0, 1, 0, 0, 0, 0]]
    df_ssp_77A_30_feature_values = pd.DataFrame(data_77A_30_feature_values, columns=['rain', 'sin_hour_of_day',
                                                                                     'cos_hour_of_day', 'friday',
                                                                                     'saturday', 'sunday', 'thursday',
                                                                                     'tuesday', 'wednesday'])

    dresult = {'77A_29': df_ssp_77A_29_feature_values,
               '77A_30': df_ssp_77A_30_feature_values}

    m_q = param_check_set1()
    cresult = m_q.get_pmodel_values()

    for key, value in cresult.items():
        print("key: ", key)
        print("cresult value: ", value)
        print("dresult value: ", dresult[key])
        print()
        print(key, " df test result get_pmodel_values error: ",
              pd.testing.assert_frame_equal(cresult[key], dresult[key], check_less_precise=6))


# method call
print("test result get_pmodel_values dataframe equality error: ",
      test_get_pmodel_values2())

print('='*66)
print("TESTING routeid_weights ")


def test_routeid_weights():
    """testing if routeid_weights method of TestModel class gets correct dataframe
    up to 6 figure precision based on test params setted to instace variables """

    data = [['77A_29', '395', '4662', 0.006464],
            ['77A_30', '395', '4662', 0.001525]]
    dresult = pd.DataFrame(
        data, columns=['ROUTEID', 'Beginning_stop', 'Ending_stop', 'Weight'])

    m_q = param_check_set1()
    cresult = m_q.routeid_weights()

    pd.testing.assert_frame_equal(dresult, cresult, check_less_precise=6)


# method call
print("test result routeid_weights error: ", test_routeid_weights())
