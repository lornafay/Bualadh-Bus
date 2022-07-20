# libs for mysql connect
import json
import os
import query as q
import pandas as pd
from sqlalchemy import create_engine
#import parse_arguments as pa

class ModelQuerries:
    """Class which will return majority of querries from sql for model to function"""
    def __init__(self):
        """initializing date for code maintanence testing"""
        pass

    def get_route_id(self):
        """Querry STOPPOINTID_pairs_vs_ROUTEID table at static_tables schema 
        to return a ROUTEID list for user's chosen Beginning_stop and Ending_stop"""
        #for Beginning_stop: 395 and Ending_stop: 4662 date: 23.07.2022 12:00 reason for choise is 
        # other days are missing at timetables table at static_tables schema
        #'27_12' is not operating at 12:00 add a check at this part to find out if route is operating at that hour
        routeid_list=['77A_29','77A_30']
        return routeid_list

    def get_beginning_stop_time_percent(self):
        """Query timetables table at static_tables schema to get TRIPS_TIME_PROPORTION_v2 for user's chosen Beginning_stop 
        at user's chosen day of week of each route, return a ROUTEID Beginning_stop TRIPS_TIME_PROPORTION_v2 dataframe"""
        data= [['77A_29','395', 0.011934000463333328],['77A_30','395', 0.010810588674565217]]
        df= pd.DataFrame(data, columns=['ROUTEID','STOPPOINTID','TRIPS_TIME_PROPORTION_v2'])
        return df

    def get_ending_stop_timepercent(self):
        """Query timetables table at static_tables schema to get TRIPS_TIME_PROPORTION_v2 for user's chosen Ending_stop 
        at user's chosen day of week of each route, return a ROUTEID Ending_stop TRIPS_TIME_PROPORTION_v2 dataframe"""
        data_end= [['77A_29','4662', 0.4397005272340424],['77A_30','4662', 0.44614033923076934]]
        df_end= pd.DataFrame(data_end, columns=['ROUTEID','STOPPOINTID','TRIPS_TIME_PROPORTION_v2'])
        return df_end

    def get_pmodel_features(self):
        """Query feature_selection table at static_tables schema to get features for the predictive model of ROUTEID,
        return ROUTEID(key) vs feature_list(value) dictionary"""
        features77A_29=['PLANNEDTIME_DEP','humidity(%)','sin_hour_of_day','cos_hour_of_day','friday','saturday','sunday','thursday','tuesday','wednesday']
        features77A_30=['rain','sin_hour_of_day','cos_hour_of_day','friday','saturday','sunday','thursday','tuesday','wednesday']
        features_dic={'77A_29':features77A_29,'77A_30':features77A_30}
        return features_dic

    def get_pmodel_values (self):
        """Depending on the condition that PLANNEDTIME_DEP is in ROUTEID(key)'s feature_list(value);
        query timetables table at static_tables schema to get values for PLANNEDTIME_DEP,
        Depending on the condition that date is current date;
        querry current_weather at DBus schema, depending on the condition that feature is in
        ROUTEID(key)'s feature_list(value) to  get values for  feature.
        Depending on the condition that date is future date;
        querry weather_forecast at DBus schema, depending on the condition that feature is in 
        ROUTEID(key)'s feature_list(value) to to  get values for feature
        creates dataframe with feature values for each routeid and appends to a dictionary 
        returns  dictionary of dataframes where keys of dictionary are routeids and values are dataframes
        """
        data_77A_29_feature_values= [[42807,73.4,1.2246467991473532e-16,-1,0,1,0,0,0,0]]
        df_ssp_77A_29_feature_values=pd.DataFrame(data_77A_29_feature_values,columns=['PLANNEDTIME_DEP','humidity(%)','sin_hour_of_day','cos_hour_of_day','friday','saturday','sunday','thursday','tuesday','wednesday'])
        data_77A_30_feature_values= [[1,1.2246467991473532e-16,-1,0,1,0,0,0,0]]
        df_ssp_77A_30_feature_values=pd.DataFrame(data_77A_30_feature_values,columns=['rain','sin_hour_of_day','cos_hour_of_day','friday','saturday','sunday','thursday','tuesday','wednesday'])
        features_dic_val={'77A_29':df_ssp_77A_29_feature_values,'77A_30':df_ssp_77A_30_feature_values}
        return features_dic_val

    def routeid_weights(self):
        """Query STOPPOINTID_pairs_vs_ROUTEID table at static_tables schema to get weights,
        return routeid/weights dataframe"""
        myquery=q.Query()
        schema="static_tables"
        engine_static= myquery.get_engine(schema)
        df= pd.read_sql("SELECT * FROM static_tables.STOPPOINTID_pairs_vs_ROUTEID where  Beginning_stop = '395'AND Ending_stop= '4662' and (ROUTEID = '77A_29' or ROUTEID = '77A_30' )  ", engine_static);
        return df

####Quick test will be removed
checkQuery=ModelQuerries()
print(checkQuery.get_route_id())
print(checkQuery.get_beginning_stop_time_percent())
print(checkQuery.get_ending_stop_timepercent())
print(checkQuery.get_pmodel_features())
print(checkQuery.get_pmodel_values())
print(checkQuery.routeid_weights())





